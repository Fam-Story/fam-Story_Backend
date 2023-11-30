import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Family } from './family.entity';
import { FamilyMember } from './family-member.entity';

@Entity()
export class ChatMessage {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ID' })
  id: number;

  @Column('varchar', { name: 'Content', length: 50 })
  content: string;

  @Column('datetime', { name: 'Created_At' })
  createdDate: Date;

  @ManyToOne(() => FamilyMember, (familyMember) => familyMember.chatMessages, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'Member_ID', referencedColumnName: 'id' }])
  familyMember: FamilyMember;

  @ManyToOne(() => Family, (family) => family.chatMessages, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'Family_ID', referencedColumnName: 'id' }])
  family: Family;

  static createMessage(
    content: string,
    createdDate: Date,
    familyMember: FamilyMember,
    family: Family,
  ): ChatMessage {
    const message = new ChatMessage();
    message.content = content;
    message.createdDate = createdDate;
    message.familyMember = familyMember;
    message.family = family;
    return message;
  }
}
