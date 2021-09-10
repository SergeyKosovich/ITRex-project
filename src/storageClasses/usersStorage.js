import { User } from '../db/models.js';

export default class UsersStorage {
  constructor(user = User) {
    this.User = user;
  }

  async getUserPasswordAndId(emailToCheck) {
    const user = await this.User.findOne({
      attributes: ['email', 'password', 'user_id'],
      where: {
        email: emailToCheck,
      },
    });
    if (user) {
      return user;
    }
    return null;
  }

  async createNewUser(userMail, userPass) {
    const response = await this.User.create({
      email: userMail,
      password: userPass,
    });
    return response;
  }
}
