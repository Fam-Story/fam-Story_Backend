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
  @PrimaryGeneratedColumn({ type: 'int', name: 'ID' })
  id: number;

  @Column('varchar', { name: 'Schedule_Name', length: 50 })
  scheduleName: string;

  @Column('date', { name: 'Schedule_Date' })
  scheduleDate: Date;

  @ManyToOne(() => Family, (family) => family.familySchedules, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'Family_ID', referencedColumnName: 'id' }])
  family: Family;

  static createFamilySchedule(
    scheduleName: string,
    scheduleDate: Date,
    family: Family,
  ): FamilySchedule {
    const familySchedule = new FamilySchedule();
    familySchedule.scheduleName = scheduleName;
    familySchedule.scheduleDate = scheduleDate;
    familySchedule.family = family;
    return familySchedule;
  }

  setId(id: number) {
    this.id = id;
  }
}
