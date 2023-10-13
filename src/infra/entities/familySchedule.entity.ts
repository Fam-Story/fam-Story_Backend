import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { FamilyEntity } from './family.entity';

@Index('FK_family_TO_family_schedule_1', ['familyId'], {})
@Entity('family_schedule', { schema: 'family_app_db' })
export class FamilyScheduleEntity {
  @Column('int', { primary: true, name: 'ID' })
  id: number;

  @Column('int', { primary: true, name: 'family_ID' })
  familyId: number;

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
