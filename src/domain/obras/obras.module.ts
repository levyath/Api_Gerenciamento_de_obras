import { Module } from '@nestjs/common';
import { ObrasService } from './obras.service';
import { ObrasController } from './obras.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Obras } from './entities/obras.entity';
import { ObrasRepository } from './obras.repository';
import { Endereco } from '../enderecos/entities/endereco.entity';
import { Fornecedores } from '../fornecedores/entities/fornecedores.entity';
import { ObrasFornecedores } from '../obra-fornecedor/entities/obras-fornecedores.entity';

@Module({
  imports: [SequelizeModule.forFeature([Obras, Endereco, Fornecedores, ObrasFornecedores])],
  controllers: [ObrasController],
  providers: [ObrasService, ObrasRepository],
})
export class ObrasModule {}
