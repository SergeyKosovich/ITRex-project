import RedisStorage from '../storageClasses/redisStorage.js';

class redisClient {}
redisClient.on = jest.fn();
redisClient.FLUSHDB = jest.fn();
redisClient.HMGET = jest.fn();
redisClient.HMSET = jest.fn();
redisClient.HDEL = jest.fn();

const service = new RedisStorage(redisClient);

test('getResolutionInStorage resolution from storage', async () => {
  const name = 'testName';
  const textResolution = 'resolution';
  redisClient.HMGET = jest.fn(() => [textResolution]);
  const resolution = await service.getResolutionInStorage(name);
  expect(redisClient.HMGET).toHaveBeenCalledTimes(1);
  expect(redisClient.HMGET).toHaveBeenCalledWith('storage', name);
  expect(resolution).toEqual('resolution');
});

test('setResolutionInStorage should call HMSET method', async () => {
  const name = 'testName';
  const textResolution = 'resolution';
  await service.setResolutionInStorage(name, textResolution);
  expect(redisClient.HMGET).toHaveBeenCalledTimes(1);
});
test('deleteResolutionInStorage should call HMSET method', async () => {
  const name = 'testName';
  await service.deleteResolutionInStorage(name);
  expect(redisClient.HMGET).toHaveBeenCalledTimes(1);
  expect(redisClient.HMGET).toHaveBeenCalledWith('storage', name);
});
