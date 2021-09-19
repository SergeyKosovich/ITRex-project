import tokenService from '../token/tokenService.js';
import UserUnauthorizedError from '../errors/userUnauthorizedError.js';
import InvalidTokenError from '../errors/invalidTokenError.js';

export default function checkAuth(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      throw new UserUnauthorizedError();
    }

    const payload = tokenService.verify(token);

    req.user = payload;
    return next();
  } catch (error) {
    return next(new InvalidTokenError());
  }
}
