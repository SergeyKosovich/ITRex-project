/* eslint-disable max-classes-per-file */
import SqlStorage from '../storageClasses/sqlStorage.js';

class sqlClient {}
class Queue {}
class Patient {}
class Resolutions {}
Resolutions.findAll = jest.fn();
Resolutions.create = jest.fn();
Resolutions.destroy = jest.fn();
Patient.create = jest.fn();
Patient.findOne = jest.fn();

const service = new SqlStorage(sqlClient, Queue, Patient, Resolutions);

test('getResolutions should search patient in storage and return resolution if patient exist', async () => {
  Resolutions.findAll = jest.fn(() => [
    { resolution: 'resolution1' },
    { resolution: 'resolution2' },
  ]);
  const patientId = 328;
  const resolutions = await service.getResolutions(patientId);
  expect(Resolutions.findAll).toHaveBeenCalledTimes(1);
  expect(Resolutions.findAll).toHaveBeenCalledWith({
    attributes: ['resolution', 'ttl', 'patient_id'],
    where: {
      patient_id: patientId,
    },
  });
  expect(resolutions).toEqual(['resolution1', 'resolution2']);
});

test('getResolutions should search patient in storage and return [] if patient not exist', async () => {
  Resolutions.findAll = jest.fn(() => []);
  const patientId = 31;
  const resolutions = await service.getResolutions(patientId);
  expect(Resolutions.findAll).toHaveBeenCalledTimes(1);
  expect(Resolutions.findAll).toHaveBeenCalledWith({
    attributes: ['resolution', 'ttl', 'patient_id'],
    where: {
      patient_id: patientId,
    },
  });
  expect(resolutions).toEqual([]);
});

test('setResolution should create new resolution in db', async () => {
  const data = { patient_id: '333', resolution: 'resolution test' };
  Resolutions.create = jest.fn();
  await service.setResolution(data);
  expect(Resolutions.create).toHaveBeenCalledTimes(1);
  expect(Resolutions.create).toHaveBeenCalledWith({
    patient_id: data.patient_id,
    resolution: data.resolution,
  });
});

test('deleteResolution should call destroy method and delete resolution from storage', async () => {
  Resolutions.destroy = jest.fn();
  const id = 24;
  await service.deleteResolution(id);
  expect(Resolutions.destroy).toHaveBeenCalledTimes(1);
  expect(Resolutions.destroy).toHaveBeenCalledWith({
    where: {
      patient_id: id,
    },
  });
});

test('createNewPatient should create new Patient and return Patient data', async () => {
  const Id = 'id';
  const FirstName = 'FirstName';
  const LastName = 'LastName';
  const Gender = 'Gender';
  const Birthday = 'Birthday';
  const testData = { patientData: 'patientData' };
  Patient.create = jest.fn(() => testData);
  const data = await service.createNewPatient(
    Id,
    FirstName,
    LastName,
    Gender,
    Birthday,
  );
  expect(Patient.create).toHaveBeenCalledTimes(1);
  expect(Patient.create).toHaveBeenCalledWith({
    user_id: Id,
    firstName: FirstName,
    lastName: LastName,
    gender: Gender,
    birthday: Birthday,
  });
  expect(data).toEqual({ patientData: 'patientData' });
});

test('getPatientData should search patient by attributes and return null if patient not exist ', async () => {
  Patient.findOne = jest.fn();
  const userId = 1324;
  const data = await service.getPatientData(userId);
  expect(Patient.findOne).toHaveBeenCalledTimes(1);
  expect(Patient.findOne).toHaveBeenCalledWith({
    attributes: ['firstName', 'lastName', 'patient_id'],
    where: {
      user_id: userId,
    },
  });
  expect(data).toBe(null);
});

test('getPatientData should search patient by attributes and return null if patient not exist ', async () => {
  Patient.findOne = jest.fn();
  const userId = 1324;
  const data = await service.getPatientData(userId);
  expect(Patient.findOne).toHaveBeenCalledTimes(1);
  expect(Patient.findOne).toHaveBeenCalledWith({
    attributes: ['firstName', 'lastName', 'patient_id'],
    where: {
      user_id: userId,
    },
  });
  expect(data).toBe(null);
});

test('getPatientData should search patient by attributes and return object with patient data if patient exist ', async () => {
  Patient.findOne = jest.fn(() => [
    { name: 'name', lastName: 'name', patient_id: 'patient_id' },
  ]);
  const userId = 311;
  const data = await service.getPatientData(userId);
  expect(Patient.findOne).toHaveBeenCalledTimes(1);
  expect(Patient.findOne).toHaveBeenCalledWith({
    attributes: ['firstName', 'lastName', 'patient_id'],
    where: {
      user_id: userId,
    },
  });
  expect(data).toEqual([
    { name: 'name', lastName: 'name', patient_id: 'patient_id' },
  ]);
});
