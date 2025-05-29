import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Fornecedores } from './entities/fornecedores.model';
import { Obra } from '../obras/entities/obra.model';
import { ObraFornecedor } from '../obra-fornecedor/entities/obra-fornecedor.model';

import { ObrasModule } from '../obras/obras.module';

import { FornecedoresService } from './fornecedores.service';
import { FornecedoresController } from './fornecedores.controller';
import { FornecedoresRepository } from './fornecedores.repository';

@Module({
  imports: [
    SequelizeModule.forFeature([Fornecedores, Obra, ObraFornecedor]),
    forwardRef(() => ObrasModule),
  ],
  controllers: [FornecedoresController],
  providers: [FornecedoresService, FornecedoresRepository],
  exports: [FornecedoresService, FornecedoresRepository],
})
export class FornecedoresModule {}
