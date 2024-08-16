import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HealthCheckService } from '@nestjs/terminus';

@Module({
  imports: [],
  exports: [],
  controllers: [HealthController],
})
export class HealthModule {}
