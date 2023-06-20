import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: ['error', 'warn', 'debug'],
  });
  app.enableCors();
  app.use(compression());
  await app.listen(3000);
}
bootstrap();
