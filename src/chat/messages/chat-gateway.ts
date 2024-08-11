import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { UserWebsocketClientService } from '../../auth/service/user-websocket-client.service';
import { Logger } from '@nestjs/common';
import { AuthService } from '../../auth/service/auth.service';

import { ChatHistoryService } from '../service/chat-history.service';

@WebSocketGateway({ namespace: '/chat' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private server: Server;
  private readonly logger = new Logger(ChatGateway.name);
  constructor(
    private readonly userWebsocketClientService: UserWebsocketClientService,
    private readonly authService: AuthService,
    private readonly chatHistoryService: ChatHistoryService,
  ) {
    this.chatHistoryService.insertChatting('ab', 1, 2);
  }

  @SubscribeMessage('/send')
  async handleChat(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ) {
    const decoded = this.authService.verifyAccessToken(data);

    if (!decoded) {
      this.logger.verbose('bad request token not validate');
      return;
    }

    await this.userWebsocketClientService.setUserClient(
      decoded.sub,
      client?.id,
    );

    this.logger.verbose('connect');
    return decoded?.sub;
  }

  async handleConnection(client: Socket, ...args: any[]) {}
  handleDisconnect(client: any): any {}
}
