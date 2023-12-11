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
import { ChatMessage } from './message.entity';

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

  @Column('varchar', { name: 'Fcm_Token', length: 255 })
  fcmToken: string;

  @Column('varchar', { name: 'Intro_Message', length: 50 })
  introMessage: string;

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
  sentPosts: Post[];

  @OneToMany(() => ChatMessage, (chatMessage) => chatMessage.familyMember)
  chatMessages: ChatMessage[];

  static createFamilyMember(
    role: number,
    family: Family,
    user: User,
    fcmToken: string,
    introMessage: string,
  ): FamilyMember {
    const familyMember = new FamilyMember();
    familyMember.role = role;
    familyMember.pokeCount = 0;
    familyMember.talkCount = 0;
    familyMember.family = family;
    familyMember.user = user;
    familyMember.fcmToken = fcmToken;
    familyMember.introMessage = introMessage;
    return familyMember;
  }

  setId(id: number) {
    this.id = id;
  }
}
