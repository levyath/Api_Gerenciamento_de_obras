import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObrasModule } from './domain/obras/obras.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const { DataSource } = require('typeorm');
        const dataSource = new DataSource({
          type: 'postgres',
          host: 'localhost',
          port: 15432,
          username: 'postgres',
          password: 'postgres',
          database: 'postgres',
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
