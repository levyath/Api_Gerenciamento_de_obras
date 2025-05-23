import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EquipamentosService } from './equipamentos.service';
import { EquipamentosController } from './equipamentos.controller';
import { EquipamentosRepository } from './equipamentos.repository';

import { Equipamentos } from './entities/equipamento.entity';
import { Obra } from '../obras/entities/obra.entity';
import { ObraEquipamento } from '../obra-equipamentos/entities/obra-equipamento.entity';

import { ObrasModule } from '../obras/obras.module';
import { FornecedoresModule } from '../fornecedores/fornecedores.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Equipamentos, Obra, ObraEquipamento]),
    ObrasModule,
    FornecedoresModule,
  ],
  controllers: [EquipamentosController],
  providers: [EquipamentosService, EquipamentosRepository],
  exports: [EquipamentosRepository],
})
export class EquipamentosModule {}