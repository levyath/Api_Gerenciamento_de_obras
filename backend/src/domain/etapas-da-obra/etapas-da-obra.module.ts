/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';

import { EtapasDaObraController } from './etapas-da-obra.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { EtapasDaObra } from './entities/etapas-da-obra.entity';
import { EtapasDaObraService } from './etapas-da-obra.service';
import { EtapasDaObraRepository } from './etapas-da-obra.repository';
import { Obras } from '../obras/entities/obras.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([
      EtapasDaObra,
       Obras
      ]),
      AuthModule
    ],
  controllers: [EtapasDaObraController],
  providers: [EtapasDaObraService, EtapasDaObraRepository],
})
export class EtapasDaObraModule {}
