// src/auth/interfaces/token-validator.interface.ts
import { User } from './user.interface';

export interface TokenValidator {
  validateToken(token: string): Promise<User>;
}
