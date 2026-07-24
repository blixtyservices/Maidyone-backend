import ApiError from "./ApiError";

export default class BadRequestError extends ApiError {
  constructor(message = "Bad Request") {
    super(400, message);
  }
}