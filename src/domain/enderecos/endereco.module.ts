import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Endereco } from './entities/endereco.model';
import { EnderecoService } from './endereco.service';
import { EnderecoController } from './endereco.controller';
import { ObrasModule } from '../obras/obras.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Endereco]),
    forwardRef(() => ObrasModule),
  ],
  controllers: [EnderecoController],
  providers: [EnderecoService],
  exports: [EnderecoService],
})
export class EnderecoModule {}
