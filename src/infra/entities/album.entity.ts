import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Family } from './family.entity';
import { Photo } from './photo.entity';

@Entity('album', { schema: 'family_app_db' })
export class Album {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column('int', { name: 'photo_number', nullable: true })
  photoNumber: number | null;

  @Column('varchar', { name: 'album_name', nullable: true, length: 50 })
  albumName: string | null;

  @ManyToOne(() => Family, (family) => family.albums, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'family_ID', referencedColumnName: 'id' })
  family: Family;

  @OneToMany(() => Photo, (photo) => photo.album)
  photos: Photo[];
}
