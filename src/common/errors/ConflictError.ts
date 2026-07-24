import ApiError from "./ApiError";

export default class ConflictError extends ApiError {
  constructor(message = "Conflict") {
    super(409, message);
  }
}