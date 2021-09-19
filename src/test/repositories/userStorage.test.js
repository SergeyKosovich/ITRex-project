import userStorage from '../../repositories/userStorage.js';
import { User } from '../../db/models.js';

User.findOne = jest.fn();

const email = 'mia@mail.ru';
const user = {
  field1: 'data',
  field2: 'data2',
  field3: 'data3',
};

beforeEach(() => jest.clearAllMocks());

describe("'userStorage' repository", () => {
  test("'getUserByEmail' method, if user exist", async () => {
    User.findOne.mockResolvedValue(user);

    expect(await userStorage.getUserByEmail(email)).toEqual(user);
    expect(User.findOne).toHaveBeenCalledWith({
      attributes: ['email', 'password', 'user_id'],
      where: { email },
    });
    expect(User.findOne).toHaveBeenCalledTimes(1);
  });

  test("'getUserByEmail' method, if user doesn't exist", async () => {
    User.findOne.mockResolvedValue(null);
    expect(await userStorage.getUserByEmail(email)).toBeNull();
  });
});
