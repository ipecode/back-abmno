import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Exemplo')
    .setDescription('Descrição da API')
    .setVersion('1.0')
    .addTag('example')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Configuração do servidor
  const baseUrl = configService.get<string>('BASE_URL') || 'http://localhost';
  const port = configService.get<number>('PORT') ?? 3000;

  await app.listen(port, () => {
    console.log(`🚀 Aplicação rodando em: ${baseUrl}:${port}`);
    console.log(`📘 Swagger disponível em: ${baseUrl}:${port}/api`);
  });
}

bootstrap();
