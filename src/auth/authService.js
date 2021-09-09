import bcrypt from "bcryptjs";
import ApiError from "../errors/appError.js";
import userStorage from "../repositories/userStorage.js";

export default class AuthService {
  async checkCredentials(body) {
    const { email, password } = body;
    const data = await userStorage.getUserByEmail(email);

    if (!data) {
      throw new ApiError(401, "incorrect login");
    }

    const validPassword = bcrypt.compareSync(password, data.password);
    if (!validPassword) {
      throw new ApiError(401, "incorrect password");
    }

    return data;
  }
}
