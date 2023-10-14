import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AlbumEntity } from './album.entity';
import { FamilyMemberEntity } from './familymember.entity';
import { FamilyScheduleEntity } from './familySchedule.entity';

@Entity('family', { schema: 'family_app_db' })
export class FamilyEntity {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column('int', { name: 'member_number', nullable: true })
  memberNumber: number | null;

  @Column('varchar', { name: 'family_name', nullable: true, length: 50 })
  familyName: string | null;

  @Column('date', { name: 'created_date', nullable: true })
  createdDate: string | null;

  @OneToMany(() => AlbumEntity, (album) => album.family)
  albums: AlbumEntity[];

  @OneToMany(() => FamilyMemberEntity, (familyMember) => familyMember.family)
  familyMembers: FamilyMemberEntity[];

  @OneToMany(
    () => FamilyScheduleEntity,
    (familySchedule) => familySchedule.family,
  )
  familySchedules: FamilyScheduleEntity[];
}
