import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FamilyMember } from './family-member.entity';
import { FamilySchedule } from './family-schedule.entity';
import { Photo } from './photo.entity';
import {Post} from "./post.entity";

@Entity('family', { schema: 'family_app_db' })
export class Family {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ID' })
  id: number;

  @Column('int', { name: 'Member_Number' })
  memberNumber: number;

  @Column('varchar', { name: 'Family_Name', length: 50 })
  familyName: string;

  @Column('date', { name: 'Created_Date' })
  createdDate: Date;

  @Column('varchar', { name: 'Family_Code', length: 45 })
  keyCode: string;

  @OneToMany(() => FamilyMember, (familyMember) => familyMember.family)
  familyMembers: FamilyMember[];

  @OneToMany(() => FamilySchedule, (familySchedule) => familySchedule.family)
  familySchedules: FamilySchedule[];

  @OneToMany(() => Post, (post) => post.family)
  posts: Post[];

  static createFamily(familyName: string, keyCode: string): Family {
    const family = new Family();
    family.familyName = familyName;
    family.keyCode = keyCode;
    family.createdDate = new Date();
    family.memberNumber = 0;
    return family;
  }

  setId(id: number): void {
    this.id = id;
  }
}
