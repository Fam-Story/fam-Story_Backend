import { Controller } from '@nestjs/common';
import { PhotoService } from '../photo';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  //사진 업로드

  //사진 삭제

  //사진 수정

  //사진 리스트 반환 (pagination 적용)
}
