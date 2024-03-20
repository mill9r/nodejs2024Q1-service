import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomNotFoundExceptionFilter } from './exceptions/record-not-exist.filter';
import { APP_CONFIG } from './app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new CustomNotFoundExceptionFilter());
  await app.listen(APP_CONFIG.port);
}
bootstrap();
