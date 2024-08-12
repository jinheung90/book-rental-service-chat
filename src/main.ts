import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { RedisIoAdapter } from './config/redis-io.adapter';
import { ConfigService } from '@nestjs/config';
import { AsyncApiDocumentBuilder, AsyncApiModule } from 'nestjs-asyncapi';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // if (process.env['APP_ENV'] !== EnvironmentName.PROD) {
  // swagger
  // const swagger = new DocumentBuilder()
  //   .setTitle('채팅 서비스')
  //   .setDescription('채팅 socket io')
  //   .setVersion('1.0')
  //   .build();
  // const document = SwaggerModule.createDocument(app, swagger);
  // SwaggerModule.setup('api', app, document);

  const asyncApi = new AsyncApiDocumentBuilder()
    .setTitle('채팅 서비스')
    .setDescription('채팅 서비스')
    .setVersion('1.0')
    .setDefaultContentType('application/json')
    // .addSecurity()// none
    .addServer('chatting-ws', {
      url: process.env['APP_SERVER_URL'],
      protocol: 'socket.io',
    })
    .build();

  app.enableCors({
    credentials: true,
    allowedHeaders: ['*'],
    methods: ['*'],
    origin: [process.env['CLIENT_HOST'], process.env['USER_SERVICE_APP']],
  });
  const asyncApiDocument = AsyncApiModule.createDocument(app, asyncApi);
  await AsyncApiModule.setup('/async', app, asyncApiDocument);
  const configService = app.get<ConfigService>(ConfigService);
  const redisAdapter = new RedisIoAdapter(app);
  await redisAdapter.connectToRedis(configService.get('redis-url'));
  app.useWebSocketAdapter(redisAdapter);
  await app.listen(8081);
}
bootstrap();
