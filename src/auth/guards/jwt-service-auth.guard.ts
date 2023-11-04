import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtServiceAuthGuard extends AuthGuard('jwt-service') {}
