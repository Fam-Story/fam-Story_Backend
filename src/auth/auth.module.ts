import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../infra/entities';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LocalServiceStrategy } from './strategies/local-service.strategy';
import { JwtServiceStrategy } from './strategies/jwt-service.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    //session 사용 비활성화
    PassportModule.register({ session: false }),
    //JWT 토큰 설정. 30분 완료되는 토큰을 반환하도록 설정
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        //팩토리 메소드를 통해 configService를 주입
        return {
          //configService를 통해 환경변수 (.env)에 등록된 JWT_SECRET 접근
          //nest.js에서는 환경변수에 접근하려면 configService를 통해서 .get()으로 받아야 한다.
          secret: configService.get('JWT_KEY'), //JwtModule에서 사용하는 secret, JWT_SECRET을 통해 JWT 암호화
          signOptions: { expiresIn: '6h' }, //6시간 뒤 만료
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalServiceStrategy, JwtServiceStrategy],
  exports: [AuthService],
})
export class AuthModule {}
