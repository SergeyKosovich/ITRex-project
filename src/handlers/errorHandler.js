/* eslint-disable import/extensions */
import ApiError from "../errors/appError.js";

export default function errorHandler(err, req, res, next) {
  let message = "Something went wrong";
  let status = 500;
  if (err instanceof ApiError) {
    message = err.message;
    status = err.statusCode;
  }
  res.status(status).json({ code: status, message });
}
