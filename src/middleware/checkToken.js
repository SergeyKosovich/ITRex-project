import jwt from 'jsonwebtoken';
import { secretKey } from '../config.js';
import ApiError from '../errors/appError.js';

export default function checkToken(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      throw new ApiError(403, 'user is not authorized');
    }
    const decodeData = jwt.verify(token, secretKey);
    req.user = decodeData;
    console.log(decodeData);
    next();
  } catch (e) {
    next(e);
  }
}
