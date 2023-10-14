import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FamilyMemberEntity } from './familymember.entity';

@Entity('post', { schema: 'family_app_db' })
export class PostEntity {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column('int', { primary: true, name: 'src_member_ID' })
  srcMemberId: number;

  @Column('varchar', { name: 'title', nullable: true, length: 50 })
  title: string | null;

  @Column('varchar', { name: 'post_context', nullable: true, length: 50 })
  postContext: string | null;

  @Column('date', { name: 'created_date', nullable: true })
  createdDate: string | null;

  @ManyToOne(() => FamilyMemberEntity, (familyMember) => familyMember.posts, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'src_member_ID', referencedColumnName: 'id' }])
  srcMember: FamilyMemberEntity;
}
