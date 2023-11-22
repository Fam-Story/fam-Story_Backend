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
  createdDate: Date;

  @ManyToOne(() => FamilyMember, (familyMember) => familyMember.sentPosts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'Src_Member_ID', referencedColumnName: 'id' }])
  srcMember: FamilyMember;

  @ManyToOne(() => FamilyMember, (familyMember) => familyMember.gotPosts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'Dst_Member_ID', referencedColumnName: 'id' }])
  dstMember: FamilyMember;

  static createPost(
    title: string,
    context: string,
    createdDate: Date,
    srcMember: FamilyMember,
  ): Post {
    const post = new Post();
    post.title = title;
    post.context = context;
    post.createdDate = createdDate;
    post.srcMember = srcMember;
    return post;
  }
}
