import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('유저 생성 dto')
export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: '이메일',
    example: 'example@naver.com',
    nullable: false,
  })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '유저 이름', example: '홍길동', nullable: false })
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '비밀번호 (DB에는 암호화 한 해시값이 저장된다.)',
    example: '1234',
    nullable: false,
  })
  password: string; //Hashed 비밀번호로 다시 재저장 해야됨

  @IsString()
  @ApiProperty({ description: '닉네임', example: '푸앙이', nullable: true })
  readonly nickname: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: '나이', example: 20, nullable: false })
  readonly age: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: '성별 (0: 남자, 1: 여자)',
    example: 0,
    nullable: false,
  })
  readonly gender: number;
}
