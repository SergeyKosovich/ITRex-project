import { CONFLICT } from '../constants/statusCodes.js';
import ApiError from './appError.js';

export default class CannotBeDeletedError extends ApiError {
  constructor() {
    super(CONFLICT, 'You cannot delete it');
  }
}
