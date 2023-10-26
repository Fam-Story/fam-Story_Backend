import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FamilyMember } from './family-member.entity';

@Entity('interaction', { schema: 'family_app_db' })
export class Interaction {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ID' })
  id: number;

  @Column('int', { name: 'src_member_id' })
  srcMemberId: number;

  @Column('int', { name: 'dst_member_id' })
  dstMemberId: number;

  @Column('tinyint', { name: 'icChecked', width: 1 })
  icChecked: boolean;

  @Column('int', { name: 'interactionType' })
  interactionType: number;

  @ManyToOne(() => FamilyMember, (familyMember) => familyMember.interactions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'src_member_id', referencedColumnName: 'id' }])
  srcMember: FamilyMember;
}
