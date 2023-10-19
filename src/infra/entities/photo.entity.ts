import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Album } from './album.entity';

@Entity('photo', { schema: 'family_app_db' })
export class Photo {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ID' })
  id: number;

  @Column('int', { name: 'Album_ID' })
  albumId: number;

  @Column('varchar', { name: 'S3_Image_URL', nullable: true, length: 100 })
  s3ImageUrl: string | null;

  @Column('varchar', { name: 'Name', nullable: true, length: 50 })
  name: string | null;

  @Column('date', { name: 'Created_Date', nullable: true })
  createdDate: string | null;

  @ManyToOne(() => Album, (album) => album.photos, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'Album_ID', referencedColumnName: 'id' }])
  album: Album;
}
