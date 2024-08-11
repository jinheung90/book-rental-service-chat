import { Injectable } from '@nestjs/common';
import { ChatHistoryRepository } from '../repository/chat-history.repository';
import { ChatHistory } from '../entity/chat-history';

@Injectable()
export class ChatHistoryService {
  constructor(private readonly chatHistoryRepository: ChatHistoryRepository) {}

  insertChatting(context: string, userId: number, bookId: number) {
    const chat = new ChatHistory();
    chat.context = 'a';
    chat.bookId = bookId;
    chat.userId = userId;
    chat.bookUserId = userId;
    this.chatHistoryRepository.save(chat).then();
  }
}
