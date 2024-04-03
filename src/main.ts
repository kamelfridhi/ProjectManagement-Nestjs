import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with specific origin and credentials
  app.enableCors({
    origin: 'http://localhost:5174',
    credentials: true, // Enable credentials (cookies, authorization headers, etc.)
  });

  await app.listen(3000);
}
bootstrap();
