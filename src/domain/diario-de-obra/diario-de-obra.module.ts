import { Module } from '@nestjs/common';
import { DiarioDeObraService } from './diario-de-obra.service';
import { DiarioDeObraController } from './diario-de-obra.controller';
import { DiarioDeObraRepository } from './diario-de-obra.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { DiarioDeObra } from './entities/diario-de-obra.entity';
import { Obras } from '../obras/entities/obras.entity';

@Module({
  imports: [SequelizeModule.forFeature([DiarioDeObra, Obras])],
  controllers: [DiarioDeObraController],
  providers: [DiarioDeObraService, DiarioDeObraRepository],
})
export class DiarioDeObraModule {}
