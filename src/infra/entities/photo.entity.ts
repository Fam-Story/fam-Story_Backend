import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Family } from './family.entity';

@Entity('photo', { schema: 'family_app_db' })
export class Photo {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ID' })
  id: number;

  @Column('varchar', { name: 'S3_Image_URL', length: 100 })
  s3ImageUrl: string;

  @Column('varchar', { name: 'Name', length: 50 })
  name: string;

  @Column('date', { name: 'Created_Date' })
  createdDate: Date;

  @ManyToOne(() => Family, (family) => family.photos, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'family_ID', referencedColumnName: 'id' }])
  family: Family;

  static createPhoto(s3ImageUrl: string, name: string, family: Family): Photo {
    const photo = new Photo();
    photo.s3ImageUrl = s3ImageUrl;
    photo.name = name;
    photo.createdDate = new Date();
    photo.family = family;
    return photo;
  }

  setId(id: number): void {
    this.id = id;
  }
}
