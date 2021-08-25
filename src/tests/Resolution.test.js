import currentStorageMethods from '../storageClasses/storageFactory.js';
import { StorageType } from '../config.js';
import { Patient, Resolution } from '../db/models.js';

jest.mock('../storageClasses/storageFactory.js');
jest.mock('../db/models.js');
const env = StorageType.toString();
afterAll(async () => {
  if (+env === 2) {
    currentStorageMethods.client.quit();
  }
  if (+env === 3) {
    currentStorageMethods.client.quit();
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
    await currentStorageMethods.client.FLUSHDB();
    await Patient.truncate({ cascade: true });
    await Resolution.truncate({ cascade: true });
  }
}

test('getResolutionInStorage should return resolution by name', async () => {
  await clear();
  await currentStorageMethods.setResolutionInStorage('name1', 'resolution1');
  const resolution = await currentStorageMethods.getResolutionInStorage(
    'name1',
  );
  expect(resolution).toBe('resolution1');
  const resolutionNotExist = await currentStorageMethods.getResolutionInStorage(
    'noPatient',
  );
  expect(resolutionNotExist).toBeFalsy();
});

test('setResolutionInStorage should set resolution in storage', async () => {
  await clear();
  const resolutionNotExist = await currentStorageMethods.getResolutionInStorage(
    'name1',
  );
  expect(resolutionNotExist).toBeFalsy();
  await currentStorageMethods.setResolutionInStorage('name1', 'resolution1');
  const resolution = await currentStorageMethods.getResolutionInStorage(
    'name1',
  );
  expect(resolution).toBe('resolution1');
  expect(resolution).toBeDefined();
});

test('deleteResolutionInStorage should delete resolution in storage by name', async () => {
  await clear();
  await currentStorageMethods.setResolutionInStorage('name1', 'resolution1');
  const resolution = await currentStorageMethods.getResolutionInStorage(
    'name1',
  );
  expect(resolution).toBe('resolution1');
  expect(resolution).toBeDefined();
  await currentStorageMethods.deleteResolutionInStorage('name1');
  const resolutionUndef = await currentStorageMethods.getResolutionInStorage(
    'name1',
  );
  expect(resolutionUndef).toBeFalsy();
});
