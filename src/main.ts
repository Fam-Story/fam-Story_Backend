import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './common/util/swagger';
import { HttpExceptionFilter } from './common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.enableCors({
    origin: 'https://famstory.thisiswandol.com',
    methods: 'GET,PUT,POST,DELETE',
    optionsSuccessStatus: 200,
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  setupSwagger(app);

  await app.listen(3000);
}
bootstrap();
