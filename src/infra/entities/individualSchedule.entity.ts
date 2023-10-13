import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { FamilymemberEntity } from './familymember.entity';

@Index('FK_family_member_TO_individual_schedule_1', ['memberId'], {})
@Entity('individual_schedule', { schema: 'family_app_db' })
export class IndividualScheduleEntity {
  @Column('int', { primary: true, name: 'ID' })
  id: number;

  @Column('int', { primary: true, name: 'member_ID' })
  memberId: number;

  @Column('varchar', { name: 'schedule_name', nullable: true, length: 50 })
  scheduleName: string | null;

  @Column('date', { name: 'schedule_date', nullable: true })
  scheduleDate: string | null;

  @ManyToOne(
    () => FamilymemberEntity,
    (familyMember) => familyMember.individualSchedules,
    { onDelete: 'CASCADE', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'member_ID', referencedColumnName: 'id' }])
  member: FamilymemberEntity;
}
