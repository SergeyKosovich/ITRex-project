import jwt from 'jsonwebtoken';
import { secretKey } from '../config.js';

export default function generateToken(userId) {
  const payload = {
    userId,
  };
  return jwt.sign(payload, secretKey);
}
