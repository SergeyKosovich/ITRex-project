import jwt from 'jsonwebtoken';
import { tokenAge, secretKey } from '../../config';
import tokenService from '../../token/tokenService';

jest.mock('jsonwebtoken');

const token = 'lksjfba8a9sd.asofuq9wfuasf.as9d8afwa';
const userId = '1234456';
const payload = { user_id: userId };
const data = {
  doctor_id: 3,
  name: 'Linus Torvalds',
  createdAt: '2021-09-08T19:44:18.836Z',
  updatedAt: '2021-09-08T19:44:18.836Z',
  user_id: 3,
  specializations: [{ name: 'pediatrician' }],
};

beforeEach(() => jest.clearAllMocks());

describe("Class 'TokenService'", () => {
  it("Method 'verify', if token is valid", () => {
    jwt.verify.mockReturnValue(payload);

    expect(tokenService.verify(token)).toEqual(payload);
    expect(jwt.verify).toHaveBeenCalledWith(token, secretKey);
    expect(jwt.verify).toHaveBeenCalledTimes(1);
  });

  it("Method 'generate'", () => {
    jwt.sign.mockReturnValue('access token');

    expect(tokenService.generate(payload)).toBe('access token');
    expect(jwt.sign).toHaveBeenCalledWith(payload, secretKey, {
      expiresIn: tokenAge,
    });
    expect(jwt.sign).toHaveBeenCalledTimes(1);
  });

  it("Method 'generateForStaff'", () => {
    jwt.sign.mockReturnValue('access token');

    expect(tokenService.generateForStaff(data)).toBe('access token');
    expect(jwt.sign).toHaveBeenCalledWith(data, secretKey, {
      expiresIn: tokenAge,
    });
    expect(jwt.sign).toHaveBeenCalledTimes(1);
  });
});
