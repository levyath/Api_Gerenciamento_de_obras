import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { ObrasService } from './obras.service';
import { ObrasController } from './obras.controller';
import { ObrasRepository } from './obras.repository';

import { Obras } from './entities/obras.entity';
import { Endereco } from '../enderecos/entities/endereco.entity';
import { Fornecedores } from '../fornecedores/entities/fornecedores.entity';
import { ObrasFornecedores } from '../obra-fornecedor/entities/obras-fornecedores.entity';
import { Equipamentos } from '../equipamentos/entities/equipamento.entity';
import { ObrasEquipamentos } from '../obra-equipamento/entities/obras-equipamentos.entity';

import { FornecedoresModule } from '../fornecedores/fornecedores.module';
import { EquipamentosModule } from '../equipamentos/equipamentos.module';
import { ResponsavelTecnico } from '../responsaveis-tecnicos/entities/responsavel-tecnico.entity';
import { ObraResponsavelTecnico } from '../obra-responsavel-tecnico/entities/obra-responsavel-tecnico.entity';
import { EnderecosModule } from '../enderecos/enderecos.module';
import { ObrasFiscalizacoes } from '../obra-fiscalizacoes/entities/obras-fiscalizacoes.entity';
import { Fiscalizacoes } from '../fiscalizacoes/entities/fiscalizacoes.entity';
import { Relatorios } from '../relatorios/entities/relatorios.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Obras,
      Endereco,
      Fornecedores,
      ObrasFornecedores,
      Equipamentos,
      ObrasEquipamentos,
      ResponsavelTecnico,
      ObraResponsavelTecnico,
      ObrasFiscalizacoes,
      Fiscalizacoes,
      Relatorios
    ]),
    AuthModule,
    forwardRef(() => FornecedoresModule),
    forwardRef(() => EquipamentosModule),
    forwardRef(() => EnderecosModule),
  ],
  controllers: [ObrasController],
  providers: [ObrasService, ObrasRepository],
  exports: [ObrasRepository, ObrasService], 
})
export class ObrasModule {}