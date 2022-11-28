import { Application } from 'express';
import * as swaggerJSDoc from 'swagger-jsdoc';
import * as swaggerUi from 'swagger-ui-express';

export class SwaggerConfig {
  constructor(app: Application, HOST: string, PORT: number) {
    const swaggerDefinition = {
      openapi: '3.0.0',
      info: {
        title: 'USERS API', // Title of the documentation
        version: '1.0.0', // Version of the app
        description: 'The Users REST API', // short description of the app
      },
      host: `${HOST}:${PORT}`, // the host or url of the app (change to use .env instead)
      basePath: '/', // the base path of your endpoint
    };
    const options = {
      swaggerDefinition,
      // this is a sample but you can change as you wish
      apis: [__dirname + '/**/docs/*.yaml'],
    };
    const swaggerSpec = swaggerJSDoc(options);
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }
}
