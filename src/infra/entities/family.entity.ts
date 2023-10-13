import { Column, Entity, OneToMany } from 'typeorm';
import { AlbumEntity } from './album.entity';
import { FamilymemberEntity } from './familymember.entity';
import { FamilyScheduleEntity } from './familySchedule.entity';

@Entity('family', { schema: 'family_app_db' })
export class FamilyEntity {
  @Column('int', { primary: true, name: 'ID' })
  id: number;

  @Column('int', { name: 'member_number', nullable: true })
  memberNumber: number | null;

  @Column('varchar', { name: 'family_name', nullable: true, length: 50 })
  familyName: string | null;

  @Column('date', { name: 'created_date', nullable: true })
  createdDate: string | null;

  @OneToMany(() => AlbumEntity, (album) => album.family)
  albums: AlbumEntity[];

  @OneToMany(() => FamilymemberEntity, (familyMember) => familyMember.family)
  familyMembers: FamilymemberEntity[];

  @OneToMany(() => FamilyScheduleEntity, (familySchedule) => familySchedule.family)
  familySchedules: FamilyScheduleEntity[];
}
