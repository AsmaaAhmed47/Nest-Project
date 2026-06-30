import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { log } from 'console';
import { SantizeUsernamePipe } from './Auth/pipes/santize-username.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new SantizeUsernamePipe());
  await app.listen(3000);
  console.log(`mongoDB URI is ${process.env.DB_URI}`);
  
  log(`Application is running on: http://localhost:3000`);
}
bootstrap();
