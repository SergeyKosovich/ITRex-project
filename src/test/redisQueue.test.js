import RedisStorage from '../storageClasses/redisStorage.js';

class redisClient {}
redisClient.RPUSH = jest.fn();
redisClient.on = jest.fn();
redisClient.FLUSHDB = jest.fn();
redisClient.LPOP = jest.fn();
const queueKey = 'queue';

const service = new RedisStorage(redisClient);

test('addToque should call RPUSH method with test argument', async () => {
  await service.addToque('test');
  expect(redisClient.RPUSH).toHaveBeenCalledTimes(1);
  expect(redisClient.RPUSH).toHaveBeenCalledWith(queueKey, 'test');
});

test('indexInQueue should return expected index from the given queue', async () => {
  redisClient.lrange = jest.fn(() => ['test1', 'test2', 'test3']);
  const index = await service.indexInQueue('test2');
  expect(index).toBe(1);
});

test('deleteFromQueue should delete element with index 1 from the given queue', async () => {
  redisClient.lrange = jest.fn(() => ['test1', 'test2', 'test3']);
  redisClient.lrem = jest.fn();
  await service.deleteFromQueue(1);
  expect(redisClient.lrange).toHaveBeenCalledWith(queueKey, 0, -1);
  expect(redisClient.lrange).toHaveBeenCalledTimes(1);
  expect(redisClient.lrem).toHaveBeenCalledTimes(1);
  expect(redisClient.lrem).toHaveBeenCalledWith(queueKey, 1, 'test2');
});

test('removeFirstPatientInQueue should remove first element from queue', async () => {
  await service.removeFirstPatientInQueue();
  expect(redisClient.LPOP).toHaveBeenCalledWith(queueKey);
  expect(redisClient.LPOP).toHaveBeenCalledTimes(1);
});

test('checkFirstPatientInQueue should return first element from given queue', async () => {
  redisClient.lrange = jest.fn(() => ['test1']);
  const firstElement = await service.checkFirstPatientInQueue();
  expect(redisClient.lrange).toHaveBeenCalledWith(queueKey, 0, 0);
  expect(redisClient.lrange).toHaveBeenCalledTimes(1);
  expect(firstElement).toMatch('test1');
});

test('returnQueue should return queue', async () => {
  redisClient.lrange = jest.fn(() => ['test1', 'test2', 'test3']);
  const queue = await service.returnQueue();
  expect(redisClient.lrange).toHaveBeenCalledWith(queueKey, 0, -1);
  expect(redisClient.lrange).toHaveBeenCalledTimes(1);
  expect(queue).toEqual(['test1', 'test2', 'test3']);
});
