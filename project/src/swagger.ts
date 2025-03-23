import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation for my project',
    },
    servers: [
      {
        url: 'http://localhost:8000',
        description: 'Local server',
      },
    ],
    components: {
      schemas: {
        Project: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            masterId: {
              type: 'integer',
              example: 123,
            },
            userId: {
              type: 'integer',
              example: 456,
            },
            name: {
              type: 'string',
              example: 'My Awesome Project',
            },
            description: {
              type: 'string',
              example: 'This is a description of the project.',
            },
            lookingFor: {
              type: 'string',
              example: 'We are looking for frontend developers.',
            },
            maxStudents: {
              type: 'integer',
              example: 5,
            },
            studentsAmount: {
              type: 'integer',
              example: 3,
            },
            status: {
              type: 'string',
              example: 'Не подтвержден',
            },
          },
        },
        Master: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            userId: {
              type: 'integer',
              example: 1,
            },
            group: {
              type: 'string',
              example: 'K4140',
            }
            
          }
        }
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    tags: [
      {
        name: 'Master',
        description: 'Operations related to masters',
      },
      {
        name: 'Project',
        description: 'Operations related to projects',
      },
    ],
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
    // apis: ['./src/routes/*.ts'],
    apis: ['/var/www/apps/project/routes/*.js'],
};

  const swaggerSpec = swaggerJsdoc(options);
  
  export const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  };