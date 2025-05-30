import { Injectable } from '@nestjs/common';
import { FornecedoresRepository } from './fornecedores.repository';
import { Fornecedores } from './entities/fornecedores.entity';


@Injectable()
export class FornecedoresService {
  constructor(private readonly fornecedoresRepo: FornecedoresRepository) {}

  findAll(): Promise<Fornecedores[]> {
    return this.fornecedoresRepo.findAll();
  }

  findOne(id: number): Promise<Fornecedores | null> {
    return this.fornecedoresRepo.findById(id);
  }

  create(data: Fornecedores): Promise<Fornecedores> {
    return this.fornecedoresRepo.create(data);
  }

  update(id: number, data: Partial<Fornecedores>): Promise<Fornecedores | null> {
    return this.fornecedoresRepo.update(id, data);
  }

  remove(id: number): Promise<boolean> {
    return this.fornecedoresRepo.delete(id);
  }
}
