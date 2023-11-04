import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('유저 생성 dto')
export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: '이메일' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '유저 이름' })
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '비밀번호' })
  password: string; //Hashed 비밀번호로 다시 재저장 해야됨

  @IsString()
  @ApiProperty({ description: '닉네임' })
  readonly nickname: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: '나이' })
  readonly age: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: '성별 (0: 남자, 1: 여자)' })
  readonly gender: number;
}
