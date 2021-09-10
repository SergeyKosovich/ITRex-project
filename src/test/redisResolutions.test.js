import RedisStorage from '../storageClasses/redisStorage.js';

class redisClient {}
redisClient.on = jest.fn();
redisClient.FLUSHDB = jest.fn();
redisClient.get = jest.fn();
redisClient.setex = jest.fn();
redisClient.HDEL = jest.fn();
const storageKey = 'storage';
const service = new RedisStorage(redisClient);

test('getResolutions resolution from storage', async () => {
  const name = 'testName';
  const textResolution = 'resolution';
  redisClient.get = jest.fn(() => [textResolution]);
  const resolution = await service.getResolutions(name);
  expect(redisClient.get).toHaveBeenCalledTimes(1);
  expect(redisClient.get).toHaveBeenCalledWith(name);
  expect(resolution).toEqual(['resolution']);
});

test('setResolution should call HMSET method', async () => {
  const name = 'testName';
  const textResolution = 'resolution';
  await service.setResolution(name, textResolution);
  expect(redisClient.setex).toHaveBeenCalledTimes(1);
});

test('deleteResolution should call HMSET method', async () => {
  const name = 'testName';
  await service.deleteResolution(name);
  expect(redisClient.HDEL).toHaveBeenCalledTimes(1);
  expect(redisClient.HDEL).toHaveBeenCalledWith(storageKey, name);
});
