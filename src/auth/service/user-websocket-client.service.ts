import { Injectable } from '@nestjs/common';
import { UserWebsocketClientRepository } from '../repository/user-websocket-client.repository';

@Injectable()
export class UserWebsocketClientService {
  constructor(
    private readonly userWebsocketClientRepository: UserWebsocketClientRepository,
  ) {}

  async setUserClient(userId: string, client: string) {
    await this.userWebsocketClientRepository.setUserClient(userId, client);
  }
}
