import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ResponsaveisTecnicosController } from './responsaveis-tecnicos.controller';
import { ResponsaveisTecnicosService } from './responsaveis-tecnicos.service';
import { ResponsaveisTecnicosRepository } from './responsaveis-tecnicos.repository';

import { ResponsavelTecnico } from './entities/responsavel-tecnico.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([
      ResponsavelTecnico,
    ])
  ],
  controllers: [ResponsaveisTecnicosController],
  providers: [
    ResponsaveisTecnicosService,
    ResponsaveisTecnicosRepository,
  ],
  exports: [ResponsaveisTecnicosService]
})
export class ResponsaveisTecnicosModule {}