import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation for my resume',
    },
    servers: [
      {
        url: 'http://localhost:8002',
        description: 'Local server',
      },
    ],
    components: {
      schemas: {
        Resume: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            bachelorId: {
              type: 'integer',
              example: 12,
            },
            description: {
              type: 'string',
              example: 'This is a description of the resume.',
            },
            skills: {
              type: 'string',
              example: 'Im good at frontend developing.',
            },
          },
        },
        Bachelor: {
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
        name: 'Bachelor',
        description: 'Operations related to bachelor',
      },
      {
        name: 'Resume',
        description: 'Operations related to resume',
      },
    ],
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
    // apis: ['./src/routes/*.ts'],
    apis: ['/var/www/apps/resume/routes/*.js'],
};

  const swaggerSpec = swaggerJsdoc(options);
  
  export const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  };