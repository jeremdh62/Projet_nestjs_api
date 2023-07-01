import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import { VersioningType } from '@nestjs/common';
import helmet from 'helmet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { createData } from './fixtures/fixtures';


async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: ['error', 'warn', 'debug'],
  });
  app.enableCors();
  app.use(compression());
  app.enableVersioning({
      type: VersioningType.URI,
  });
  app.use(helmet());

  const config = new DocumentBuilder()
    .setTitle('Tasks - API Documentation')
    .setDescription('Api to manage tasks, users...')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await createData();

  await app.listen(3000);
}
bootstrap();
