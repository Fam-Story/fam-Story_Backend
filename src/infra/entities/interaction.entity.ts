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

  @ManyToOne(
    () => FamilyMember,
    (familyMember) => familyMember.receivedInteractions,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn([{ name: 'dst_member_id', referencedColumnName: 'id' }])
  dstMember: FamilyMember;

  @Column('tinyint', { name: 'icChecked', width: 1 })
  icChecked: boolean;

  @Column('int', { name: 'interactionType' })
  interactionType: number;
}
