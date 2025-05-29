import { Module } from '@nestjs/common';
import { EnderecosService } from './enderecos.service';
import { EnderecosController } from './enderecos.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Endereco } from './entities/endereco.entity';
import { EnderecoRepository } from './endereco.repository';

@Module({
  imports: [SequelizeModule.forFeature([Endereco])],
  controllers: [EnderecosController],
  providers: [EnderecosService, EnderecoRepository],
})
export class EnderecosModule {}
