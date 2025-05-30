import { Module } from '@nestjs/common';
import { ObrasService } from './obras.service';
import { ObrasController } from './obras.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Obras } from './entities/obras.entity';
import { ObrasRepository } from './obras.repository';

@Module({
  imports: [SequelizeModule.forFeature([Obras])],
  controllers: [ObrasController],
  providers: [ObrasService, ObrasRepository],
})
export class ObrasModule {}
