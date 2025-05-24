import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Endereco } from './entities/endereco.entity';
import { EnderecoRepository } from './endereco.repository';
import { EnderecoController } from './endereco.controller';
import { EnderecoService } from './endereco.service';
import { ObrasModule } from '../obras/obras.module'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Endereco, EnderecoRepository]),
    forwardRef(() => ObrasModule),
  ],
  controllers: [EnderecoController],
  providers: [EnderecoRepository, EnderecoService],
  exports: [EnderecoRepository],
})
export class EnderecoModule {}