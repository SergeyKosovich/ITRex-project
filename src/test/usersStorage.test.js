import UsersStorage from '../storageClasses/usersStorage.js';

class User {}
User.findOne = jest.fn();
User.create = jest.fn();
const service = new UsersStorage(User);

test('getUserPasswordAndId should search user by email and return null if user not exist', async () => {
  User.findOne = jest.fn(() => null);
  const userMail = 'test';
  const res = await service.getUserPasswordAndId(userMail);
  expect(User.findOne).toHaveBeenCalledTimes(1);
  expect(User.findOne).toHaveBeenCalledWith({
    attributes: ['email', 'password', 'user_id'],
    where: {
      email: userMail,
    },
  });
  expect(res).toBe(null);
});

test('createNewUser should create new User in db and return object with User data', async () => {
  const userMail = 'userMail';
  const password = 'password';
  const testData = { userData: 'userData' };
  User.create = jest.fn(() => testData);
  const data = await service.createNewUser(userMail, password);
  expect(User.create).toHaveBeenCalledTimes(1);
  expect(User.create).toHaveBeenCalledWith({
    email: userMail,
    password,
  });
  expect(data).toEqual({ userData: 'userData' });
});
