import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import dotenv = require('dotenv');
import { ValidationPipe } from '@nestjs/common';
import cookieParser = require('cookie-parser');
dotenv.config();

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(cookieParser());
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
