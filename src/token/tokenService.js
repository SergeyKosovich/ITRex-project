import jwt from 'jsonwebtoken';
import { tokenAge, secretKey } from '../config.js';

class TokenService {
  constructor() {
    this.secretKey = secretKey;
  }

  verify(token) {
    return jwt.verify(token, this.secretKey);
  }

  generate(payload) {
    return jwt.sign(payload, this.secretKey, { expiresIn: tokenAge });
  }

  generateForStaff(data) {
    return jwt.sign(data, this.secretKey, { expiresIn: tokenAge });
  }
}

export default new TokenService();
