import 'reflect-metadata';
import './common/bigint';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './config/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: env.CORS_ORIGIN.split(',').map((s) => s.trim()),
    credentials: true,
  });
  app.enableShutdownHooks();
  await app.listen(env.PORT);
  console.log(`Backend Quỹ thiện nguyện & Phí chạy tại http://localhost:${env.PORT}/api/finance`);
}

bootstrap();
