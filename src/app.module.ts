import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObrasModule } from './domain/obras/obras.module';
import { FornecedoresModule } from './domain/fornecedores/fornecedores.module';
import { EquipamentosModule } from './domain/equipamentos/equipamentos.module';
import { EnderecoModule } from './domain/enderecos/endereco.module';
import { FiscalizacoesModule } from './domain/fiscalizacoes/fiscalizacoes.module';
import 'dotenv/config'

const {
    DB_HOST,
    DB_PORT,
    DB_DATABASE,
    DB_USER,
    DB_PASSWORD,
}  = process.env;

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const { DataSource } = require('typeorm');
        const dataSource = new DataSource({
          type: 'postgres',
          host: DB_HOST,
          port: DB_PORT,
          username: DB_USER,
          password: DB_PASSWORD,
          database: DB_DATABASE,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
          logging: true,
        });

        await dataSource.initialize();
        // Verifica se a conexão foi estabelecida com sucesso
        if (!dataSource.isInitialized) {
          throw new Error('Falha ao conectar ao banco de dados');
        }
        // Exibe informações sobre a conexão
        return dataSource.options;
      },}),
      ObrasModule,
      FornecedoresModule,
      EquipamentosModule,
      EnderecoModule,
      FiscalizacoesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
