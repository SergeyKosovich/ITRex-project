import jwt from 'jsonwebtoken';
import { secretKey } from '../config.js';

export default function generateToken(userId, email) {
  const payload = {
    userId,
    email,
  };
  return jwt.sign(payload, secretKey);
}
