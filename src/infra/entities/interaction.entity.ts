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

  @Column('tinyint', { name: 'isChecked', width: 1 })
  isChecked: boolean;

  @Column('int', { name: 'interactionType' })
  interactionType: number;

  static createInteraction(
    srcMemberId: number,
    dstMember: FamilyMember,
    interactionType: number,
  ) {
    const interaction: Interaction = new Interaction();
    interaction.srcMemberId = srcMemberId;
    interaction.dstMember = dstMember;
    interaction.isChecked = false;
    interaction.interactionType = interactionType;

    return interaction;
  }
}
