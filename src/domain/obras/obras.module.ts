import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { ObrasService } from './obras.service';
import { ObrasController } from './obras.controller';
import { ObrasRepository } from './obras.repository';

import { Obras } from './entities/obras.entity';
import { Endereco } from '../enderecos/entities/endereco.entity';
import { Fornecedores } from '../fornecedores/entities/fornecedores.entity';
import { ObrasFornecedores } from '../obra-fornecedor/entities/obras-fornecedores.entity';
import { Equipamentos } from '../equipamentos/entities/equipamento.entity';
import { ObrasEquipamentos } from '../obra-equipamento/entities/obras-equipamentos.entity';

import { FornecedoresModule } from '../fornecedores/fornecedores.module';
import { EquipamentosModule } from '../equipamentos/equipamentos.module';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Obras,
      Endereco,
      Fornecedores,
      ObrasFornecedores,
      Equipamentos,
      ObrasEquipamentos,
    ]),
    forwardRef(() => FornecedoresModule),
    forwardRef(() => EquipamentosModule),
  ],
  controllers: [ObrasController],
  providers: [ObrasService, ObrasRepository],
  exports: [ObrasRepository, ObrasService], 
})
export class ObrasModule {}