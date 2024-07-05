import { NestFactory } from '@nestjs/core';
import { CustomerServiceModule } from './customer-service.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(CustomerServiceModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.CUSTOMER_SERVICE_PORT || process.env.PORT || 8080);
}
bootstrap();
