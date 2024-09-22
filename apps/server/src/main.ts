import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as csurf from 'csurf';
import * as cookieParser from 'cookie-parser';
import { ignoreCSRF } from './shared/utils/middleware.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(ignoreCSRF(['/csrf-token']));
  app.use(
    csurf({
      cookie: {
        key: 'x-csrf-token',
        path: '/',
        sameSite: 'strict',
        secure: true,
        maxAge: 1000 * 60 * 60 * 24,
      }
    })
  );

  await app.listen(3000);
}
bootstrap();
