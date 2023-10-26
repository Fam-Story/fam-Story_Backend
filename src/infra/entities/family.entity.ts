import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FamilyMember } from './family-member.entity';
import { FamilySchedule } from './family-schedule.entity';
import { Photo } from './photo.entity';

@Entity('family', { schema: 'family_app_db' })
export class Family {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ID' })
  id: number;

  @Column('int', { name: 'Member_Number' })
  memberNumber: number;

  @Column('varchar', { name: 'Family_Name', length: 50 })
  familyName: string;

  @Column('date', { name: 'Created_Date' })
  createdDate: string;

  @OneToMany(() => FamilyMember, (familyMember) => familyMember.family)
  familyMembers: FamilyMember[];

  @OneToMany(() => FamilySchedule, (familySchedule) => familySchedule.family)
  familySchedules: FamilySchedule[];

  @OneToMany(() => Photo, (photo) => photo.family)
  photos: Photo[];
}
