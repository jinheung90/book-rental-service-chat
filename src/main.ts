import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as process from 'process';
import { EnvironmentName } from './config/environment-name';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if (process.env['APP_ENV'] !== EnvironmentName.PROD) {
    const swagger = new DocumentBuilder()
      .setTitle('채팅 서비스')
      .setDescription('채팅 socket io')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, swagger);
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(3000);
}
bootstrap();
