import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://192.168.1.16:5173', // Allow requests from this origin
    credentials: true, // Allow sending cookies from the frontend
  });

  await app.listen(3000);
}

bootstrap();
