/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';

import { EtapasDaObraController } from './etapas-da-obra.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { EtapasDaObra } from './entities/etapas-da-obra.entity';
import { EtapasDaObraService } from './etapas-da-obra.service';
import { EtapasDaObraRepository } from './etapas-da-obra.repository';

@Module({
  imports: [SequelizeModule.forFeature([EtapasDaObra])],
  controllers: [EtapasDaObraController],
  providers: [EtapasDaObraService, EtapasDaObraRepository],
})
export class EtapasDaObraModule {}
