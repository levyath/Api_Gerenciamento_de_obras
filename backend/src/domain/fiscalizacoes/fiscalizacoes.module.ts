import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FiscalizacoesService } from './fiscalizacoes.service';
import { FiscalizacoesController } from './fiscalizacoes.controller';
import { FiscalizacoesRepository } from './fiscalizacoes.repository';
import { Obras } from '../obras/entities/obras.entity';
import { Fiscalizacoes } from './entities/fiscalizacoes.entity';
import { ObrasModule } from '../obras/obras.module';
import { Relatorios } from '../relatorios/entities/relatorios.entity';
import { RelatoriosModule } from '../relatorios/relatorios.module';
import { ResponsaveisTecnicosModule } from '../responsaveis-tecnicos/responsaveis-tecnicos.module';
import { ObrasFiscalizacoes } from '../obra-fiscalizacoes/entities/obras-fiscalizacoes.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Obras,
      ObrasFiscalizacoes,
      Fiscalizacoes,
      Relatorios
    ]),
    AuthModule,
    ObrasModule,
    RelatoriosModule,
    ResponsaveisTecnicosModule,
  ],
  controllers: [FiscalizacoesController],
  providers: [FiscalizacoesService, FiscalizacoesRepository],
  exports: [FiscalizacoesService, FiscalizacoesRepository],
})
export class FiscalizacoesModule {}