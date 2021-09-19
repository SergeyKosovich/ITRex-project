import bcrypt from 'bcryptjs';
import AuthService from '../../auth/authService.js';
import { INCORRECT_CREDENTIALS } from '../../constants/messages.js';
import ApiError from '../../errors/appError.js';
import userStorage from '../../repositories/userStorage.js';

const authService = new AuthService();

jest.mock('bcryptjs');
userStorage.getUserByEmail = jest.fn();

const body = { email: 'it@email.ru', password: '123456' };
const data = { password: '123456' };

beforeEach(() => jest.clearAllMocks());

describe("Class 'AuthService': ", () => {
  it("Method 'checkCredentials', if all credentials are valid", async () => {
    userStorage.getUserByEmail.mockResolvedValue(data);
    bcrypt.compareSync.mockReturnValue(true);

    expect(await authService.checkCredentials(body)).toEqual(data);
    expect(userStorage.getUserByEmail).toHaveBeenCalledWith(body.email);
    expect(userStorage.getUserByEmail).toHaveBeenCalledTimes(1);
    expect(bcrypt.compareSync).toHaveBeenCalledWith(
      body.password,
      data.password
    );
    expect(bcrypt.compareSync).toHaveBeenCalledTimes(1);
  });

  it("Method 'checkCredentials', if user not found", async () => {
    userStorage.getUserByEmail.mockResolvedValue(null);

    await expect(authService.checkCredentials(body)).rejects.toThrowError(
      INCORRECT_CREDENTIALS
    );
    await expect(authService.checkCredentials(body)).rejects.toThrowError(
      ApiError
    );

    expect(userStorage.getUserByEmail).toHaveBeenCalledWith(body.email);
    expect(bcrypt.compareSync).toHaveBeenCalledTimes(0);
  });

  it("Method 'checkCredentials', if password is invalid", async () => {
    userStorage.getUserByEmail.mockResolvedValue(data);
    bcrypt.compareSync.mockReturnValue(false);

    await expect(authService.checkCredentials(body)).rejects.toThrowError(
      INCORRECT_CREDENTIALS
    );
    await expect(authService.checkCredentials(body)).rejects.toThrowError(
      ApiError
    );

    expect(userStorage.getUserByEmail).toHaveBeenCalledWith(body.email);
    expect(bcrypt.compareSync).toHaveBeenCalledWith(
      body.password,
      data.password
    );
  });
});
