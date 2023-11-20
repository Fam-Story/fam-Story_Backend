import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';

export class MockJwtAuthGuard extends AuthGuard('jwt-service') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    request.user = { id: 1, username: 'testuser' }; // 테스트용 사용자 정보
    return true;
  }
}
