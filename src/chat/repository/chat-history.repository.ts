import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ChatHistory } from '../entity/chat-history';
import { Model } from 'mongoose';

@Injectable()
// implements RepositoryBase<ChatHistory, ChatHistoryKey>
export class ChatHistoryRepository {
  constructor(
    @InjectModel(ChatHistory.name)
    private readonly chatHistoryModel: Model<ChatHistory>,
    private readonly configService: ConfigService,
  ) {}
  //
  // delete(k: ChatHistoryKey) {
  //   this.chatHistoryModel.delete(k).then();
  // }
  //
  // findById(k: ChatHistoryKey): Promise<Item<ChatHistory>> {
  //   return this.chatHistoryModel.get(k);
  // }
  //
  save(t: ChatHistory) {
    return this.chatHistoryModel.create(t).then();
  }
  //
  // update(t: ChatHistory): Promise<Item<ChatHistory>> {
  //   return this.chatHistoryModel.update(t);
  // }

  // findAllByUserIdAndNotRead(userId: number): Promise<Item<ChatHistory>> {
  //   this.chatHistoryModel.query();
  // }
}
