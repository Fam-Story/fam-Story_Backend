import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { FamilymemberEntity } from './familymember.entity';

@Index('FK_family_member_TO_post_1', ['srcMemberId'], {})
@Entity('post', { schema: 'family_app_db' })
export class PostEntity {
  @Column('varchar', { primary: true, name: 'ID', length: 255 })
  id: string;

  @Column('int', { primary: true, name: 'src_member_ID' })
  srcMemberId: number;

  @Column('varchar', { name: 'title', nullable: true, length: 50 })
  title: string | null;

  @Column('varchar', { name: 'post_context', nullable: true, length: 50 })
  postContext: string | null;

  @Column('date', { name: 'created_date', nullable: true })
  createdDate: string | null;

  @ManyToOne(() => FamilymemberEntity, (familyMember) => familyMember.posts, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'src_member_ID', referencedColumnName: 'id' }])
  srcMember: FamilymemberEntity;
}
