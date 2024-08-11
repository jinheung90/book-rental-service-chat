import { AuthService } from './auth.service';
import { AuthModule } from '../auth.module';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';

describe('AuthServiceTest', () => {
  let authService: AuthService;
  let jwtService: JwtService;
  const testToken =
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaXNzIjoidGVhbSIsIkF1dGhvcml0aWVzIjpbIlJPTEVfVVNFUiJdLCJleHAiOjE3MjM3NDg0NTd9._9yzIL4y0nAX1Eopa4KOIsr0MmktTSmDt-ksjR9rgsE';
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
      providers: [AuthService, JwtService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('jwt decode test', () => {
    const value = authService.verifyAccessToken(testToken);
    expect(value.sub).toBe('1');
    expect(value.iss).toBe('team');
    expect(value.Authorities.at(0)).toBe('ROLE_USER');
    expect(value.exp).toBe(1723748457);
  });
});
