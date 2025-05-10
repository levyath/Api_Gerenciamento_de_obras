import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // Mude para o banco escolhido
      host: 'localhost',
      port: 5432, // Troque para a porta correta do seu banco
      username: 'seu_usuario',
      password: 'sua_senha',
      database: 'seu_banco',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
