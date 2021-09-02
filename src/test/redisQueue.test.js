import RedisStorage from '../storageClasses/redisStorage.js';

class redisClient {}
redisClient.RPUSH = jest.fn();
redisClient.on = jest.fn();
redisClient.FLUSHDB = jest.fn();
redisClient.LPOP = jest.fn();

const service = new RedisStorage(redisClient);

test('addToque should call RPUSH method with test argument', async () => {
  await service.addToque('test');
  expect(redisClient.RPUSH).toHaveBeenCalledTimes(1);
  expect(redisClient.RPUSH).toHaveBeenCalledWith('queue', 'test');
});

test('indexInQueue should return index 1 from the given queue', async () => {
  redisClient.lrange = jest.fn(() => ['test1', 'test2', 'test3']);
  const index = await service.indexInQueue('test2');
  expect(index).toBe(1);
});

test('deleteFromQue should delete element with index 1 from the given queue', async () => {
  redisClient.lrange = jest.fn(() => ['test1', 'test2', 'test3']);
  redisClient.lrem = jest.fn();
  await service.deleteFromQue(1);
  expect(redisClient.lrange).toHaveBeenCalledTimes(1);
  expect(redisClient.lrem).toHaveBeenCalledTimes(1);
  expect(redisClient.lrem).toHaveBeenCalledWith('queue', 1, 'test2');
});

test('removeFirstPatientInQue should remove first element from queue', async () => {
  await service.removeFirstPatientInQue();
  expect(redisClient.LPOP).toHaveBeenCalledTimes(1);
});

test('checkFirstPatientInQueue should return first element from given queue', async () => {
  redisClient.lrange = jest.fn(() => ['test1']);
  const firstElement = await service.checkFirstPatientInQueue();
  expect(redisClient.lrange).toHaveBeenCalledTimes(1);
  expect(firstElement).toMatch('test1');
});

test('returnQueue should return queue', async () => {
  redisClient.lrange = jest.fn(() => ['test1', 'test2', 'test3']);
  const queue = await service.returnQueue();
  expect(redisClient.lrange).toHaveBeenCalledTimes(1);
  expect(queue).toEqual(['test1', 'test2', 'test3']);
});
