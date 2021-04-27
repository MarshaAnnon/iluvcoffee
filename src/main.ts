import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();

// app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
// { whitelist: true } is helpful as you avoid users passing in
// invalid properties to your CoffeesController post request when
// they're creating New coffees. With the power of DTOs and ValidationPipe's
// whitelist feature
// forbidNonWhitelisted: true - gives you the option to stop a request
// from being processed if any non-whitelisted properties are present.
// forbidNonWhitelisted & whitelist enable this functionality right away.
