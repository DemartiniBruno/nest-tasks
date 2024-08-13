import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';


async function bootstrap() {
  dotenv.config()

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform:true,
      whitelist:true,
      forbidNonWhitelisted:true
    })
  )
  
  //Preciso disso para conseguir ler o service nos decorator
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  // app.useGlobalFilters(new GlobalExceptionFilter());
  await app.listen(3000);
}
bootstrap();
