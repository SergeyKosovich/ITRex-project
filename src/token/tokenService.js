import jwt from "jsonwebtoken";

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

  generate(userId, tokenSecret) {
    const payload = {
      userId,
    };
    return jwt.sign(payload, tokenSecret, { expiresIn: "30m" });
  }

  generateForStaff(data, tokenSecret) {
    return jwt.sign(data, tokenSecret, { expiresIn: "30m" });
  }
}

export default new TokenService();
