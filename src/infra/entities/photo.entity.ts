import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AlbumEntity } from './album.entity';

@Entity('photo', { schema: 'family_app_db' })
export class PhotoEntity {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column('varchar', { name: 'S3_image_URL', nullable: true, length: 100 })
  s3ImageUrl: string | null;

  @Column('varchar', { name: 'photo_name', nullable: true, length: 50 })
  photoName: string | null;

  @Column('date', { name: 'created_date', nullable: true })
  createdDate: string | null;

  @ManyToOne(() => AlbumEntity, (album) => album.photos, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'album_ID', referencedColumnName: 'id' }])
  album: AlbumEntity;
}
