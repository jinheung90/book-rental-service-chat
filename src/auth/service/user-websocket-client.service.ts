import { Injectable } from '@nestjs/common';
import { UserWebsocketClientRepository } from '../repository/user-websocket-client.repository';

@Injectable()
export class UserWebsocketClientService {
  constructor(
    private readonly userWebsocketClientRepository: UserWebsocketClientRepository,
  ) {}

  setUserClient(userId: string, client: string) {
    this.userWebsocketClientRepository.setUserClient(userId, client);
  }
  deleteUserClient(client: string) {
    this.userWebsocketClientRepository.deleteUserClient(client);
  }
}
