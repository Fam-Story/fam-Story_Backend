import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FamilyMemberEntity } from './familymember.entity';

@Entity('individual_schedule', { schema: 'family_app_db' })
export class IndividualScheduleEntity {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column('varchar', { name: 'schedule_name', nullable: true, length: 50 })
  scheduleName: string | null;

  @Column('date', { name: 'schedule_date', nullable: true })
  scheduleDate: string | null;

  @ManyToOne(
    () => FamilyMemberEntity,
    (familyMember) => familyMember.individualSchedules,
    { onDelete: 'CASCADE', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'member_ID', referencedColumnName: 'id' }])
  member: FamilyMemberEntity;
}
