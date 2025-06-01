import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DiarioDeObra } from './entities/diario-de-obra.entity';
import { CreateDiarioDeObraDto } from './dto/create-diario-de-obra.dto';
import { UpdateDiarioDeObraDto } from './dto/update-diario-de-obra.dto';

@Injectable()
export class DiarioDeObraRepository {
  constructor(
    @InjectModel(DiarioDeObra)
    private readonly diarioDeObraModel: typeof DiarioDeObra,
  ) {}

  async create(data: CreateDiarioDeObraDto): Promise<DiarioDeObra> {
    return this.diarioDeObraModel.create(data as any);
  }

  async findAllByObra(obraId: number): Promise<DiarioDeObra[]> {
    return this.diarioDeObraModel.findAll({
      where: { obraId },
      order: [['data', 'ASC']],
    });
  }

  async findById(id: number): Promise<DiarioDeObra | null> {
    return this.diarioDeObraModel.findByPk(id);
  }

  async update(
    id: number,
    data: UpdateDiarioDeObraDto,
  ): Promise<[number, DiarioDeObra[]]> {
    return this.diarioDeObraModel.update(data as any, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number): Promise<number> {
    return this.diarioDeObraModel.destroy({ where: { id } });
  }
}
