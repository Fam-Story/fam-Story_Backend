import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Family } from './family.entity';
import { User } from './user.entity';
import { Interaction } from './interaction.entity';
import { Post } from './post.entity';

@Entity('family_member', { schema: 'family_app_db' })
export class FamilyMember {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ID' })
  id: number;

  @Column('int', { name: 'Role' })
  role: number;

  @Column('int', { name: 'Poke_Count' })
  pokeCount: number;

  @Column('int', { name: 'Talk_Count' })
  talkCount: number;

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

  @OneToMany(() => Interaction, (interaction) => interaction.dstMember)
  receivedInteractions: Interaction[];

  @OneToMany(() => Post, (post) => post.srcMember)
  posts: Post[];
  static createFamilyMember(role: number, family: Family, user: User): FamilyMember {
    const familyMember = new FamilyMember();
    familyMember.role = role;
    familyMember.pokeCount = 0;
    familyMember.talkCount = 0;
    familyMember.family = family;
    familyMember.user = user;
    return familyMember;
  }
}
