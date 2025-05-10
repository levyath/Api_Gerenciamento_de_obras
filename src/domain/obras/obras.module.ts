import { Module } from '@nestjs/common';
import { ObrasService } from './obras.service';
import { ObrasController } from './obras.controller';

@Module({
  controllers: [ObrasController],
  providers: [ObrasService],
})
export class ObrasModule {}
