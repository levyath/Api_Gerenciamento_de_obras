import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Obras')
    .setDescription('Documentação da API para gerenciamento de obras')
    .setVersion('1.0')
    .build();
  
    app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,              
      forbidNonWhitelisted: true,   
      transform: true,              
    }),
  );

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document); // http://localhost:3000

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
