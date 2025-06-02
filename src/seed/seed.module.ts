import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config'; // Importa ConfigModule
import { SeedService } from './seed.service';

import { Obras } from 'src/domain/obras/entities/obras.entity';
import { Fornecedores } from 'src/domain/fornecedores/entities/fornecedores.entity';
import { Equipamentos } from 'src/domain/equipamentos/entities/equipamento.entity';
import { Endereco } from 'src/domain/enderecos/entities/endereco.entity';
import { ObrasEquipamentos } from 'src/domain/obra-equipamento/entities/obras-equipamentos.entity';
import { ObrasFornecedores } from 'src/domain/obra-fornecedor/entities/obras-fornecedores.entity';
import { EtapasDaObra } from 'src/domain/etapas-da-obra/entities/etapas-da-obra.entity';
import { DiarioDeObra } from 'src/domain/diario-de-obra/entities/diario-de-obra.entity';

@Module({
  imports: [
    ConfigModule, // <-- adiciona aqui
    SequelizeModule.forFeature([
      Obras,
      Fornecedores,
      Equipamentos,
      Endereco,
      ObrasEquipamentos,
      ObrasFornecedores,
      EtapasDaObra,
      DiarioDeObra,
    ]),
  ],
  providers: [SeedService],
})
export class SeedModule {}