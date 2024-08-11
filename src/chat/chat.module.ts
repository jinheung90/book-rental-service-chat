import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { ChatHistoryService } from './service/chat-history.service';
import { ChatHistoryRepository } from './repository/chat-history.repository';

import { MongooseModule } from '@nestjs/mongoose';
import { ChatHistory, ChatHistorySchema } from './entity/chat-history';
import { UserWebsocketClientRepository } from '../auth/repository/user-websocket-client.repository';
import { ChatGateway } from './messages/chat-gateway';
import { UserWebsocketClientService } from '../auth/service/user-websocket-client.service';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      {
        name: ChatHistory.name,
        schema: ChatHistorySchema,
      },
    ]),
  ],
  controllers: [],
  providers: [
    ChatGateway,
    UserWebsocketClientRepository,
    UserWebsocketClientService,
    ChatHistoryService,
    ChatHistoryRepository,
  ],
})
export class ChatModule {}
