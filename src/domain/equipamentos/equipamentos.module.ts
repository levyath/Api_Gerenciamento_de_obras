import { Module } from '@nestjs/common';
import { EquipamentosService } from './equipamentos.service';
import { EquipamentosController } from './equipamentos.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Equipamentos } from './entities/equipamento.entity';
import { EquipamentosRepository } from './equipamentos.repository';
import { Obras } from '../obras/entities/obras.entity';
import { ObrasEquipamentos } from '../obra-equipamento/entities/obras-equipamentos.entity';
import { Fornecedores } from '../fornecedores/entities/fornecedores.entity';

@Module({
  imports: [SequelizeModule.forFeature([Equipamentos, Obras, ObrasEquipamentos, Fornecedores])],
  controllers: [EquipamentosController],
  providers: [EquipamentosService, EquipamentosRepository],
})
export class EquipamentosModule {}
