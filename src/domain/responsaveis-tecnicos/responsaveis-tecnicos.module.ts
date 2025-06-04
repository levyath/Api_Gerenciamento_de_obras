import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ResponsaveisTecnicosController } from './responsaveis-tecnicos.controller';
import { ResponsaveisTecnicosService } from './responsaveis-tecnicos.service';
import { ResponsaveisTecnicosRepository } from './responsaveis-tecnicos.repository';

import { ResponsavelTecnico } from './entities/responsavel-tecnico.entity';
import { ObraResponsavelTecnico } from '../obra-responsavel-tecnico/entities/obra-responsavel-tecnico.entity';
import { ObraResponsavelTecnicoRepository } from '../obra-responsavel-tecnico/obra-responsavel-tecnico.repository';

import { DocumentValidatorService } from '../shared/document-validator.service';

import { ObrasModule } from '../obras/obras.module'; // <- aqui
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([
      ResponsavelTecnico,
      ObraResponsavelTecnico,
    ]),
    AuthModule,
    forwardRef(() => ObrasModule), // <- adicionado corretamente
  ],
  controllers: [ResponsaveisTecnicosController],
  providers: [
    ResponsaveisTecnicosService,
    ResponsaveisTecnicosRepository,
    ObraResponsavelTecnicoRepository,
    DocumentValidatorService
  ],
  exports: [ResponsaveisTecnicosService]
})
export class ResponsaveisTecnicosModule {}
