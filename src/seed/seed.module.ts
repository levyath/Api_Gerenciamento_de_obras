import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { SeedService } from './seed.service';

import { Obras } from 'src/domain/obras/entities/obras.entity';
import { Fornecedores } from 'src/domain/fornecedores/entities/fornecedores.entity';
import { Equipamentos } from 'src/domain/equipamentos/entities/equipamento.entity';
import { Endereco } from 'src/domain/enderecos/entities/endereco.entity';
import { ObrasEquipamentos } from 'src/domain/obra-equipamento/entities/obras-equipamentos.entity';
import { ObrasFornecedores } from 'src/domain/obra-fornecedor/entities/obras-fornecedores.entity';
import { EtapasDaObra } from 'src/domain/etapas-da-obra/entities/etapas-da-obra.entity';
import { DiarioDeObra } from 'src/domain/diario-de-obra/entities/diario-de-obra.entity';
import { ResponsavelTecnico } from 'src/domain/responsaveis-tecnicos/entities/responsavel-tecnico.entity';
import { ObraResponsavelTecnico } from 'src/domain/obra-responsavel-tecnico/entities/obra-responsavel-tecnico.entity';
import { Fiscalizacoes } from 'src/domain/fiscalizacoes/entities/fiscalizacoes.entity';
import { ObrasFiscalizacoes } from 'src/domain/obra-fiscalizacoes/entities/obras-fiscalizacoes.entity';
import { Relatorios } from 'src/domain/relatorios/entities/relatorios.entity';
import { Material } from 'src/domain/materiais/entities/material.entity';
import { DiarioMaterial } from 'src/domain/diario-materiais/diario-material.entity';

@Module({
  imports: [
    ConfigModule,
    SequelizeModule.forFeature([
      Obras,
      Fornecedores,
      Equipamentos,
      Endereco,
      EtapasDaObra,
      DiarioDeObra,
      ResponsavelTecnico,
      Fiscalizacoes,
      Relatorios,
      Material,
      // Tabelas de Junção
      ObrasEquipamentos,
      ObrasFornecedores,
      ObraResponsavelTecnico,
      ObrasFiscalizacoes,
      DiarioMaterial
    ]),
  ],
  providers: [SeedService],
})
export class SeedModule {}