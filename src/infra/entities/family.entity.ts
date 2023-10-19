import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Album } from './album.entity';
import { FamilyMember } from './family-member.entity';
import { FamilySchedule } from './family-schedule.entity';

@Entity('family', { schema: 'family_app_db' })
export class Family {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ID' })
  id: number;

  @Column('int', { name: 'Member_Number', nullable: false })
  memberNumber: number;

  @Column('varchar', { name: 'Family_Name', nullable: false, length: 50 })
  familyName: string;

  @Column('date', { name: 'Created_Date', nullable: false })
  createdDate: string;

  @OneToMany(() => Album, (album) => album.family)
  albums: Album[];

  @OneToMany(() => FamilyMember, (familyMember) => familyMember.family)
  familyMembers: FamilyMember[];

  @OneToMany(() => FamilySchedule, (familySchedule) => familySchedule.family)
  familySchedules: FamilySchedule[];
}
