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

test('getResolutionInStorage should call findOne method in Patient class, after getting response should call findAll method in Resolution class and returns string of resolutions', async () => {
  const testName = 'testName';
  const resolutionsArr = [
    { resolution: 'resolution1' },
    { resolution: 'resolution2' },
  ];
  const patient = { patient_id: 12 };
  Resolution.findAll = jest.fn(() => resolutionsArr);
  Patient.findOne = jest.fn(() => patient);
  const resolutions = await service.getResolutionInStorage(testName);
  expect(Patient.findOne).toHaveBeenCalledTimes(1);
  expect(Patient.findOne).toHaveBeenCalledWith({
    attributes: ['patient_id', 'name'],
    where: {
      name: testName,
    },
  });
  expect(Resolution.findAll).toHaveBeenCalledTimes(1);
  expect(Resolution.findAll).toHaveBeenCalledWith({
    attributes: ['resolution'],
    where: {
      patient_id: patient.patient_id,
    },
  });
  expect(resolutions).toEqual('resolution1 resolution2');
});

test('setResolutionInStorage should call findOne method in Patient class and then should call create method in Patient and Resolution class', async () => {
  const patientName = 'name';
  const patient = { patient_id: 32 };
  Patient.findOne = jest.fn();
  Resolution.create = jest.fn();
  Patient.create = jest.fn(() => patient);
  await service.setResolutionInStorage(patientName);

  expect(Patient.findOne).toHaveBeenCalledTimes(1);
  expect(Patient.findOne).toHaveBeenCalledWith({
    attributes: ['patient_id', 'name'],
    where: {
      name: patientName,
    },
  });
  expect(Patient.create).toHaveBeenCalledTimes(1);
  expect(Resolution.create).toHaveBeenCalledTimes(1);
});
test('deleteResolutionInStorage should call findOne method in Patient class and then should call destroy method in Resolution class', async () => {
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
