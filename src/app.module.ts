import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AwsParameterStoreProvider } from './config/aws-parameter-store.provider';
import { ChatModule } from './chat/chat.module';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { RedisClientOptions } from 'redis';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [AwsParameterStoreProvider],
    }),
    CacheModule.registerAsync<RedisClientOptions>({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: await redisStore({
          socket: {
            port: Number.parseInt(configService.get<string>('redis-port')),
            host: configService.get<string>('redis-host'),
          },
        }),
      }),
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('mongodb-full-url'),
        user: configService.get('mongodb-name'),
        pass: configService.get('mongodb-password'),
      }),
    }),
    ChatModule,
    HealthModule,
  ],
})
export class AppModule {}
