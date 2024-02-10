import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from "@nestjs/microservices";
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './exception.filter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: "0.0.0.0",
      port: 9998
    },
  });
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  app.useGlobalFilters(new AllExceptionsFilter());
  app.listen();
}
bootstrap();
  