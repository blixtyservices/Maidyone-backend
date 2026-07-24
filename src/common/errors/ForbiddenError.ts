import ApiError from "./ApiError";

export default class ForbiddenError extends ApiError {
  constructor(message = "Forbidden") {
    super(403, message);
  }
}