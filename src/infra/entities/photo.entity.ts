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

  @Column('varchar', { name: 'S3_Image_URL', nullable: false, length: 100 })
  s3ImageUrl: string;

  @Column('varchar', { name: 'Name', nullable: false, length: 50 })
  name: string;

  @Column('date', { name: 'Created_Date', nullable: false })
  createdDate: string;

  @ManyToOne(() => Album, (album) => album.photos, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'Album_ID', referencedColumnName: 'id' }])
  album: Album;
}
