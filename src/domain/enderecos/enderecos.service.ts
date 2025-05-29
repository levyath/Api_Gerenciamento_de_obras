import { Injectable } from '@nestjs/common';
import { Endereco } from './entities/endereco.entity';
import { EnderecoRepository } from './endereco.repository';

@Injectable()
export class EnderecosService {
  constructor(private readonly enderecoRepo: EnderecoRepository) {}

  findAll(): Promise<Endereco[]> {
    return this.enderecoRepo.findAll();
  }

  findOne(id: number): Promise<Endereco | null> {
    return this.enderecoRepo.findById(id);
  }

  create(data: Endereco): Promise<Endereco> {
    return this.enderecoRepo.create(data);
  }

  update(id: number, data: Partial<Endereco>): Promise<Endereco | null> {
    return this.enderecoRepo.update(id, data);
  }

  remove(id: number): Promise<boolean> {
    return this.enderecoRepo.delete(id);
  }
}
