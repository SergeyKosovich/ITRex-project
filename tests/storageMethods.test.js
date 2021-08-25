/* eslint-disable */
import currentStorageMethods from '../src/storageClasses/storageFactory.js';
import { storageType } from '../src/config.js';
import {Queque, Patient, Resolution} from '../src/db/models.js';
jest.mock('../src/storageClasses/storageFactory.js'); 
jest.mock('../src/db/models.js'); 

afterAll(async() =>  {if (storageType === 2 || +storageType === 2) {   
  currentStorageMethods.client.quit();
}if(storageType === 3 || +storageType === 3){
  await Queque.truncate({ restartIdentity: true });
  await Patient.truncate({ cascade: true });
  await Resolution.truncate({ cascade: true });
  currentStorageMethods.init.close()
}
});
async function clear() {
  if (storageType === 2) {
    await currentStorageMethods.client.FLUSHDB();
  }
  if (storageType === 1) {
    currentStorageMethods.queqe = [];
    currentStorageMethods.storage = new Map();
  }
  if(storageType === 3){
    await Queque.truncate({ restartIdentity: true });
    await Patient.truncate({ cascade: true });
    await Resolution.truncate({ cascade: true });
  }
}

test('addToque should add new element in storage', async () => {
  await clear();
  const element = 'example1';
  let index = await currentStorageMethods.indexInQueqe(element);
  expect(index).toBeLessThan(0);
  expect(index).toBe(-1);
  await currentStorageMethods.addToque(element);
  index = await currentStorageMethods.indexInQueqe(element);
  expect(index).toBe(0);
  expect(index).toBeGreaterThan(-1);
});

test('addToque should increase storage length', async () => {
  const element = 'example2';
  let arr = await currentStorageMethods.returnQueqe();
  let length = arr.length;
  expect(length).toBeLessThan(2);
  expect(length).toBe(1);
  await currentStorageMethods.addToque(element);
  arr = await currentStorageMethods.returnQueqe();
  length = arr.length;
  expect(length).toBe(2);
  expect(length).toBeGreaterThan(1);
});

test('removeFirstPatientInQue should remove first element in storage', async () => {
  await clear();
  await currentStorageMethods.addToque('example1');
  await currentStorageMethods.addToque('example2');
  await currentStorageMethods.addToque('example3');
  await currentStorageMethods.addToque('example4');
  const patient1 = await currentStorageMethods.checkFirstPatientInQueqe();
  expect(patient1).toBe('example1');
  await currentStorageMethods.removeFirstPatientInQue();
  const patient2 = await currentStorageMethods.checkFirstPatientInQueqe();
  expect(patient2).not.toBe('example1');
});

test('deleteFromQue should delete element from storage', async () => {
  await clear();
  const element = 'example1';
  await currentStorageMethods.addToque(element);
  let index = await currentStorageMethods.indexInQueqe(element); 
  expect(index).toBeGreaterThan(-1);
  expect(index).toBe(0);
  await currentStorageMethods.deleteFromQue(index);
  index = await currentStorageMethods.indexInQueqe(element); 
  expect(index).toBe(-1);
  expect(index).toBeLessThan(0);
});

test('deleteFromQue should decrease storage length', async () => {
  const element = 'example1';
  await currentStorageMethods.addToque(element);
  let arr = await currentStorageMethods.returnQueqe();
  let length = arr.length;
  expect(length).toBeGreaterThan(0);
  expect(length).toBe(1);
  let index = await currentStorageMethods.indexInQueqe(element);
  await currentStorageMethods.deleteFromQue(index);
  arr = await currentStorageMethods.returnQueqe();
  length = arr.length;
  expect(length).toBe(0);
  expect(length).toBeLessThan(1);
});

test('checkFirstPatientInQueqe should return first element in queqe', async () => {
  await clear();
  await currentStorageMethods.addToque('example1');
  await currentStorageMethods.addToque('example2');
  const patient1 = await currentStorageMethods.checkFirstPatientInQueqe();
  expect(patient1).toBe('example1');
});

test('returnQueqe should return array with all patients in queqe', async () => {
  await clear();
  await currentStorageMethods.addToque('example1');
  await currentStorageMethods.addToque('example2');
  await currentStorageMethods.addToque('example3');
  await currentStorageMethods.addToque('example4');
  const queqe = await currentStorageMethods.returnQueqe();
  expect(queqe[0]).toBe('example1');
  expect(queqe[1]).toBe('example2');
  expect(queqe[2]).toBe('example3');
  expect(queqe[3]).toBe('example4');
});

test('getResolutionInStorage should return resolution by name', async () => {
  await clear();
  await currentStorageMethods.setResolutionInStorage('name1', 'resolution1');
  const resolution = await currentStorageMethods.getResolutionInStorage(
    'name1'
  );
  expect(resolution).toBe('resolution1');
  const resolutionNotExist = await currentStorageMethods.getResolutionInStorage(
    'noPatient'
  );
  expect(resolutionNotExist).toBeFalsy();
});

test('setResolutionInStorage should set resolution in storage', async () => {
  await clear();
  const resolutionNotExist = await currentStorageMethods.getResolutionInStorage(
    'name1'
  );
  expect(resolutionNotExist).toBeFalsy();
  await currentStorageMethods.setResolutionInStorage('name1', 'resolution1');
  const resolution = await currentStorageMethods.getResolutionInStorage(
    'name1'
  );
  expect(resolution).toBe('resolution1');
  expect(resolution).toBeDefined();
});

test('deleteResolutionInstorage should delete resolution in storage by name', async () => {
  await clear();
  await currentStorageMethods.setResolutionInStorage('name1', 'resolution1');
  const resolution = await currentStorageMethods.getResolutionInStorage(
    'name1'
  );
  expect(resolution).toBe('resolution1');
  expect(resolution).toBeDefined();
  await currentStorageMethods.deleteResolutionInstorage('name1');
  const resolutionUndef = await currentStorageMethods.getResolutionInStorage(
    'name1'
  );
  expect(resolutionUndef).toBeFalsy(); 
});
