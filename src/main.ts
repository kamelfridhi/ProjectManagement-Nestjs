import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json } from 'stream/consumers';


async function bootstrap() {

 

  const app = await NestFactory.create(AppModule);

  // Enable CORS with specific origin and credentials
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });


  await app.listen(3000);


}
bootstrap();
