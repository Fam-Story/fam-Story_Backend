import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Family } from './family.entity';
import { Photo } from './photo.entity';

@Entity('album', { schema: 'family_app_db' })
export class Album {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ID' })
  id: number;

  @Column('int', { name: 'Family_ID' })
  familyId: number;

  @Column('int', { name: 'Photo_Number', nullable: false })
  photoNumber: number;

  @Column('varchar', { name: 'Album_Name', nullable: false, length: 50 })
  albumName: string;

  @ManyToOne(() => Family, (family) => family.albums, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'Family_ID', referencedColumnName: 'id' }])
  family: Family;

  @OneToMany(() => Photo, (photo) => photo.album)
  photos: Photo[];
}
