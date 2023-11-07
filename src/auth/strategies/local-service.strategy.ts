import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserException } from '../../common/exception/user.exception';
import { ResponseCode } from '../../common';

@Injectable()
export class LocalServiceStrategy extends PassportStrategy(
  Strategy, //passport-local에서 Strategy를 가져왔으므로, 인증 전략은 local 전략을 사용한다.
  'local-service', //아래에서 구현한 인증 기능들(validate 등)을 LocalServiceStrategy 클래스에 담고, 이를 'local-service'라고 이름 짓는다.
) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email', //여기서는 email을 아이디
      passwordField: 'password', //비번을 password로 한다. JSON에서 email, password를 찾아서 인증을 진행한다.
    }); //passport-local의 Strategy 객체를 사용하므로, 부모 객체의 usernameField, passwordField를 설정해준다.
  }
  async validate(email: string, password: string): Promise<any> {
    //validate로 함수명을 정해야 함
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UserException(ResponseCode.USER_LOGIN_FAIL);
    }
    return user;
  }
}
