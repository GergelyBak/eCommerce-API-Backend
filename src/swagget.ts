import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "eCommerce API",
      version: "1.0.0",
      description: "Backend API for eCommerce project",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // innen olvassa a kommenteket
};

export const swaggerSpec = swaggerJsdoc(options);