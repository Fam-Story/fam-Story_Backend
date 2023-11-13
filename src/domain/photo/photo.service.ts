import { Injectable } from '@nestjs/common';
import { CreatePhotoDto, ResponsePhotoDto, UpdatePhotoDto } from './dto';
import { Family, Photo } from '../../infra/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FamilyException } from '../../common/exception/family.exception';
import { ResponseCode } from '../../common';
import { PhotoException } from '../../common/exception/photo.exception';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PhotoService {
  s3: AWS.S3 = new AWS.S3();
  constructor(
    @InjectRepository(Photo) private photoRepository: Repository<Photo>,
    @InjectRepository(Family) private familyRepository: Repository<Family>,
    private configService: ConfigService,
  ) {
    AWS.config.update({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  //사진 생성 (S3 Image URL 저장)
  async createPhoto(createPhotoDto: CreatePhotoDto) {
    const family: Family = await this.validateFamily(createPhotoDto.familyId);
    const photo: Photo = Photo.createPhoto(
      createPhotoDto.s3imageUrl,
      createPhotoDto.name,
      family,
    );
    await this.photoRepository.save(photo);
  }

  //사진 삭제 (S3 Image URL 받은 후, S3 이미지 및 DB에서 삭제)
  async deletePhoto(photoId: number) {
    const photo = await this.validatePhoto(photoId);
    const deleteParams = {
      Bucket: this.configService.get('BUCKET_NAME'),
      Key: `${photo.name}`,
    };
    await this.s3.deleteObject(deleteParams).promise();
    await this.photoRepository.delete(photoId);
  }

  //사진 페이지 조회 (Pagination)
  async getPhotos(familyId: number, page: number, limit: number) {
    const family: Family = await this.validateFamily(familyId);
    const photos = await this.photoRepository.find({
      where: { family: family },
    });
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    return photos.slice(startIndex, endIndex);
  }

  //사진 상세 조회
  async getPhotoInfo(photoId: number): Promise<ResponsePhotoDto> {
    const photo: Photo = await this.validatePhoto(photoId);
    return ResponsePhotoDto.of(
      photo.id,
      photo.s3ImageUrl,
      photo.name,
      photo.createdDate,
    );
  }

  //사진 정보 수정 (이름)
  async updatePhotoInfo(updatePhotoDto: UpdatePhotoDto) {
    const photo: Photo = await this.validatePhoto(updatePhotoDto.photoId);
    photo.name = updatePhotoDto.name;
    await this.photoRepository.save(photo);
  }

  async validatePhoto(photoId: number): Promise<Photo> {
    const photo: Photo = await this.photoRepository.findOne({
      where: { id: photoId },
    });
    if (!photo) {
      throw new PhotoException(ResponseCode.PHOTO_NOT_FOUND);
    }
    return photo;
  }
  async validateFamily(familyId: number): Promise<Family> {
    const family: Family = await this.familyRepository.findOne({
      where: { id: familyId },
    });
    if (!family) {
      throw new FamilyException(ResponseCode.FAMILY_NOT_FOUND);
    }
    return family;
  }
}
