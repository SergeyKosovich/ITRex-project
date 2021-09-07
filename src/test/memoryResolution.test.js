/* eslint-disable max-classes-per-file */
import InMemoryStorage from '../storageClasses/inMemoryStorage.js';

let queueInMemory = [];
let resolutionsInMemory = new Map();
const service = new InMemoryStorage(queueInMemory, resolutionsInMemory);
beforeEach(() => {
  queueInMemory = [];
  resolutionsInMemory = new Map();
});

test('getResolutionInStorage should return resolution by name', () => {
  const data = {
    name: 'name',
    resolution: 'test resolution',
  };
  service.setResolutionInStorage(data);
  const resolution = service.getResolutionInStorage(data.name);
  expect(resolution).toEqual('test resolution');
  expect(resolution).not.toBeUndefined();
});

test('setResolutionInStorage should add resolution in storage by name', () => {
  const data = {
    name: 'testName2',
    resolution: 'test resolution2',
  };
  let resolutionTest2 = service.getResolutionInStorage(data.name);
  expect(resolutionTest2).toBeUndefined();
  expect(resolutionTest2).not.toEqual('test resolution2');
  service.setResolutionInStorage(data);
  resolutionTest2 = service.getResolutionInStorage(data.name);
  expect(resolutionTest2).not.toBeUndefined();
  expect(resolutionTest2).toEqual('test resolution2');
});

test('deleteResolutionInStorage delete resolution from storage by name', async () => {
  const data = {
    name: 'testName3',
    resolution: 'test resolution3',
  };
  service.setResolutionInStorage(data);
  let resolution3 = service.getResolutionInStorage(data.name);
  expect(resolution3).not.toBeUndefined();
  expect(resolution3).toEqual('test resolution3');
  service.deleteResolutionInStorage(data.name);
  resolution3 = service.getResolutionInStorage(data.name);
  expect(resolution3).toBeUndefined();
  expect(resolution3).not.toEqual('test resolution3');
});
