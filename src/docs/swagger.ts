import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Maidyone API",
      version: "1.0.0",
      description: "Maidyone Backend API Documentation",
    },

    servers: [
      {
        url: "https://maidyone-backend-production.up.railway.app",
        description: "Development Server",
      },
    ],
  },

  apis: [
    "./src/modules/**/*.ts",
  ],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;