import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Obra } from './entities/obra.model';
import { ObrasController } from './obras.controller';
import { ObrasService } from './obras.service';

import { Fornecedores } from '../fornecedores/entities/fornecedores.model';
import { ObraFornecedor } from '../obra-fornecedor/entities/obra-fornecedor.model';

import { Endereco } from '../enderecos/entities/endereco.model';
import { EnderecoModule } from '../enderecos/endereco.module';
import { Equipamentos } from '../equipamentos/entities/equipamento.model';
import { ObraEquipamento } from '../obra-equipamentos/entities/obra-equipamento.model';
import { ObrasRepository } from './obras.repository';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Obra,
      Fornecedores,
      ObraFornecedor,
      Equipamentos,
      ObraEquipamento,
      Endereco,
    ]),
    forwardRef(() => EnderecoModule),
  ],
  controllers: [ObrasController],
  providers: [ObrasService, ObrasRepository],
  exports: [ObrasService],
})
export class ObrasModule {}
