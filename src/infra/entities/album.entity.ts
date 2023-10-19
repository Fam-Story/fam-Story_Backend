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

  @Column('int', { name: 'Photo_Number', nullable: true })
  photoNumber: number | null;

  @Column('varchar', { name: 'Album_Name', nullable: true, length: 50 })
  albumName: string | null;

  @ManyToOne(() => Family, (family) => family.albums, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'Family_ID', referencedColumnName: 'id' }])
  family: Family;

  @OneToMany(() => Photo, (photo) => photo.album)
  photos: Photo[];
}
