import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { AlbumEntity } from './album.entity';

@Index('FK_album_TO_photo_1', ['albumId'], {})
@Entity('photo', { schema: 'family_app_db' })
export class PhotoEntity {
  @Column('int', { primary: true, name: 'ID' })
  id: number;

  @Column('int', { primary: true, name: 'album_ID' })
  albumId: number;

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
