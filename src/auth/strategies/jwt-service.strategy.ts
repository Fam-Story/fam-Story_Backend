import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt'; //자동 완성 주의!!!!!!!!!!!!!!!!!!!!!
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtServiceStrategy extends PassportStrategy(
  Strategy,
  'jwt-service',
) {
  constructor(private readonly configService: ConfigService) {
    super({
      secretOrKey: configService.get('JWT_KEY'), //환경 변수 주의!!!!!!!!!!!!!!!!!!!!!!!
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: any) {
    return {
      id: payload.id,
      email: payload.email,
      username: payload.username,
    };
  }
}
