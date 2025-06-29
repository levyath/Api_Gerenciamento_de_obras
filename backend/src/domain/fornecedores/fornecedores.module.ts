import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { FornecedoresService } from './fornecedores.service';
import { FornecedoresController, ObrasController } from './fornecedores.controller'; 
import { FornecedoresRepository } from './fornecedores.repository';

import { Fornecedores } from './entities/fornecedores.entity';
import { Obras } from '../obras/entities/obras.entity';
import { ObrasFornecedores } from '../obra-fornecedor/entities/obras-fornecedores.entity';
import { Equipamentos } from '../equipamentos/entities/equipamento.entity';

import { ObrasModule } from '../obras/obras.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Fornecedores,
      Obras,
      ObrasFornecedores,
      Equipamentos
    ]),
    AuthModule, 
    forwardRef(() => ObrasModule),
  ],
  controllers: [
    FornecedoresController,
    ObrasController, 
  ],
  providers: [FornecedoresService, FornecedoresRepository],
  exports: [FornecedoresRepository, FornecedoresService],
})
export class FornecedoresModule {}