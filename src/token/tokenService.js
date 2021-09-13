import jwt from "jsonwebtoken";
import { tokenAge, secretKey } from "../config.js";

class TokenService {
  constructor() {
    this.secretKey = secretKey;
  }

  verify(token) {
    try {
      const payload = jwt.verify(token, this.secretKey);
      return { payload, error: false };
    } catch (error) {
      return {
        payload: null,
        error: error.name,
      };
    }
  }

  generate(payload) {
    return jwt.sign(payload, this.secretKey, { expiresIn: tokenAge });
  }

  generateForStaff(data) {
    return jwt.sign(data, this.secretKey, { expiresIn: tokenAge });
  }
}

export default new TokenService();
