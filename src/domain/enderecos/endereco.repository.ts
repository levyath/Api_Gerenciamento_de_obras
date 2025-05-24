import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { Endereco } from './entities/endereco.entity';
import { Obra } from '../obras/entities/obra.entity';

@Injectable()
export class EnderecoRepository {
  constructor(
    @InjectRepository(Endereco)
    private readonly enderecoRepository: Repository<Endereco>,
    @InjectRepository(Obra)
    private readonly obraRepository: Repository<Obra>,
  ) {}

  async create(obraId: number, endereco: Endereco): Promise<Endereco | null> {
  const createdEndereco = await this.enderecoRepository.save(endereco);

  await this.obraRepository.update(obraId, {
    endereco: { id: createdEndereco.id },
  });

  return this.findOne(createdEndereco.id);
  }

  async findOne(id: number): Promise<Endereco | null> {
  const obra = await this.obraRepository.findOne({
    where: { id },
    relations: ['endereco'],
  });

  return obra?.endereco ?? null;
}

  
  async findOneByOptions(options: FindOneOptions<Endereco>): Promise<Endereco | null> {
    return this.enderecoRepository.findOne(options);
  }

  async update(id: number, endereco: Partial<Endereco>): Promise<Endereco | null> {
  const obra = await this.obraRepository.findOne({ where: { id } });

  if (!obra || !obra.endereco) {
    return null;
  }

  await this.enderecoRepository.update(obra.endereco.id, endereco);
  return this.findOne(obra.endereco.id);
}

}