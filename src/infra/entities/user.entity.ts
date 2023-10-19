import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FamilyMember } from './family-member.entity';

@Entity('user', { schema: 'family_app_db' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ID' })
  id: number;

  @Column('varchar', { name: 'Email', nullable: true, length: 50 })
  email: string | null;

  @Column('varchar', { name: 'PW', nullable: true, length: 25 })
  pw: string | null;

  @Column('varchar', { name: 'Username', nullable: true, length: 50 })
  username: string | null;

  @Column('varchar', { name: 'Nickname', nullable: true, length: 50 })
  nickname: string | null;

  @Column('int', { name: 'Age', nullable: true })
  age: number | null;

  @Column('int', { name: 'Gender', nullable: true })
  gender: number | null;

  @OneToMany(() => FamilyMember, (familyMember) => familyMember.user)
  familyMembers: FamilyMember[];
}
