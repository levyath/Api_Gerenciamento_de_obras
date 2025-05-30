import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize'; // Importa SequelizeModule

import 'dotenv/config'; 
import { EnderecosModule } from './domain/enderecos/enderecos.module';
import { EquipamentosModule } from './domain/equipamentos/equipamentos.module';
import { FornecedoresModule } from './domain/fornecedores/fornecedores.module';
import { ObrasModule } from './domain/obras/obras.module';
const {
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_USER,
  DB_PASSWORD,
} = process.env;

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: () => {
        // Validação básica para garantir que as variáveis de ambiente foram carregadas
        if (!DB_HOST || !DB_PORT || !DB_DATABASE || !DB_USER || !DB_PASSWORD) {
          throw new Error(
            'Variáveis de ambiente para conexão com o banco de dados não foram encontradas. Verifique seu arquivo .env.',
          );
        }

        const port = parseInt(DB_PORT as string, 10);
        if (isNaN(port)) {
          throw new Error(
            `DB_PORT inválido: "${DB_PORT}". Deve ser um número.`,
          );
        }

        console.log(`Conectando ao banco de dados: postgres://${DB_USER}@${DB_HOST}:${port}/${DB_DATABASE}`);

        return {
          dialect: 'postgres',
          host: DB_HOST,
          port: port, // DB_PORT é uma string, precisa ser convertida para número
          username: DB_USER,
          password: DB_PASSWORD,
          database: DB_DATABASE,
          autoLoadModels: true, // Tenta carregar modelos automaticamente (requer que sejam injetados em algum lugar ou listados em `models`)
          synchronize: true, // ATENÇÃO: true cria/altera tabelas. Ótimo para desenvolvimento, mas CUIDADO em produção. Use migrações para produção.
          logging: console.log, // Para ver as queries SQL geradas. Pode ser 'false' ou uma função customizada.
          // models: [], // Se autoLoadModels não funcionar ou você quiser ser explícito, liste seus modelos Sequelize aqui (ex: [ObraModel, FornecedorModel])
          dialectOptions: {
            // Opções específicas do dialeto, se necessário
            // Exemplo para PostgreSQL com SSL:
            // ssl: {
            //   require: true,
            //   rejectUnauthorized: false // Ajuste conforme a configuração do seu servidor SSL
            // }
          },
        };
      },
    }),
    EnderecosModule,
    EquipamentosModule,
    FornecedoresModule,
    ObrasModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}