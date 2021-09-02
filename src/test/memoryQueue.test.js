/* eslint-disable max-classes-per-file */
import InMemoryStorage from '../storageClasses/localStorage.js';

class queueInMemory {}
class resolutionsInMemory {}
queueInMemory.push = jest.fn();
queueInMemory.indexOf = jest.fn();
queueInMemory.splice = jest.fn();
queueInMemory.shift = jest.fn();

const service = new InMemoryStorage(queueInMemory, resolutionsInMemory);

test('addToque should call push method with given argument', async () => {
  await service.addToque('test');
  expect(queueInMemory.push).toHaveBeenCalledTimes(1);
  expect(queueInMemory.push).toHaveBeenCalledWith('test');
});

test('indexInQueue should call indexOf method with the given argument', async () => {
  await service.indexInQueue('test2');
  expect(queueInMemory.indexOf).toHaveBeenCalledTimes(1);
  expect(queueInMemory.indexOf).toHaveBeenCalledWith('test2');
});

test('deleteFromQue should call splice method with the given argument', async () => {
  const index = 3;
  await service.deleteFromQue(index);
  expect(queueInMemory.splice).toHaveBeenCalledTimes(1);
  expect(queueInMemory.splice).toHaveBeenCalledWith(index, 1);
});

test('removeFirstPatientInQue should call shift method', async () => {
  await service.removeFirstPatientInQue();
  expect(queueInMemory.shift).toHaveBeenCalledTimes(1);
});
