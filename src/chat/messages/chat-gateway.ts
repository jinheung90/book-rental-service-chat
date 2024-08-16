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
import * as process from 'process';

@WebSocketGateway({
  namespace: '/chat',
  cors: {
    origin: [process.env['CLIENT_HOST'], 'http://localhost:3000'],
    credentials: true,
    transports: ['websocket', 'polling'],
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private server: Server;
  private readonly logger = new Logger(ChatGateway.name);
  constructor(
    private readonly userWebsocketClientService: UserWebsocketClientService,
    private readonly authService: AuthService,
    private readonly chatHistoryService: ChatHistoryService,
  ) {}

  @SubscribeMessage('/send')
  async handleChat(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ) {}

  handleConnection(client: Socket, ...args: any[]) {
    const token = client?.handshake?.headers?.authorization;
    this.logger.verbose(client.handshake.headers);

    const decoded = this.authService.verifyAccessToken(token);

    if (!decoded) {
      this.logger.verbose('bad request token not validate');
      return;
    }

    this.userWebsocketClientService.setUserClient(decoded.sub, client?.id);

    this.logger.verbose(`connect ${decoded.sub}`);
    return decoded.sub;
  }

  handleDisconnect(client: any): any {
    this.userWebsocketClientService.deleteUserClient(client?.id);
  }
}
