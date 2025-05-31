import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FiscalizacoesService } from './fiscalizacoes.service';
import { FiscalizacoesController } from './fiscalizacoes.controller';
import { FiscalizacoesRepository } from './fiscalizacoes.repository';
import { Obra } from '../obras/entities/obra.entity';
import { Fiscalizacoes } from './entities/fiscalizacoes.entity';
import { ObrasModule } from '../obras/obras.module';
//import { RelatorioModule } from '../relatorio/relatorio.module'; to-do
//import { ResponsavelTecnicoModule } from '../responsaveis-tecnicos/responsaveis-tecnicos.module'; pendente Levy

@Module({
  imports: [
    SequelizeModule.forFeature([Obra, Fiscalizacoes]),
    ObrasModule,
    //RelatorioModule,
    //ResponsavelTecnicoModule,
  ],
  controllers: [FiscalizacoesController],
  providers: [FiscalizacoesService, FiscalizacoesRepository],
  exports: [FiscalizacoesRepository],
})
export class FiscalizacoesModule {}