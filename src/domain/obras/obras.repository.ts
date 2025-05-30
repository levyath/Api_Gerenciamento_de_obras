import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Obras } from './entities/obras.entity';



@Injectable()
export class ObrasRepository {
  constructor(
    @InjectModel(Obras)
    private readonly obrasModel: typeof Obras,
  ) {}

  async findAll(): Promise<Obras[]> {
    return this.obrasModel.findAll();
  }

  async findById(id: number): Promise<Obras | null> {
    return this.obrasModel.findByPk(id);
  }

  async create(data: Obras): Promise<Obras> {
    return this.obrasModel.create(data);
  }

  async update(id: number, data: Partial<Obras>): Promise<Obras | null> {
    const endereco = await this.obrasModel.findByPk(id);
    if (!endereco) return null;
    return endereco.update(data);
  }

  async delete(id: number): Promise<boolean> {
    const deletedCount = await this.obrasModel.destroy({ where: { id } });
    return deletedCount > 0;
  }
}