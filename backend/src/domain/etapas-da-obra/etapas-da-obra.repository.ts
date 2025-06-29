import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EtapasDaObra } from './entities/etapas-da-obra.entity';
import { CreateEtapasDaObraDto } from './dto/create-etapas-da-obra.dto';
import { UpdateEtapasDaObraDto } from './dto/update-etapas-da-obra.dto';
import { Obras } from '../obras/entities/obras.entity';

@Injectable()
export class EtapasDaObraRepository {
  constructor(
    @InjectModel(EtapasDaObra)
    private readonly etapaObraModel: typeof EtapasDaObra,

    @InjectModel(Obras)
      private readonly obraModel: typeof Obras,
  ) {}

  async create(data: CreateEtapasDaObraDto): Promise<EtapasDaObra> {
    return this.etapaObraModel.create(data as any);
  }

    async checkObraExists(obraId: number): Promise<boolean> {
    const count = await this.obraModel.count({ where: { id: obraId } });
    return count > 0;
  }

  async findAllByObra(obraId: number): Promise<EtapasDaObra[]> {
    return this.etapaObraModel.findAll({
      where: { obraId },
      order: [['dataInicioPrevista', 'ASC']],
    });
  }

  async findById(id: number): Promise<EtapasDaObra | null> {
    return this.etapaObraModel.findByPk(id);
  }

  async update(
    id: number,
    data: UpdateEtapasDaObraDto,
  ): Promise<[number, EtapasDaObra[]]> {
    return this.etapaObraModel.update(data as any, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number): Promise<number> {
    return this.etapaObraModel.destroy({ where: { id } });
  }
}
