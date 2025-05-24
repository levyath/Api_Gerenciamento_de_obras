import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Obra } from './entities/obra.entity';
import { ObrasController } from './obras.controller';
import { ObrasService } from './obras.service';
import { ObrasRepository } from './obras.repository';

import { Fornecedores } from '../fornecedores/entities/fornecedores.entity';
import { ObraFornecedor } from '../obra-fornecedor/entities/obra-fornecedor.entity';
import { FornecedoresRepository } from '../fornecedores/fornecedores.repository';

import { Equipamentos } from '../equipamentos/entities/equipamento.entity';
import { ObraEquipamento } from '../obra-equipamentos/entities/obra-equipamento.entity';
import { EquipamentosRepository } from '../equipamentos/equipamentos.repository';

import { Endereco } from '../enderecos/entities/endereco.entity';
import { EnderecoModule } from '../enderecos/endereco.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
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
  providers: [
    ObrasService,
    ObrasRepository,
    FornecedoresRepository,
    EquipamentosRepository,
  ],
  exports: [
    ObrasRepository,
    FornecedoresRepository,
    EquipamentosRepository,
    TypeOrmModule
  ],
})
export class ObrasModule {}