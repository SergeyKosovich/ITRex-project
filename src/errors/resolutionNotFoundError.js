import { NOT_FOUND } from '../constants/statusCodes.js';
import ApiError from './appError.js';

export default class ResolutionNotFoundError extends ApiError {
  constructor() {
    super(NOT_FOUND, 'Resolutions not found');
  }
}
