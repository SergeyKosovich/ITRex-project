import { CONFLICT } from '../constants/statusCodes.js';
import ApiError from './appError.js';

export default class EmailExistError extends ApiError {
  constructor() {
    super(CONFLICT, 'This email is already registered');
  }
}
