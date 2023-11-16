import { ApiProperty, ApiTags, PickType } from '@nestjs/swagger';
import { User } from '../../../../infra/entities';

export class LoginUserDto extends PickType(User, ['email', 'password']) {
  @ApiProperty({
    example: 'user@example.com',
    description: '이메일',
    nullable: false,
  })
  email: string;

  @ApiProperty({
    example: 'password',
    description: '비밀번호',
    nullable: false,
  })
  password: string;
} //User의 객체 중 이메일, 패스워드 가져오기
