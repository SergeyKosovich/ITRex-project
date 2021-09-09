import { User } from "../db/models.js";

export default class UserStorage {
  async getUserByEmail(email) {
    const user = await User.findOne({
      attributes: ["email", "password", "user_id"],
      where: { email },
    });

    return user || null;
  }
}
