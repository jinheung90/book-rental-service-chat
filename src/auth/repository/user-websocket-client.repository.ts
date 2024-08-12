import { Inject, Injectable, Logger } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class UserWebsocketClientRepository {
  private logger = new Logger(UserWebsocketClientRepository.name);
  public constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}
  private static USER_CLIENT_PREFIX = 'userId-client-key:';

  setUserClient(userId: string, client: string) {
    this.cacheManager
      .set(UserWebsocketClientRepository.USER_CLIENT_PREFIX + userId, client)
      .catch((reason) => {
        this.logger.error(reason);
        this.logger.error('redis not working');
      });
  }
  deleteUserClient(client: string) {
    this.cacheManager
      .del(UserWebsocketClientRepository.USER_CLIENT_PREFIX + client)
      .catch((reason) => {
        this.logger.error(reason);
        this.logger.error('redis not working');
      });
  }
}
