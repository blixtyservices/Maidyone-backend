import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";

import swaggerSpec from "./docs/swagger";
import router from "./routes";

import loggerMiddleware from "./middleware/logger.middleware";
import notFoundHandler from "./middleware/notFound.middleware";
import errorMiddleware from "./middleware/error.middleware";

const app = express();

/* ============================================================================
                                APP CONFIGURATION
============================================================================ */

app.disable("x-powered-by");

const API_PREFIX = "/api/v1";

/* ============================================================================
                                SECURITY
============================================================================ */

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
  })
);

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

/* ============================================================================
                                REQUEST LOGGER
============================================================================ */

app.use(loggerMiddleware);

/* ============================================================================
                                PERFORMANCE
============================================================================ */

app.use(compression());

/* ============================================================================
                                BODY PARSERS
============================================================================ */

app.use(
  express.json({
    limit: "10mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  })
);

app.use(cookieParser());

/* ============================================================================
                                HEALTH CHECK
============================================================================ */

app.get("/", (_, res) => {
  return res.status(200).json({
    success: true,
    message: "🚀 Maidyone Backend is Running Successfully",
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});

/* ============================================================================
                                SWAGGER API DOCS
============================================================================ */

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customSiteTitle: "Maidyone Backend API Documentation",
  })
);

/* ============================================================================
                                API ROUTES
============================================================================ */

app.use(API_PREFIX, router);

/* ============================================================================
                                404 HANDLER
============================================================================ */

app.use(notFoundHandler);

/* ============================================================================
                                GLOBAL ERROR HANDLER
============================================================================ */

app.use(errorMiddleware);

/* ============================================================================
                                EXPORT APP
============================================================================ */

export default app;