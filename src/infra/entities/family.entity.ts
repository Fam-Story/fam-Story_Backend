import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Album } from './album.entity';
import { FamilyMember } from './family-member.entity';
import { FamilySchedule } from './family-schedule.entity';

@Entity('family', { schema: 'family_app_db' })
export class Family {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ID' })
  id: number;

  @Column('int', { name: 'Member_Number', nullable: true })
  memberNumber: number | null;

  @Column('varchar', { name: 'Family_Name', nullable: true, length: 50 })
  familyName: string | null;

  @Column('date', { name: 'Created_Date', nullable: true })
  createdDate: string | null;

  @OneToMany(() => Album, (album) => album.family)
  albums: Album[];

  @OneToMany(() => FamilyMember, (familyMember) => familyMember.family)
  familyMembers: FamilyMember[];

  @OneToMany(() => FamilySchedule, (familySchedule) => familySchedule.family)
  familySchedules: FamilySchedule[];
}
