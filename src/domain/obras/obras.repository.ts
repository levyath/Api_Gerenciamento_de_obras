import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Obras } from './entities/obras.entity';
import { CreateObraDto } from './dto/create-obra.dto';
import { UpdateObraDto } from './dto/update-obra.dto';
import { Endereco } from '../enderecos/entities/endereco.entity';

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
    return this.obrasModel.findByPk(id, { include: [Endereco] });
  }

  async create(data: CreateObraDto): Promise<Obras> {
    return this.obrasModel.create(data as any);
  }

  async update(id: number, data: UpdateObraDto): Promise<Obras | null> {
    const obra = await this.obrasModel.findByPk(id);
    if (!obra) return null;
    return obra.update(data);
  }

  async delete(id: number): Promise<boolean> {
    const deletedCount = await this.obrasModel.destroy({ where: { id } });
    return deletedCount > 0;
  }
}
