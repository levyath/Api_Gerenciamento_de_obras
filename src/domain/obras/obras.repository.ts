import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

import { Obra } from './entities/obra.model';
import { Fornecedores } from '../fornecedores/entities/fornecedores.model';
import { ObraFornecedor } from '../obra-fornecedor/entities/obra-fornecedor.model';
import { ObraEquipamento } from '../obra-equipamentos/entities/obra-equipamento.model';
import { Equipamentos } from '../equipamentos/entities/equipamento.model';

@Injectable()
export class ObrasRepository {
  constructor(
    @InjectModel(Obra)
    private readonly obraRepository: typeof Obra,

    @InjectModel(ObraFornecedor)
    private readonly obraFornecedor: typeof ObraFornecedor,

    @InjectModel(ObraEquipamento)
    private readonly obraEquipamento: typeof ObraEquipamento,

    @InjectModel(Equipamentos)
    private readonly Equipamento: typeof Equipamentos,
  ) {}

  async findAll(): Promise<Obra[]> {
    return this.obraRepository.findAll({ include: ['endereco'] });
  }

  async findOne(id: number): Promise<Obra | null> {
    return this.obraRepository.findOne({
      where: { id },
      include: ['endereco'],
    });
  }

  async create(obraInput: Obra): Promise<Obra | null> {
    const createdObra = await this.obraRepository.create(obraInput as any);

    if (obraInput.fornecedores?.length) {
      const obraFornecedorData = obraInput.fornecedores.map(
        (fornecedor: Fornecedores) => ({
          obra_id: createdObra.id,
          fornecedor_id: fornecedor.id,
        }),
      );
      await this.obraFornecedor.bulkCreate(obraFornecedorData);
    }

    return this.findOne(createdObra.id);
  }

  async update(id: number, obraInput: Partial<Obra>): Promise<Obra | null> {
    const { endereco, fornecedores, equipamentos, ...obraData } = obraInput;

    await this.obraRepository.update(obraData, { where: { id } });

    if (fornecedores) {
      await this.obraFornecedor.destroy({ where: { obra_id: id } });
      if (fornecedores.length > 0) {
        const obraFornecedor = fornecedores.map((fornecedor: Fornecedores) => ({
          obra_id: id,
          fornecedor_id: fornecedor.id,
        }));
        await this.obraFornecedor.bulkCreate(obraFornecedor);
      }
    }

    if (equipamentos) {
      await this.obraEquipamento.destroy({ where: { obraId: id } });
      if (equipamentos.length > 0) {
        const obraEquipamento = equipamentos.map((equipamento: Equipamentos) => ({
          obra_id: id,
          equipamento_id: equipamento.id,
        }));
        await this.obraEquipamento.bulkCreate(obraEquipamento as any[]);
      }
    }

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.obraRepository.destroy({ where: { id } });
  }

  async findByIds(obrasIds: number[]): Promise<Obra[]> {
    return this.obraRepository.findAll({
      where: { id: { [Op.in]: obrasIds } },
    });
  }
}
