import jwt from "jsonwebtoken";
import { tokenAge } from "../config.js";

class TokenService {
  verify(token, tokenSecret) {
    try {
      const payload = jwt.verify(token, tokenSecret);
      return { payload, error: false };
    } catch (error) {
      return {
        payload: null,
        error: error.name,
      };
    }
  }

  generate(payload, tokenSecret) {
    return jwt.sign(payload, tokenSecret, { expiresIn: tokenAge });
  }

  generateForStaff(data, tokenSecret) {
    return jwt.sign(data, tokenSecret, { expiresIn: tokenAge });
  }
}

export default new TokenService();
