import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Album } from './album.entity';
import { FamilyMember } from './familymember.entity';
import { FamilySchedule } from './familySchedule.entity';

@Entity('family', { schema: 'family_app_db' })
export class Family {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column('int', { name: 'member_number', nullable: true })
  memberNumber: number | null;

  @Column('varchar', { name: 'family_name', nullable: true, length: 50 })
  familyName: string | null;

  @Column('date', { name: 'created_date', nullable: true })
  createdDate: string | null;

  @OneToMany(() => Album, (album) => album.family)
  albums: Album[];

  @OneToMany(() => FamilyMember, (familyMember) => familyMember.family)
  familyMembers: FamilyMember[];

  @OneToMany(() => FamilySchedule, (familySchedule) => familySchedule.family)
  familySchedules: FamilySchedule[];
}
