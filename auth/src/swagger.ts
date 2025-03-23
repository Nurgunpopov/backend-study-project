import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'My API',
        version: '1.0.0',
        description: 'API documentation for auth',
      },
      servers: [
        {
          url: 'http://localhost:8000',
          description: 'Local server',
        },
      ],
      components: {
        schemas: {
            Auth: {
              type: 'object',
              properties: {
                id: {
                  type: 'integer',
                  example: 1,
                },
                // userId: {
                //   type: 'integer',
                //   example: 1,
                // },
                lastName: {
                  type: 'string',
                  example: 'Попов',
                },
                firstName: {
                  type: 'string',
                  example: 'Ньургун',
                },
                middleName: {
                  type: 'string',
                  example: 'Николаевич',
                },
                email: {
                  type: 'string',
                  example: 'user@example.com',
                },
                password: {
                  type: 'string',
                  example: 'password123',
                },
                role: {
                  type: 'string',
                  example: 'MASTER',
                },
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
      security: [
        {
          bearerAuth: [],
        },
      ],
      tags: [
        {
          name: 'Auth',
          description: 'Operations related to auth',
        },
      ],
    },
    // apis: ['./src/routes/*.ts'],
    apis: ['/var/www/apps/auth/routes/*.js'],
  };
  
  const swaggerSpec = swaggerJsdoc(options);
  
  export const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  };