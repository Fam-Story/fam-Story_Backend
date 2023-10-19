import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Family } from './family.entity';
import { User } from './user.entity';
import { IndividualSchedule } from './individual-schedule.entity';
import { Post } from './post.entity';

@Entity('family_member', { schema: 'family_app_db' })
export class FamilyMember {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ID' })
  id: number;

  @Column('int', { name: 'User_ID' })
  userId: number;

  @Column('int', { name: 'Family_ID' })
  familyId: number;

  @Column('int', { name: 'Role', nullable: true })
  role: number | null;

  @Column('int', { name: 'Poke_Count', nullable: true })
  pokeCount: number | null;

  @Column('int', { name: 'Talk_Count', nullable: true })
  talkCount: number | null;

  @ManyToOne(() => Family, (family) => family.familyMembers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'Family_ID', referencedColumnName: 'id' }])
  family: Family;

  @ManyToOne(() => User, (user) => user.familyMembers, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'User_ID', referencedColumnName: 'id' }])
  user: User;

  @OneToMany(
    () => IndividualSchedule,
    (individualSchedule) => individualSchedule.member,
  )
  individualSchedules: IndividualSchedule[];

  @OneToMany(() => Post, (post) => post.srcMember)
  posts: Post[];
}
