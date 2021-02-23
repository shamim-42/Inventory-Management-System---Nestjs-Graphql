import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}
bootstrap();

//// IF YOU WANT TO USE CORS THEN UNCOMMENT THE BELOW CODE AND COMMENT OUT THE ABOVE bootstrap Function
// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.enableCors({
//     origin: [
//       'http://localhost:3000', // react
//       'http://localhost:8000', // assuming that you are using another application that is running 8000 port. you can add more url in this array regarding Cors. If you dont know about cors then just google it.
//     ],
//   });
//   await app.listen(port);
//   Logger.log(`Server running on http://localhost:${port}`, 'Bootstrap');
// }
// bootstrap();
