import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Obra } from './entities/obra.entity';
import { ObrasController } from './obras.controller';
import { ObrasService } from './obras.service';
import { ObrasRepository } from './obras.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Obra])],
  controllers: [ObrasController],
  providers: [ObrasService, ObrasRepository], 
  exports: [ObrasRepository], 
})
export class ObrasModule {}