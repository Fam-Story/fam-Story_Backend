import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FamilyEntity } from './family.entity';
import { PhotoEntity } from './photo.entity';

@Entity('album', { schema: 'family_app_db' })
export class AlbumEntity {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column('int', { name: 'photo_number', nullable: true })
  photoNumber: number | null;

  @Column('varchar', { name: 'album_name', nullable: true, length: 50 })
  albumName: string | null;

  @ManyToOne(() => FamilyEntity, (family) => family.albums, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'family_ID', referencedColumnName: 'id' })
  family: FamilyEntity;

  @OneToMany(() => PhotoEntity, (photo) => photo.album)
  photos: PhotoEntity[];
}
