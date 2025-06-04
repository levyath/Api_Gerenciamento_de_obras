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

    @InjectModel(Obras)
    private readonly obrasModel: typeof Obras,

    @InjectModel(Fornecedores)
    private readonly fornecedoresModel: typeof Fornecedores,
  ) {}

  async findAll(): Promise<Equipamentos[]> {
    return this.equipamentosModel.findAll({
      include: [
        {
          model: Obras,
          attributes: ['id'],
          through: { attributes: [] },
        },
      ],
    });
  }

  async findById(id: number): Promise<Equipamentos | null> {
    return this.equipamentosModel.findByPk(id, {
      include: [
        {
          model: this.obrasModel,
          through: { attributes: [] },
        },
        {
          model: this.fornecedoresModel,
        },
      ],
    });
  }

  async create(data: CreateEquipamentoDto): Promise<Equipamentos> {
    const { obrasId, ...equipamentoData } = data;

    const novoEquipamento = await this.equipamentosModel.create(equipamentoData as any);

    if (obrasId && obrasId.length > 0) {
      await novoEquipamento.$set('obras', obrasId);
    }

    const equipamento = await this.equipamentosModel.findByPk(novoEquipamento.id, {
      include: [{ model: Obras, through: { attributes: [] } }],
    });

    if (!equipamento) {
      throw new Error('Equipamento não encontrado após criação');
    }

    return equipamento;
  }

  async update(id: number, data: Partial<UpdateEquipamentoDto>): Promise<void> {
    const equipamento = await this.equipamentosModel.findByPk(id);

    if (!equipamento) {
      throw new Error('Equipamento não encontrado');
    }

    const { obrasId, ...equipamentoData } = data;

    await equipamento.update(equipamentoData as any);

    if (obrasId) {
      await equipamento.$set('obras', obrasId);
    }
  }

    async updateObras(equipamento: Equipamentos, obras: Obras[]): Promise<void> {
      await equipamento.$set('obras', obras);

      this.equipamentosModel.findByPk(equipamento.id, {
        include: ['obras'], 
      });
  }

  async remove(id: number): Promise<void> {
  const deletedCount = await this.equipamentosModel.destroy({ where: { id } });
  deletedCount > 0;
}

  async findByObraId(obraId: number): Promise<Equipamentos[]> {
    return this.equipamentosModel.findAll({
      include: [
        {
          model: Obras,
          as: 'obras',
          where: { id: obraId },
          attributes: [],  
          required: true,  
        },
        {
          model: Fornecedores,
          as: 'fornecedor',
        },
      ],
    });
  }

  async findOneByOptions(options: any): Promise<Equipamentos | null> {
    return this.equipamentosModel.findOne(options);
  }
}