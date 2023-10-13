import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { FamilyEntity } from './family.entity';
import { UserEntity } from './user.entity';
import { IndividualScheduleEntity } from './individualSchedule.entity';
import { PostEntity } from './post.entity';

@Index('FK_family_TO_family_member_1', ['familyId'], {})
@Index('FK_user_TO_family_member_1', ['userId'], {})
@Entity('family_member', { schema: 'family_app_db' })
export class FamilymemberEntity {
  @Column('int', { primary: true, name: 'ID' })
  id: number;

  @Column('int', { primary: true, name: 'user_ID' })
  userId: number;

  @Column('int', { primary: true, name: 'family_ID' })
  familyId: number;

  @Column('int', { name: 'family_role', nullable: true })
  familyRole: number | null;

  @Column('int', { name: 'poke_count', nullable: true })
  pokeCount: number | null;

  @Column('int', { name: 'talk_count', nullable: true })
  talkCount: number | null;

  @ManyToOne(() => FamilyEntity, (family) => family.familyMembers, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'family_ID', referencedColumnName: 'id' }])
  family: FamilyEntity;

  @ManyToOne(() => UserEntity, (user) => user.familyMembers, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_ID', referencedColumnName: 'id' }])
  user: UserEntity;

  @OneToMany(
    () => IndividualScheduleEntity,
    (individualSchedule) => individualSchedule.member,
  )
  individualSchedules: IndividualScheduleEntity[];

  @OneToMany(() => PostEntity, (post) => post.srcMember)
  posts: PostEntity[];
}
