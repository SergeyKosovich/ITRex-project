import { User } from '../db/models.js';

class UserStorage {
  async getUserByEmail(email) {
    const user = await User.findOne({
      attributes: ['email', 'password', 'user_id'],
      where: { email },
    });

    return user || null;
  }
}

export default new UserStorage();
