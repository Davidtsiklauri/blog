import { ValidationError, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ExceptionsFilter } from './modules/base/filters/exceptions.filter';
import { ZError } from './modules/base/utils/mongo-error-handler.class';

function exceptionFactory(errors: ValidationError[]) {
  return ZError.dataValidation(errors[0]);
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory,
      transform: true,
      whitelist: true,
    }),
  );
  app.useGlobalFilters(new ExceptionsFilter(httpAdapter));

  await app.listen(3000);
}
bootstrap();
