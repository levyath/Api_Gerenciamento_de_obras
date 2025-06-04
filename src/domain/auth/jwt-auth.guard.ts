// src/auth/jwt-auth.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { TokenValidator } from './interfaces/token-validator.interface';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject('TokenValidator') private readonly tokenService: TokenValidator,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token ausente ou mal formatado');
    }

    const token = authHeader.split(' ')[1];
    const user = await this.tokenService.validateToken(token);

    req['user'] = user;

    return true;
  }
}
