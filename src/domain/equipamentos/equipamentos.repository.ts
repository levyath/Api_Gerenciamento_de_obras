import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreateEquipamentoDto } from './dto/create-equipamento.dto';
import { Equipamentos } from './entities/equipamento.entity';
import { UpdateEquipamentoDto } from './dto/update-equipamento.dto';

@Injectable()
export class EquipamentosRepository {
  constructor(
    @InjectModel(Equipamentos)
    private readonly equipamentosModel: typeof Equipamentos,
  ) {}

  async findAll(): Promise<Equipamentos[]> {
    return this.equipamentosModel.findAll();
  }

  async findOne(id: number): Promise<Equipamentos | null> {
    return this.equipamentosModel.findByPk(id);
  }

  async create(data: CreateEquipamentoDto): Promise<Equipamentos> {
    return this.equipamentosModel.create(data as any);
  }

  async update(id: number, data: Partial<UpdateEquipamentoDto>): Promise<Equipamentos | null> {
    const equipamento = await this.equipamentosModel.findByPk(id);
    if (!equipamento) return null;

    await equipamento.update(data);
    return equipamento;
  }

  async delete(id: number): Promise<boolean> {
    const deleted = await this.equipamentosModel.destroy({ where: { id } });
    return deleted > 0;
  }
}
