import { Module } from '@nestjs/common';
import { EnderecosService } from './enderecos.service';
import { EnderecosController } from './enderecos.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Endereco } from './entities/endereco.entity';
import { EnderecoRepository } from './endereco.repository';
import { Obras } from '../obras/entities/obras.entity';

@Module({
  imports: [SequelizeModule.forFeature([Endereco, Obras])],
  controllers: [EnderecosController],
  providers: [EnderecosService, EnderecoRepository],
})
export class EnderecosModule {}
