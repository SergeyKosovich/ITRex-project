import bcrypt from "bcryptjs";
import ApiError from "../errors/appError.js";
import UserStorage from "../repositories/userStorage.js";

export default class AuthService {
  constructor() {
    this.userStorage = new UserStorage();
  }

  async checkCredentials(body) {
    const { email, password } = body;
    const data = await this.userStorage.getUserByEmail(email);

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
