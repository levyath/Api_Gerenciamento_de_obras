import { Module } from '@nestjs/common';
import { FornecedoresService } from './fornecedores.service';
import { FornecedoresController } from './fornecedores.controller';
import { FornecedoresRepository } from './fornecedores.repository';
import { Fornecedores } from './entities/fornecedores.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Fornecedores])],
  controllers: [FornecedoresController],
  providers: [FornecedoresService, FornecedoresRepository],
})
export class FornecedoresModule {}
