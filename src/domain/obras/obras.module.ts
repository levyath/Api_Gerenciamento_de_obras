import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Obra } from './entities/obra.entity';

import { FornecedoresRepository } from '../fornecedores/fornecedores.repository';
import { ObraFornecedor } from '../obra-fornecedor/entities/obra-fornecedor.entity';
import { Fornecedores } from '../fornecedores/entities/fornecedores.entity';

import { ObrasController } from './obras.controller';
import { ObrasService } from './obras.service';
import { ObrasRepository } from './obras.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Obra, Fornecedores, ObraFornecedor])], 
  controllers: [ObrasController],
  providers: [ObrasService, ObrasRepository, FornecedoresRepository], 
  exports: [ObrasRepository, FornecedoresRepository], 
})
export class ObrasModule {}