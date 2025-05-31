import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FornecedoresService } from './fornecedores.service';
import { FornecedoresController } from './fornecedores.controller';
import { FornecedoresRepository } from './fornecedores.repository';
import { Fornecedores } from './entities/fornecedores.entity';
import { Obras } from '../obras/entities/obras.entity';
import { ObrasFornecedores } from '../obra-fornecedor/entities/obras-fornecedores.entity';
import { ObrasModule } from '../obras/obras.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Fornecedores, Obras, ObrasFornecedores]),
    forwardRef(() => ObrasModule),
  ],
  controllers: [FornecedoresController],
  providers: [FornecedoresService, FornecedoresRepository],
  exports: [FornecedoresRepository, FornecedoresService],
})
export class FornecedoresModule {}