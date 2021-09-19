/* eslint-disable max-classes-per-file */
import SqlStorage from '../storageClasses/sqlStorage.js';
import { Queue } from '../db/models.js';

const service = new SqlStorage();

Queue.create = jest.fn();
Queue.findOne = jest.fn();
Queue.destroy = jest.fn();
Queue.findAll = jest.fn();

beforeEach(() => jest.clearAllMocks());

test('addToque should call create method in Queue class with test args', async () => {
  await service.addToque('test');
  expect(Queue.create).toHaveBeenCalledTimes(1);
  expect(Queue.create).toHaveBeenCalledWith({ name: 'test' });
});

test('indexInQueue should call findOne method in Queue class with test args', async () => {
  await service.indexInQueue('test');
  expect(Queue.findOne).toHaveBeenCalledTimes(1);
  expect(Queue.findOne).toHaveBeenCalledWith({
    attributes: ['que_id', 'name'],
    where: {
      name: 'test',
    },
  });
});

test('indexInQueue should return -1 when findOne method cant find index', async () => {
  Queue.findOne.mockResolvedValue(null);

  const index = await service.indexInQueue('test');
  expect(Queue.findOne).toHaveBeenCalledTimes(1);
  expect(Queue.findOne).toHaveBeenCalledWith({
    attributes: ['que_id', 'name'],
    where: {
      name: 'test',
    },
  });
  expect(index).toBe(-1);
});

test('deleteFromQueue should call destroy method in Queue class with test args', async () => {
  const index = 5;
  await service.deleteFromQueue(index);
  expect(Queue.destroy).toHaveBeenCalledTimes(1);
  expect(Queue.destroy).toHaveBeenCalledWith({
    where: {
      que_id: index + 1,
    },
  });
});

test('removeFirstPatientInQueue should call destroy method in Queue, and delete first patient from queue', async () => {
  await service.removeFirstPatientInQueue();
  expect(Queue.destroy).toHaveBeenCalledTimes(1);
  expect(Queue.destroy).toHaveBeenCalledWith({
    order: [['que_id', 'ASC']],
    attributes: ['que_id', 'name'],
    limit: 1,
    where: {},
  });
});

test('returnQueue should call findAll method in Queue class and return array', async () => {
  const nameArr = [{ name: 'name1' }, { name: 'name2' }];
  Queue.findAll.mockResolvedValue(nameArr);
  const response = await service.returnQueue();
  expect(Queue.findAll).toHaveBeenCalledTimes(1);
  expect(response).toEqual(['name1', 'name2']);
});
