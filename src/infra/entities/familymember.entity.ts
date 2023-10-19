import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Family } from './family.entity';
import { User } from './user.entity';
import { IndividualSchedule } from './individualSchedule.entity';
import { Post } from './post.entity';

@Entity('family_member', { schema: 'family_app_db' })
export class FamilyMember {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column('int', { name: 'family_role', nullable: true })
  familyRole: number | null;

  @Column('int', { name: 'poke_count', nullable: true })
  pokeCount: number | null;

  @Column('int', { name: 'talk_count', nullable: true })
  talkCount: number | null;

  @ManyToOne(() => Family, (family) => family.familyMembers, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'family_ID', referencedColumnName: 'id' }])
  family: Family;

  @OneToOne(() => User, (user) => user.familyMember, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_ID', referencedColumnName: 'id' }])
  user: User;

  @OneToMany(
    () => IndividualSchedule,
    (individualSchedule) => individualSchedule.member,
  )
  individualSchedules: IndividualSchedule[];

  @OneToMany(() => Post, (post) => post.srcMember)
  posts: Post[];
}
