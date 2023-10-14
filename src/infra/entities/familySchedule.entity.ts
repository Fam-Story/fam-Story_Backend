import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FamilyEntity } from './family.entity';

@Entity('family_schedule', { schema: 'family_app_db' })
export class FamilyScheduleEntity {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column('varchar', { name: 'schedule_name', nullable: true, length: 50 })
  scheduleName: string | null;

  @Column('date', { name: 'schedule_date', nullable: true })
  scheduleDate: string | null;

  @ManyToOne(() => FamilyEntity, (family) => family.familySchedules, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'family_ID', referencedColumnName: 'id' }])
  family: FamilyEntity;
}
