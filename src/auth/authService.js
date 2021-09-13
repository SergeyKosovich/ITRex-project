import bcrypt from "bcryptjs";
import userStorage from "../repositories/userStorage.js";
import InvalidLoginError from "../errors/invalidLoginError.js";
import InvalidPasswordError from "../errors/invalidPasswordError.js";

export default class AuthService {
  async checkCredentials(body) {
    const { email, password } = body;
    const data = await userStorage.getUserByEmail(email);

    if (!data) {
      throw new InvalidLoginError();
    }

    const validPassword = bcrypt.compareSync(password, data.password);
    if (!validPassword) {
      throw new InvalidPasswordError();
    }

    return data;
  }
}
