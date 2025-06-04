// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { RemoteAuthService } from './services/remote-auth.service';

@Module({
  providers: [
    {
      provide: 'TokenValidator',
      useClass: RemoteAuthService,
    },
  ],
  exports: ['TokenValidator'],
})
export class AuthModule {}
