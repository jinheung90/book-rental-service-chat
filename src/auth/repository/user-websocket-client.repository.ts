import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class UserWebsocketClientRepository {
  public constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}
  private static USER_CLIENT_PREFIX = 'user-client-key:';

  async setUserClient(userId: string, client: string) {
    await this.cacheManager.set(
      UserWebsocketClientRepository.USER_CLIENT_PREFIX + userId,
      client,
    );
  }
}
