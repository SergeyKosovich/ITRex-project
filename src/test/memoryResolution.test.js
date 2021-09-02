/* eslint-disable max-classes-per-file */
import InMemoryStorage from '../storageClasses/localStorage.js';

class queueInMemory {}
class resolutionsInMemory {}
resolutionsInMemory.get = jest.fn();
resolutionsInMemory.set = jest.fn();
resolutionsInMemory.delete = jest.fn();
const service = new InMemoryStorage(queueInMemory, resolutionsInMemory);

test('getResolutionInStorage should call get method', async () => {
  const name = 'name';
  await service.getResolutionInStorage(name);
  expect(resolutionsInMemory.get).toHaveBeenCalledTimes(1);
  expect(resolutionsInMemory.get).toHaveBeenCalledWith('name');
});

test('setResolutionInStorage should call set method', async () => {
  const name = 'name';
  const resolution = 'resolution';
  await service.setResolutionInStorage(name, resolution);
  expect(resolutionsInMemory.set).toHaveBeenCalledTimes(1);
  expect(resolutionsInMemory.set).toHaveBeenCalledWith('name', 'resolution');
});

test('deleteResolutionInStorage should call delete method', async () => {
  const name = 'name';
  await service.deleteResolutionInStorage(name);
  expect(resolutionsInMemory.delete).toHaveBeenCalledTimes(1);
  expect(resolutionsInMemory.delete).toHaveBeenCalledWith('name');
});
