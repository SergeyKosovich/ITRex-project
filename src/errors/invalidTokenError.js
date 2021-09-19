import { UNAUTHORIZED } from '../constants/statusCodes.js';
import ApiError from './appError.js';

export default class InvalidTokenError extends ApiError {
  constructor() {
    super(UNAUTHORIZED, 'Invalid Token');
  }
}
