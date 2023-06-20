import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import { VersioningType } from '@nestjs/common';
import helmet from 'helmet';


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
  await app.listen(3000);
}
bootstrap();
