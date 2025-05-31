import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreateEquipamentoDto } from './dto/create-equipamento.dto';
import { Equipamentos } from './entities/equipamento.entity';
import { UpdateEquipamentoDto } from './dto/update-equipamento.dto';

import { Obras } from '../obras/entities/obras.entity';
import { Fornecedores } from '../fornecedores/entities/fornecedores.entity';

@Injectable()
export class EquipamentosRepository {
  constructor(
    @InjectModel(Equipamentos)
    private readonly equipamentosModel: typeof Equipamentos,
  ) {}

  async findAll(): Promise<Equipamentos[]> {
    return this.equipamentosModel.findAll({
    include: [
      {
        association: 'obras',
        attributes: ['id'],
        through: { attributes: [] }, 
      },
    ],
  });
  }

  async findById(id: number): Promise<Equipamentos | null> {
    return this.equipamentosModel.findByPk(id, { include: [Obras, Fornecedores] });
  }

  async create(data: CreateEquipamentoDto): Promise<Equipamentos> {
  const { obrasId, ...equipamentoData } = data;
  const novoEquipamento = await this.equipamentosModel.create(equipamentoData as any);
  if (obrasId && obrasId.length > 0) {
    await novoEquipamento.$set('obrasId', obrasId);
  }
  const equipamento = await this.findById(novoEquipamento.id);
  if (!equipamento) {
    throw new Error('Equipamento not found after creation');
  }
  return equipamento;
}

  async update(id: number, data: Partial<UpdateEquipamentoDto>): Promise<Equipamentos | null> {
    const equipamento = await this.equipamentosModel.findByPk(id);
    if (!equipamento) return null;

    await equipamento.update(data as any);
    return equipamento;
  }

  async delete(id: number): Promise<boolean> {
    const deleted = await this.equipamentosModel.destroy({ where: { id } });
    return deleted > 0;
  }
}
