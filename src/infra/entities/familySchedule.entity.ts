import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Family } from './family.entity';

@Entity('family_schedule', { schema: 'family_app_db' })
export class FamilySchedule {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column('varchar', { name: 'schedule_name', nullable: true, length: 50 })
  scheduleName: string | null;

  @Column('date', { name: 'schedule_date', nullable: true })
  scheduleDate: string | null;

  @ManyToOne(() => Family, (family) => family.familySchedules, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'family_ID', referencedColumnName: 'id' }])
  family: Family;
}
