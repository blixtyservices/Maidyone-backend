import pinoHttp from "pino-http";
import logger from "../common/logger/logger";

const loggerMiddleware = pinoHttp({
  logger,

  customSuccessMessage(req, res) {
    return `${req.method} ${req.url} ${res.statusCode}`;
  },

  customErrorMessage(req, res) {
    return `${req.method} ${req.url} ${res.statusCode}`;
  },
});

export default loggerMiddleware;