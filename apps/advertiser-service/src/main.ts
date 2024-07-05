import { NestFactory } from '@nestjs/core';
import { AdvertiserServiceModule } from './advertiser-service.module';
import { ValidationPipe } from '@nestjs/common';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AdvertiserServiceModule);
  app.enableCors();
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.ADVERTISER_SERVICE_PORT || process.env.PORT || 8080);
}
bootstrap();
