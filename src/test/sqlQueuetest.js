/* eslint-disable max-classes-per-file */
import SqlStorage from '../storageClasses/sqlStorage.js';

class sqlClient {}
class Queue {}
class Patient {}
class Resolution {}
Queue.create = jest.fn();
Queue.findOne = jest.fn();
Queue.destroy = jest.fn();
Queue.findAll = jest.fn();

const service = new SqlStorage(sqlClient, Queue, Patient, Resolution);
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

test('removeFirstPatientInQueue should call findOne method in Queue, which returns object if name exist in queue, than called destroy method', async () => {
  const user = { name: 'testName' };
  Queue.findOne = jest.fn(() => user);
  Queue.destroy = jest.fn();
  await service.removeFirstPatientInQueue();
  expect(Queue.findOne).toHaveBeenCalledTimes(1);
  expect(Queue.findOne).toHaveBeenCalledWith({
    order: [['que_id', 'ASC']],
    attributes: ['que_id', 'name'],
  });
  expect(Queue.destroy).toHaveBeenCalledTimes(1);
  expect(Queue.destroy).toHaveBeenCalledWith({
    where: {
      name: user.name,
    },
  });
});

test('returnQueue should call findAll method in Queue class and return array', async () => {
  const nameArr = [{ name: 'name1' }, { name: 'name2' }];
  Queue.findAll = jest.fn(() => nameArr);
  const response = await service.returnQueue();
  expect(Queue.findAll).toHaveBeenCalledTimes(1);
  expect(response).toEqual(['name1', 'name2']);
});
