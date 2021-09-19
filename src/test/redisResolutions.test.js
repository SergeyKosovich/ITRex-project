import RedisStorage from '../storageClasses/redisStorage.js';

class redisClient {}
redisClient.on = jest.fn();
redisClient.FLUSHDB = jest.fn();
redisClient.get = jest.fn();
redisClient.setex = jest.fn();
redisClient.HDEL = jest.fn();

const service = new RedisStorage(redisClient);

test('getResolutionInStorage resolution from storage', async () => {
  const name = 'testName';
  const textResolution = 'resolution';
  redisClient.get = jest.fn(() => [textResolution]);
  const resolution = await service.getResolutionInStorage(name);
  expect(redisClient.get).toHaveBeenCalledTimes(1);
  expect(redisClient.get).toHaveBeenCalledWith(name);
  expect(resolution).toEqual(['resolution']);
});

test('setResolutionInStorage should call HMSET method', async () => {
  const name = 'testName';
  const textResolution = 'resolution';
  await service.setResolutionInStorage(name, textResolution);
  expect(redisClient.setex).toHaveBeenCalledTimes(1);
});

test('deleteResolutionInStorage should call HMSET method', async () => {
  const name = 'testName';
  await service.deleteResolutionInStorage(name);
  expect(redisClient.HDEL).toHaveBeenCalledTimes(1);
  expect(redisClient.HDEL).toHaveBeenCalledWith('storage', name);
});
