import ApiError from "./ApiError";

export default class ValidationError extends ApiError {
  constructor(message = "Validation failed") {
    super(422, message);
  }
}