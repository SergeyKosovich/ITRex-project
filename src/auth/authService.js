import bcrypt from 'bcryptjs';
import InvalidCredentialsError from '../errors/invalidCredentialsError.js';
import userStorage from '../repositories/userStorage.js';

export default class AuthService {
  async checkCredentials(body) {
    const { email, password } = body;
    const data = await userStorage.getUserByEmail(email);
    if (!data) {
      throw new InvalidCredentialsError();
    }

    const validPassword = bcrypt.compareSync(password, data.password);
    if (!validPassword) {
      throw new InvalidCredentialsError();
    }

    return data;
  }
}
