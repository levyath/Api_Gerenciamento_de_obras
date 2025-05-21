import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fornecedores } from './entities/fornecedores.entity';

import { ObrasRepository } from '../obras/obras.repository';
import { Obra } from '../obras/entities/obra.entity';
import { ObraFornecedor } from '../obra-fornecedor/entities/obra-fornecedor.entity';

import { FornecedoresService } from './fornecedores.service';
import { FornecedoresController } from './fornecedores.controller';
import { FornecedoresRepository } from './fornecedores.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Fornecedores, Obra, ObraFornecedor])],
  controllers: [FornecedoresController],
  providers: [FornecedoresService, FornecedoresRepository, ObrasRepository],
  exports: [FornecedoresRepository, ObrasRepository],
})
export class FornecedoresModule {}
