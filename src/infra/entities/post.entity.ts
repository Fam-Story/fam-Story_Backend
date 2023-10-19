import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FamilyMember } from './family-member.entity';

@Entity('post', { schema: 'family_app_db' })
export class Post {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ID' })
  id: number;

  @Column('int', { name: 'Src_Member_ID' })
  srcMemberId: number;

  @Column('varchar', { name: 'Title', nullable: true, length: 50 })
  title: string | null;

  @Column('varchar', { name: 'Context', nullable: true, length: 50 })
  context: string | null;

  @Column('date', { name: 'Created_Date', nullable: true })
  createdDate: string | null;

  @ManyToOne(() => FamilyMember, (familyMember) => familyMember.posts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'Src_Member_ID', referencedColumnName: 'id' }])
  srcMember: FamilyMember;
}
