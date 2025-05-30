import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Fornecedores } from './entities/fornecedores.entity';


@Injectable()
export class FornecedoresRepository {
  constructor(
    @InjectModel(Fornecedores)
    private readonly fornecedoresModel: typeof Fornecedores,
  ) {}

  async findAll(): Promise<Fornecedores[]> {
    return this.fornecedoresModel.findAll();
  }

  async findById(id: number): Promise<Fornecedores | null> {
    return this.fornecedoresModel.findByPk(id);
  }

  async create(data: Fornecedores): Promise<Fornecedores> {
    return this.fornecedoresModel.create(data);
  }

  async update(id: number, data: Partial<Fornecedores>): Promise<Fornecedores | null> {
    const endereco = await this.fornecedoresModel.findByPk(id);
    if (!endereco) return null;
    return endereco.update(data);
  }

  async delete(id: number): Promise<boolean> {
    const deletedCount = await this.fornecedoresModel.destroy({ where: { id } });
    return deletedCount > 0;
  }
}