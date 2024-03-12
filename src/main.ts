import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomNotFoundExceptionFilter } from './exceptions/record-not-exist.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new CustomNotFoundExceptionFilter());
  await app.listen(4000);
}
bootstrap();
