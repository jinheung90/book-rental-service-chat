import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserSessionRepository {
  public constructor(private readonly config: ConfigService) {}
}
