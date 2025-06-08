import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DiarioDeObra } from './entities/diario-de-obra.entity';
import { CreateDiarioDeObraDto } from './dto/create-diario-de-obra.dto';
import { UpdateDiarioDeObraDto } from './dto/update-diario-de-obra.dto';
import { Obras } from '../obras/entities/obras.entity';

@Injectable()
export class DiarioDeObraRepository {
  constructor(
    @InjectModel(DiarioDeObra)
    private readonly diarioDeObraModel: typeof DiarioDeObra,

    @InjectModel(Obras)
    private readonly obraModel: typeof Obras,
  ) {}

  async create(data: CreateDiarioDeObraDto): Promise<DiarioDeObra> {
    return this.diarioDeObraModel.create(data as any);
  }

  async checkObraExists(obraId: number): Promise<boolean> {
    const count = await this.obraModel.count({ where: { id: obraId } });
    return count > 0;
  }

  async findAllByObra(obraId: number): Promise<DiarioDeObra[]> {
    return this.diarioDeObraModel.findAll({
      where: { obraId },
      order: [['data', 'ASC']],
      include: [
        {
          association: 'materiaisUtilizados',
          attributes: ['id', 'nome'],
          through: { attributes: [] },
        },
      ],
    });
  }

  async findById(id: number): Promise<DiarioDeObra | null> {
    return this.diarioDeObraModel.findByPk(id, {
      include: [
        {
          association: 'materiaisUtilizados',
          attributes: ['id', 'nome'],
          through: { attributes: [] },
        },
      ],
    });
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
