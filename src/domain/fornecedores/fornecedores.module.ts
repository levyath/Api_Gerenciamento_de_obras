import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Fornecedores } from './entities/fornecedores.entity';
import { Obra } from '../obras/entities/obra.entity';
import { ObraFornecedor } from '../obra-fornecedor/entities/obra-fornecedor.entity';

import { ObrasModule } from '../obras/obras.module'; 

import { FornecedoresService } from './fornecedores.service';
import { FornecedoresController } from './fornecedores.controller';
import { FornecedoresRepository } from './fornecedores.repository';
import { ObrasRepository } from '../obras/obras.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Fornecedores, Obra, ObraFornecedor]),
    ObrasModule, 
  ],
  controllers: [FornecedoresController],
  providers: [FornecedoresService, FornecedoresRepository, ObrasRepository],
  exports: [FornecedoresRepository, ObrasRepository],
})
export class FornecedoresModule {}