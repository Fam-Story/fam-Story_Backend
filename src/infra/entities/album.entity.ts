import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { FamilyEntity } from './family.entity';
import { PhotoEntity } from './photo.entity';

@Index('FK_family_TO_album_1', ['familyId'], {})
@Entity('album', { schema: 'family_app_db' })
export class AlbumEntity {
  @Column('int', { primary: true, name: 'ID' })
  id: number;

  @Column('int', { primary: true, name: 'family_ID' })
  familyId: number;

  @Column('int', { name: 'photo_number', nullable: true })
  photoNumber: number | null;

  @Column('varchar', { name: 'album_name', nullable: true, length: 50 })
  albumName: string | null;

  @ManyToOne(() => FamilyEntity, (family) => family.albums, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'family_ID', referencedColumnName: 'id' }])
  family: FamilyEntity;

  @OneToMany(() => PhotoEntity, (photo) => photo.album)
  photos: PhotoEntity[];
}
