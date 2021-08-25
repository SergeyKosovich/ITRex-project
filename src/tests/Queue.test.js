import currentStorageMethods from '../storageClasses/storageFactory.js';
import { StorageType } from '../config.js';
import { Queue, Patient, Resolution } from '../db/models.js';

jest.mock('../storageClasses/storageFactory.js');
jest.mock('../db/models.js');
const env = StorageType.toString();
afterAll(async () => {
  if (+env === 2) {
    currentStorageMethods.client.quit();
  }
  if (+env === 3) {
    currentStorageMethods.init.close();
  }
});
async function clear() {
  if (+env === 2) {
    await currentStorageMethods.client.FLUSHDB();
  }
  if (+env === 1) {
    currentStorageMethods.queue = [];
    currentStorageMethods.storage = new Map();
  }
  if (+env === 3) {
    await Queue.truncate({ restartIdentity: true });
    await Patient.truncate({ cascade: true });
    await Resolution.truncate({ cascade: true });
  }
}

test('addToque should add new element in storage', async () => {
  await clear();
  const element = 'example1';
  let index = await currentStorageMethods.indexInQueue(element);
  expect(index).toBeLessThan(0);
  expect(index).toBe(-1);
  await currentStorageMethods.addToque(element);
  index = await currentStorageMethods.indexInQueue(element);
  expect(index).toBe(0);
  expect(index).toBeGreaterThan(-1);
});

test('addToque should increase storage length', async () => {
  await clear();
  const element = 'example2';
  let arr = await currentStorageMethods.returnQueue();
  let { length } = arr;
  expect(length).toBeLessThan(1);
  expect(length).toBe(0);
  await currentStorageMethods.addToque(element);
  arr = await currentStorageMethods.returnQueue();
  length = arr.length;
  expect(length).toBe(1);
  expect(length).toBeGreaterThan(0);
});

test('removeFirstPatientInQue should remove first element in storage', async () => {
  await clear();
  await currentStorageMethods.addToque('example1');
  await currentStorageMethods.addToque('example2');
  await currentStorageMethods.addToque('example3');
  await currentStorageMethods.addToque('example4');
  const patient1 = await currentStorageMethods.checkFirstPatientInQueue();
  expect(patient1).toBe('example1');
  await currentStorageMethods.removeFirstPatientInQue();
  const patient2 = await currentStorageMethods.checkFirstPatientInQueue();
  expect(patient2).not.toBe('example1');
});

test('deleteFromQue should delete element from storage', async () => {
  await clear();
  const element = 'example1';
  await currentStorageMethods.addToque(element);
  let index = await currentStorageMethods.indexInQueue(element);
  expect(index).toBeGreaterThan(-1);
  expect(index).toBe(0);
  await currentStorageMethods.deleteFromQue(index);
  index = await currentStorageMethods.indexInQueue(element);
  expect(index).toBe(-1);
  expect(index).toBeLessThan(0);
});

test('deleteFromQue should decrease storage length', async () => {
  await clear();
  const element = 'example1';
  await currentStorageMethods.addToque(element);
  let arr = await currentStorageMethods.returnQueue();
  let { length } = arr;
  expect(length).toBeGreaterThan(0);
  expect(length).toBe(1);
  const index = await currentStorageMethods.indexInQueue(element);
  await currentStorageMethods.deleteFromQue(index);
  arr = await currentStorageMethods.returnQueue();
  length = arr.length;
  expect(length).toBe(0);
  expect(length).toBeLessThan(1);
});

test('checkFirstPatientInQueue should return first element in queue', async () => {
  await clear();
  await currentStorageMethods.addToque('example1');
  await currentStorageMethods.addToque('example2');
  const patient1 = await currentStorageMethods.checkFirstPatientInQueue();
  expect(patient1).toBe('example1');
});

test('returnQueue should return array with all patients in queue', async () => {
  await clear();
  await currentStorageMethods.addToque('example1');
  await currentStorageMethods.addToque('example2');
  await currentStorageMethods.addToque('example3');
  await currentStorageMethods.addToque('example4');
  const queue = await currentStorageMethods.returnQueue();
  expect(queue[0]).toBe('example1');
  expect(queue[1]).toBe('example2');
  expect(queue[2]).toBe('example3');
  expect(queue[3]).toBe('example4');
});
