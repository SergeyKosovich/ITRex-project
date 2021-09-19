import { UNAUTHORIZED } from '../constants/statusCodes.js';
import ApiError from './appError.js';

export default class UserUnauthorizedError extends ApiError {
  constructor() {
    super(UNAUTHORIZED, 'User is not authorized');
  }
}
