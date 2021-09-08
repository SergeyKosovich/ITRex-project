/* eslint-disable max-classes-per-file */
import SqlStorage from '../storageClasses/sqlStorage.js';

class sqlClient {}
class Queue {}
class Patient {}
class Resolution {}
Patient.findOne = jest.fn();
Resolution.findAll = jest.fn();
Resolution.create = jest.fn();
Resolution.destroy = jest.fn();
Patient.create = jest.fn();

const service = new SqlStorage(sqlClient, Queue, Patient, Resolution);

test('getResolutionInStorage should search patient in storage and return resolution if patient exist', async () => {
  Resolution.findAll = jest.fn(() => [
    { resolution: 'resolution1' },
    { resolution: 'resolution2' },
  ]);
  const patientName = 'testName';
  const resolutions = await service.getResolutionInStorage(patientName);
  expect(Resolution.findAll).toHaveBeenCalledTimes(1);
  expect(Resolution.findAll).toHaveBeenCalledWith({
    include: [
      {
        model: Patient,
        where: { name: patientName },
      },
    ],
  });
  expect(resolutions).toEqual('resolution1 resolution2');
});

test('setResolutionInStorage should check patient in db and create if it not exist, then create resolution', async () => {
  const data = { name: 'testNam1', ttl: '12', resolution: 'resolution test' };
  Patient.findOne = jest.fn();
  Resolution.create = jest.fn();
  Patient.create = jest.fn(() => 'patient');
  await service.setResolutionInStorage(data);
  expect(Patient.findOne).toHaveBeenCalledTimes(1);
  expect(Patient.findOne).toHaveBeenCalledWith({
    attributes: ['patient_id', 'name'],
    where: {
      name: data.name,
    },
  });
  expect(Patient.create).toHaveBeenCalledTimes(1);
  expect(Resolution.create).toHaveBeenCalledTimes(1);
});
test('deleteResolutionInStorage should search patient in db and delete if patient exist', async () => {
  const patient = { patient_id: 41 };
  Patient.findOne = jest.fn(() => patient);
  Resolution.destroy = jest.fn();
  await service.deleteResolutionInStorage('patientName');
  expect(Patient.findOne).toHaveBeenCalledTimes(1);
  expect(Patient.findOne).toHaveBeenCalledWith({
    attributes: ['patient_id', 'name'],
    where: {
      name: 'patientName',
    },
  });
  expect(Resolution.destroy).toHaveBeenCalledTimes(1);
  expect(Resolution.destroy).toHaveBeenCalledWith({
    where: {
      patient_id: patient.patient_id,
    },
  });
});

test('deleteResolutionInStorage should search patient in db and dont call destroy if patient not exist', async () => {
  Patient.findOne = jest.fn(() => null);
  Resolution.destroy = jest.fn();
  await service.deleteResolutionInStorage('patientName');
  expect(Resolution.destroy).toHaveBeenCalledTimes(0);
});
