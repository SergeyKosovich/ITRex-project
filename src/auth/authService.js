import bcrypt from "bcryptjs";
import ApiError from "../errors/appError.js";
import userStorage from "../repositories/userStorage.js";
import { INCORRECT_LOGIN, INCORRECT_PASSWORD } from "../constants/messages.js";
import { UNAUTHORIZED } from "../constants/statusCodes.js";

export default class AuthService {
  async checkCredentials(body) {
    const { email, password } = body;
    const data = await userStorage.getUserByEmail(email);

    if (!data) {
      throw new ApiError(UNAUTHORIZED, INCORRECT_LOGIN);
    }

    const validPassword = bcrypt.compareSync(password, data.password);
    if (!validPassword) {
      throw new ApiError(UNAUTHORIZED, INCORRECT_PASSWORD);
    }

    return data;
  }
}
