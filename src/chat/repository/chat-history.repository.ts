import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ChatHistory } from '../entity/chat-history';
import { Model } from 'mongoose';

@Injectable()
export class ChatHistoryRepository {
  constructor(
    @InjectModel(ChatHistory.name)
    private readonly chatHistoryModel: Model<ChatHistory>,
    private readonly configService: ConfigService,
  ) {}

  save(t: ChatHistory) {
    return this.chatHistoryModel.create(t).then();
  }
}
