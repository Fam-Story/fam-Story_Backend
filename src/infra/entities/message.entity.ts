import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ChatMessage {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ID' })
  id: number;

  @Column('varchar', { name: 'Context', length: 50 })
  context: string;

  @Column('datetime', { name: 'Created_At' })
  createdDate: Date;

  @Column('int', { name: 'Member_ID' })
  srcMemberId: number;

  @Column('int', { name: 'Family_ID' })
  familyId: number;

  static createMessage(
    context: string,
    createdDate: Date,
    srcMemberId: number,
    familyId: number,
  ): ChatMessage {
    const message = new ChatMessage();
    message.context = context;
    message.createdDate = createdDate;
    message.srcMemberId = srcMemberId;
    message.familyId = familyId;
    return message;
  }
}
