import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import 'dotenv/config';

import { AuthModule } from './domain/auth/auth.module';
import { EnderecosModule } from './domain/enderecos/enderecos.module';
import { EquipamentosModule } from './domain/equipamentos/equipamentos.module';
import { FornecedoresModule } from './domain/fornecedores/fornecedores.module';
import { ObrasModule } from './domain/obras/obras.module';
import { EtapasDaObraModule } from './domain/etapas-da-obra/etapas-da-obra.module';
import { ResponsaveisTecnicosModule } from './domain/responsaveis-tecnicos/responsaveis-tecnicos.module';
import { DiarioDeObraModule } from './domain/diario-de-obra/diario-de-obra.module';
import { MateriaisModule } from './domain/materiais/materiais.module';
import { SeedModule } from './seed/seed.module';

import { Obras } from './domain/obras/entities/obras.entity';
import { Fornecedores } from './domain/fornecedores/entities/fornecedores.entity';
import { Equipamentos } from './domain/equipamentos/entities/equipamento.entity';
import { Endereco } from './domain/enderecos/entities/endereco.entity';
import { ObrasEquipamentos } from './domain/obra-equipamento/entities/obras-equipamentos.entity';
import { ObrasFornecedores } from './domain/obra-fornecedor/entities/obras-fornecedores.entity';
import { EtapasDaObra } from './domain/etapas-da-obra/entities/etapas-da-obra.entity';
import { DiarioDeObra } from './domain/diario-de-obra/entities/diario-de-obra.entity';
import { Fiscalizacoes } from './domain/fiscalizacoes/entities/fiscalizacoes.entity';
import { ObrasFiscalizacoes } from './domain/obra-fiscalizacoes/entities/obras-fiscalizacoes.entity';
import { Relatorios } from './domain/relatorios/entities/relatorios.entity';
import { FiscalizacoesModule } from './domain/fiscalizacoes/fiscalizacoes.module';
import { RelatoriosModule } from './domain/relatorios/relatorios.module';
import { DiarioMaterial } from './domain/diario-materiais/diario-material.entity';

const { NODE_ENV, DB_HOST, DB_PORT, DB_DATABASE, DB_USER, DB_PASSWORD } = process.env;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      useFactory: () => {
        if (!DB_HOST || !DB_PORT || !DB_DATABASE || !DB_USER || !DB_PASSWORD) {
          throw new Error(
            'Variáveis de ambiente para conexão com o banco de dados não foram encontradas. Verifique seu arquivo .env.',
          );
        }

        const port = parseInt(DB_PORT as string, 10);
        if (isNaN(port)) {
          throw new Error(`DB_PORT inválido: "${DB_PORT}". Deve ser um número.`);
        }

        console.log(`Conectando ao banco de dados: postgres://${DB_USER}@${DB_HOST}:${port}/${DB_DATABASE}`);

        return {
          dialect: 'postgres',
          host: DB_HOST,
          port,
          username: DB_USER,
          password: DB_PASSWORD,
          database: DB_DATABASE,
          autoLoadModels: true,
          synchronize: true,
          logging: console.log,
          dialectOptions: {
            // Configurações adicionais, como SSL, se necessário
          },
        };
      },
    }),
    SequelizeModule.forFeature([
      Obras,
      Fornecedores,
      Equipamentos,
      Endereco,
      ObrasEquipamentos,
      ObrasFornecedores,
      EtapasDaObra,
      DiarioDeObra,
      Fiscalizacoes,
      ObrasFiscalizacoes,
      Relatorios,
      DiarioMaterial
    ]),
    AuthModule,
    EnderecosModule,
    EquipamentosModule,
    FornecedoresModule,
    ObrasModule,
    EtapasDaObraModule,
    ResponsaveisTecnicosModule,
    DiarioDeObraModule,
    MateriaisModule,
    SeedModule,
    FiscalizacoesModule,
    RelatoriosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}