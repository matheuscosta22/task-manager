import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { SeedService } from './database/seed/seed.service';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const seedService = app.get(SeedService);
  await seedService.seed();

  await app.listen(parseInt(process.env.APP_PORT || '8000'));
}
bootstrap();
