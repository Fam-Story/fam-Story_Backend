import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FamilyMember } from './family-member.entity';

@Entity('user', { schema: 'family_app_db' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ID' })
  id: number;

  @Column('varchar', { name: 'Email', unique: true, length: 50 })
  email: string;

  @Column('varchar', { name: 'PW', length: 25 })
  password: string;

  @Column('varchar', { name: 'Username', length: 50 })
  username: string;

  @Column('varchar', { name: 'Nickname', nullable: true, length: 50 })
  nickname: string | null;

  @Column('int', { name: 'Age' })
  age: number;

  @Column('int', { name: 'Gender' })
  gender: number;

  @OneToMany(() => FamilyMember, (familyMember) => familyMember.user)
  familyMembers: FamilyMember[];
}
