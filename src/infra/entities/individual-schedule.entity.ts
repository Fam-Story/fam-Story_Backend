import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FamilyMember } from './family-member.entity';

@Entity('individual_schedule', { schema: 'family_app_db' })
export class IndividualSchedule {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ID' })
  id: number;

  @Column('int', { name: 'Member_ID' })
  memberId: number;

  @Column('varchar', { name: 'Schedule_Name', nullable: true, length: 50 })
  scheduleName: string | null;

  @Column('date', { name: 'Schedule_Date', nullable: true })
  scheduleDate: string | null;

  @ManyToOne(
    () => FamilyMember,
    (familyMember) => familyMember.individualSchedules,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'Member_ID', referencedColumnName: 'id' }])
  member: FamilyMember;
}
