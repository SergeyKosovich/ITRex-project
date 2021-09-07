/* eslint-disable max-classes-per-file */
import InMemoryStorage from '../storageClasses/inMemoryStorage.js';

const queueInMemory = [];
const resolutionsInMemory = new Map();
const service = new InMemoryStorage(queueInMemory, resolutionsInMemory);

test('addToque should add to queue storage given argument', () => {
  service.addToque('test1');
  service.addToque('test2');
  service.addToque('test3');
  expect(queueInMemory[0]).toEqual('test1');
  expect(queueInMemory).toEqual(['test1', 'test2', 'test3']);
});

test('indexInQueue should return index Of given argument', () => {
  let index = service.indexInQueue('test2');
  expect(index).toBe(1);
  queueInMemory.unshift('test4');
  index = service.indexInQueue('test2');
  expect(index).not.toBe(1);
  expect(index).toBe(2);
});

test('deleteFromQueue should remove element from queue storage by index', () => {
  let indexTest = service.indexInQueue('test2');
  expect(indexTest).toBe(2);
  service.deleteFromQueue(indexTest);
  indexTest = service.indexInQueue('test2');
  expect(indexTest).not.toBe(2);
  expect(indexTest).toBe(-1);
});

test('removeFirstPatientInQueue should remove first element from queue storage', async () => {
  let firstElement = queueInMemory[0];
  expect(firstElement).toBe('test4');
  service.removeFirstPatientInQueue();
  [firstElement] = queueInMemory;
  expect(firstElement).not.toBe('test4');
  expect(firstElement).toBe('test1');
});

test('returnQueue should return array of all elements in queue storage', async () => {
  queueInMemory.length = 0;
  let testQueueReturn = service.returnQueue();
  expect(testQueueReturn).toEqual([]);
  service.addToque('test1');
  service.addToque('test2');
  service.addToque('test3');
  testQueueReturn = service.returnQueue();
  expect(testQueueReturn).toEqual(['test1', 'test2', 'test3']);
});
