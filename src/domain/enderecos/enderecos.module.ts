import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { EnderecoRepository } from './endereco.repository';
import { Endereco } from './entities/endereco.entity';

import { Obras } from '../obras/entities/obras.entity';
import { ObrasModule } from '../obras/obras.module';

import {
  EnderecosGlobalController,
  ObrasEnderecosController,
} from './enderecos.controller';

import { EnderecosService } from './enderecos.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Endereco, Obras]),
    forwardRef(() => ObrasModule),
  ],
  controllers: [EnderecosGlobalController, ObrasEnderecosController],
  providers: [EnderecoRepository, EnderecosService],
  exports: [EnderecoRepository],
})
export class EnderecosModule {}