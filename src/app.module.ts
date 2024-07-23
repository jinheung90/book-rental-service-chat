import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { AwsParameterStoreProvider } from './config/aws-parameter-store.provider';
import { UserSessionRepository } from './user/repository/user-session.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [AwsParameterStoreProvider],
    }),
  ],
  providers: [UserSessionRepository],
})
export class AppModule {}
