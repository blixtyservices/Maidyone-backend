definition: {
  openapi: "3.0.0",

  info: {
    title: "Maidyone API",
    version: "1.0.0",
    description: "Maidyone Backend API Documentation",
  },

  servers: [
    {
      url: "https://maidyone-backend-production.up.railway.app/api/v1",
      description: "Production Server",
    },
  ],

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },

  security: [
    {
      bearerAuth: [],
    },
  ],
},