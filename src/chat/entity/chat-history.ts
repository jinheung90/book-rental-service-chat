import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class ChatHistory {
  @Prop()
  userId: number;
  @Prop()
  bookId: number;
  @Prop()
  bookUserId: number;
  @Prop()
  context: string;
  @Prop()
  image: string;
  @Prop()
  read: boolean;
}

export const ChatHistorySchema = SchemaFactory.createForClass(ChatHistory);
