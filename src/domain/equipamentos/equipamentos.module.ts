import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { EquipamentosService } from './equipamentos.service';
import { EquipamentosController } from './equipamentos.controller';
import { EquipamentosRepository } from './equipamentos.repository';

import { Equipamentos } from './entities/equipamento.entity';
import { Obras } from '../obras/entities/obras.entity';
import { ObrasEquipamentos } from '../obra-equipamento/entities/obras-equipamentos.entity';
import { Fornecedores } from '../fornecedores/entities/fornecedores.entity';

import { FornecedoresModule } from '../fornecedores/fornecedores.module';
import { ObrasModule } from '../obras/obras.module'; // importa o módulo de obras

@Module({
  imports: [
    SequelizeModule.forFeature([
      Equipamentos,
      Obras,
      ObrasEquipamentos,
      Fornecedores,
    ]),
    forwardRef(() => FornecedoresModule),
    forwardRef(() => ObrasModule), // adiciona para evitar erro circular
  ],
  controllers: [EquipamentosController],
  providers: [EquipamentosService, EquipamentosRepository],
  exports: [EquipamentosRepository, EquipamentosService], // opcionalmente exporta service
})
export class EquipamentosModule {}