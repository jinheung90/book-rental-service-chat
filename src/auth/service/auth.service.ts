import { Injectable, Logger } from '@nestjs/common';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { JwtInfo } from '../dao/jwtInfo';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);
  constructor(private readonly jwtService: JwtService) {}

  verifyAccessToken(token: string, option?: JwtVerifyOptions): JwtInfo {
    if (!token) {
      this.logger.error('not exists token');
      return null;
    }
    return this.jwtService.decode<JwtInfo>(token, option);
  }
}
