import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api');

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Obras')
    .setDescription('Documentação da API para gerenciamento de obras')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .addServer('http://localhost:3000', 'Development')
    .build();
  
    app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,              
      forbidNonWhitelisted: true,   
      transform: true,              
    }),
  );

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); // http://localhost:3000/docs

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
