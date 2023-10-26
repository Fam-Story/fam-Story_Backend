import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FamilyMember } from './family-member.entity';

@Entity('post', { schema: 'family_app_db' })
export class Post {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ID' })
  id: number;

  @Column('varchar', { name: 'Title', length: 50 })
  title: string;

  @Column('varchar', { name: 'Context', length: 50 })
  context: string;

  @Column('date', { name: 'Created_Date' })
  createdDate: string;

  @ManyToOne(() => FamilyMember, (familyMember) => familyMember.posts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'Src_Member_ID', referencedColumnName: 'id' }])
  srcMember: FamilyMember;
}
