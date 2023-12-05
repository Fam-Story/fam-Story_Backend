import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FamilyMember } from './family-member.entity';
import { Family } from './family.entity';

@Entity('post', { schema: 'family_app_db' })
export class Post {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ID' })
  id: number;

  @Column('varchar', { name: 'Title', length: 50 })
  title: string;

  @Column('varchar', { name: 'Context', length: 50 })
  context: string;

  @Column('datetime', { name: 'Created_Date' })
  createdDate: Date;

  @ManyToOne(() => FamilyMember, (familyMember) => familyMember.sentPosts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'Src_Member_ID', referencedColumnName: 'id' }])
  srcMember: FamilyMember;

  @ManyToOne(() => Family, (family) => family.posts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'Family_ID', referencedColumnName: 'id' }])
  family: Family;

  static createPost(
    title: string,
    context: string,
    createdDate: Date,
    srcMember: FamilyMember,
    family: Family,
  ): Post {
    const post = new Post();
    post.title = title;
    post.context = context;
    post.createdDate = createdDate;
    post.srcMember = srcMember;
    post.family = family;
    return post;
  }
}
