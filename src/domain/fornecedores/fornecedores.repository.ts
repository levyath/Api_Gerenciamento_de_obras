import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Fornecedores } from './entities/fornecedores.model';
import { ObraFornecedor } from '../obra-fornecedor/entities/obra-fornecedor.model';
import { Obra } from '../obras/entities/obra.model';
import { Equipamentos } from '../equipamentos/entities/equipamento.model';
import { Sequelize } from 'sequelize-typescript';
import { CreateFornecedorDto } from './dto/create-fornecedores.dto';

@Injectable()
export class FornecedoresRepository {
  constructor(
    @InjectModel(Fornecedores)
    private readonly fornecedoresModel: typeof Fornecedores,

    @InjectModel(Equipamentos)
    private readonly equipamentosModel: typeof Equipamentos,

    @InjectModel(ObraFornecedor)
    private readonly obraFornecedorModel: typeof ObraFornecedor,

    private readonly sequelize: Sequelize,
  ) {}

  async findAll(): Promise<Fornecedores[]> {
    return this.fornecedoresModel.findAll();
  }

  async findOne(id: number): Promise<Fornecedores | null> {
    return this.fornecedoresModel.findByPk(id, {
      include: [
        { model: Obra, as: 'obras' },
      ],
    });
  }

async create(fornecedorData: CreateFornecedorDto): Promise<Fornecedores | null> {
  const { obras, ...attrs } = fornecedorData;

  const createdFornecedor = await this.fornecedoresModel.create(attrs as any);

  if (obras && obras.length) {
    const obrasIds = obras.map((obra) => obra.id);
    await createdFornecedor.$set('obras', obrasIds);
  }

  return this.findOne(createdFornecedor.id);
}



  async update(id: number, fornecedorInput: Partial<Fornecedores> & { obras?: Obra[] }): Promise<Fornecedores | null> {
    const { obras, ...fornecedorAttrs } = fornecedorInput;

    await this.fornecedoresModel.update(fornecedorAttrs, { where: { id } });
    const fornecedor = await this.fornecedoresModel.findByPk(id);
    if (!fornecedor) return null;

    if (obras) {
      const obrasIds = obras.map((obra) => obra.id);
      await fornecedor.$set('obras', obrasIds);
    }

    return this.findOne(id);
  }

  async updateActive(id: number, ativo: boolean): Promise<Fornecedores | null> {
    await this.fornecedoresModel.update({ ativo }, { where: { id } });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.equipamentosModel.update(
      { fornecedorId: null as unknown as number  },
      { where: { fornecedorId: id } },
    );

    await this.fornecedoresModel.destroy({ where: { id } });
  }

  async findSuppliersByObra(obraId: number): Promise<Fornecedores[]> {
    return this.fornecedoresModel.findAll({
      include: [
        {
          model: Obra,
          as: 'obras',
          where: { id: obraId },
          required: true,
        },
      ],
    });
  }

  async findOneByOptions(options: any): Promise<Fornecedores | null> {
    return this.fornecedoresModel.findOne(options);
  }
}
