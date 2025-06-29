// src/auth/services/remote-auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import { TokenValidator } from '../interfaces/token-validator.interface';
import { User } from '../interfaces/user.interface';

@Injectable()
export class RemoteAuthService implements TokenValidator {
  async validateToken(token: string): Promise<User> {
    try {
      const { data } = await axios.post<{ user: User }>(
        process.env.TOKEN_VALIDATOR_API_URL ?? '',
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      return data.user;
    } catch {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }
}
