//모든 요청전에 실행되는 미들웨어
import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LocalServiceAuthGuard extends AuthGuard('local-service') {} //local-serivce라고 이름을 지었으므로, 이를 사용한다.
//그러면 validate()를 구현했으므로, 이런 것들이 실행이 된다.
