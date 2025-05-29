import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Equipamentos } from './entities/equipamento.model';
import { ObraEquipamento } from '../obra-equipamentos/entities/obra-equipamento.model';
import { Obra } from '../obras/entities/obra.model';
import { Fornecedores } from '../fornecedores/entities/fornecedores.model';
import { CreateEquipamentoDto } from './dto/create-equipamento.dto';

@Injectable()
export class EquipamentosRepository {
  constructor(
    @InjectModel(Equipamentos)
    private readonly equipamentosModel: typeof Equipamentos,

    @InjectModel(ObraEquipamento)
    private readonly obraEquipamentoModel: typeof ObraEquipamento,
  ) {}

  async findAll(): Promise<Equipamentos[]> {
    return this.equipamentosModel.findAll();
  }

  async findOne(id: number): Promise<Equipamentos | null> {
    return this.equipamentosModel.findByPk(id, {
      include: [
        { model: Obra, as: 'obras' },
        { model: Fornecedores, as: 'fornecedor' },
      ],
    });
  }

  async create(
  equipamentoData: CreateEquipamentoDto & { obras?: number[] }
): Promise<Equipamentos | null> {
  const { obras, ...attrs } = equipamentoData;

  // Use apenas os campos diretamente relacionados ao modelo
  const createdEquipamento = await this.equipamentosModel.create(attrs as any);

  // Relacionamento com obras (apenas se obras for um array de IDs)
  if (obras && obras.length) {
    await createdEquipamento.$set('obras', obras);
  }

  return this.findOne(createdEquipamento.id);
}

  async update(id: number, equipamentoData: Partial<Equipamentos> & { obras?: Obra[] }): Promise<Equipamentos | null> {
    const { obras, ...equipamentoAttrs } = equipamentoData;

    await this.equipamentosModel.update(equipamentoAttrs, { where: { id } });
    const equipamento = await this.equipamentosModel.findByPk(id);
    if (!equipamento) return null;

    if (obras) {
      const obrasIds = obras.map((obra) => obra.id);
      await equipamento.$set('obras', obrasIds);
    }

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.equipamentosModel.destroy({ where: { id } });
  }

  async findOneByOptions(options: any): Promise<Equipamentos | null> {
    return this.equipamentosModel.findOne(options);
  }

  async findByObraId(obraId: number): Promise<Equipamentos[]> {
    return this.equipamentosModel.findAll({
      include: [
        {
          model: Obra,
          as: 'obras',
          where: { id: obraId },
          required: true,
        },
        {
          model: Fornecedores,
          as: 'fornecedor',
        },
      ],
    });
  }

  async updateObras(id: number, obras: Obra[]): Promise<Equipamentos | null> {
    const equipamento = await this.equipamentosModel.findByPk(id);
    if (!equipamento) return null;

    const obrasIds = obras.map((obra) => obra.id);
    await equipamento.$set('obras', obrasIds);

    return this.findOne(id);
  }

  async findEquipamentosEmUso(ids: number[]): Promise<Equipamentos[]> {
    return this.equipamentosModel.findAll({
      where: { id: ids },
      include: [
        {
          model: Obra,
          as: 'obras',
          required: true,
        },
      ],
    });
  }
}
