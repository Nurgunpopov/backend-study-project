import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'My API',
        version: '1.0.0',
        description: 'API documentation for request',
      },
      servers: [
        {
          url: 'http://localhost:8003',
          description: 'Local server',
        },
      ],
      components: {
        schemas: {
          Request: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                example: 1,
              },
              resumeId: {
                type: 'integer',
                example: 5,
              },
              bachelorId: {
                type: 'integer',
                example: 5,
              },
              projectId: {
                type: 'integer',
                example: 10,
              },
              description: {
                type: 'string',
                example: 'This is a description of the request.',
              },
              priority: {
                type: 'integer',
                example: 2,
              },
              status: {
                type: 'string',
                example: 'Черновик',
              },
            },
          },
        },
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
      tags: [
        {
          name: 'Request',
          description: 'Operations related to request',
        },
      ],
    },
    // apis: ['./src/routes/*.ts'],
    apis: ['/var/www/apps/request/routes/*.js'],
  };
  
  const swaggerSpec = swaggerJsdoc(options);
  
  export const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  };