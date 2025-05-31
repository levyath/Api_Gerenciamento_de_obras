import { Module } from '@nestjs/common';
import { FornecedoresService } from './fornecedores.service';
import { FornecedoresController } from './fornecedores.controller';
import { FornecedoresRepository } from './fornecedores.repository';
import { Fornecedores } from './entities/fornecedores.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { Obras } from '../obras/entities/obras.entity';
import { ObrasFornecedores } from '../obra-fornecedor/entities/obras-fornecedores.entity';

@Module({
  imports: [SequelizeModule.forFeature([Fornecedores, Obras, ObrasFornecedores])],
  controllers: [FornecedoresController],
  providers: [FornecedoresService, FornecedoresRepository],
})
export class FornecedoresModule {}
