import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { EquipamentosService } from './equipamentos.service';
import { EquipamentosController } from './equipamentos.controller';


import { Obra } from '../obras/entities/obra.model';

import { ObrasModule } from '../obras/obras.module';
import { FornecedoresModule } from '../fornecedores/fornecedores.module';
import { Equipamentos } from './entities/equipamento.model';
import { ObraEquipamento } from '../obra-equipamentos/dto/obra-equipamento.dto';
import { EquipamentosRepository } from './equipamentos.repository';

@Module({
  imports: [
    SequelizeModule.forFeature([Equipamentos, Obra, ObraEquipamento]),
    forwardRef(() => ObrasModule),
    FornecedoresModule,
  ],
  controllers: [EquipamentosController],
  providers: [EquipamentosService, EquipamentosRepository],
  exports: [EquipamentosService],
})
export class EquipamentosModule {}
