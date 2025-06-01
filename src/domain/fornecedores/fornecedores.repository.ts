import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Fornecedores } from './entities/fornecedores.entity';
import { CreateFornecedoresDto } from './dto/create-fornecedores.dto';
import { UpdateFornecedoresDto } from './dto/update-fornecedores.dto';
import { Obras } from '../obras/entities/obras.entity';
import { Equipamentos } from '../equipamentos/entities/equipamento.entity';
import { ObrasFornecedores } from '../obra-fornecedor/entities/obras-fornecedores.entity';


@Injectable()
export class FornecedoresRepository {
  constructor(
    @InjectModel(Fornecedores)
    private readonly fornecedoresModel: typeof Fornecedores,
    @InjectModel(Obras)
    private readonly obrasModel: typeof Obras,
    @InjectModel(Equipamentos)
    private readonly equipamentosModel: typeof Equipamentos, 
    @InjectModel(ObrasFornecedores)
    private readonly obraFornecedorModel: typeof ObrasFornecedores,
  ) {}

  async findAll(): Promise<Fornecedores[]> {
  return this.fornecedoresModel.findAll({
    include: [
      {
        model: Obras,
        attributes: ['id'],
        through: { attributes: [] },
      },
    ],
  });
}

  async findById(id: number): Promise<Fornecedores | null> {
  return this.fornecedoresModel.findByPk(id, {
    include: [
      {
        model: Obras,
        through: { attributes: [] }, 
      },
    ],
  });
}

  async create(data: CreateFornecedoresDto): Promise<Fornecedores> {
    const { obrasId } = data;
    const novaObra = await this.fornecedoresModel.create(data as any);
    if (obrasId && obrasId.length > 0) {
    await novaObra.$set('obrasId', obrasId);
  }

    const obra = await this.findById(novaObra.id);
    if (!obra) {
      throw new Error('Obra not found after creation');
    }
    return obra;
  }

  async update(id: number, data: Partial<UpdateFornecedoresDto>): Promise<Fornecedores | null> {
  const fornecedor = await this.fornecedoresModel.findByPk(id);
  if (!fornecedor) return null;

  const { obrasId, ...fornecedorData } = data;

  await fornecedor.update(fornecedorData as any);

  if (obrasId) {
    await fornecedor.$set('obrasId', obrasId);
  }

  return this.findById(id);
}

async updateActive(id: number, ativo: boolean): Promise<Fornecedores | null> {
  await this.fornecedoresModel.update(
    { ativo },            
    { where: { id } }    
  );
  return this.findById(id);
}

  async delete(id: number): Promise<boolean> {
  await this.obraFornecedorModel.destroy({
    where: { fornecedorId: id }
  });

  await this.equipamentosModel.update(
    { fornecedorId: null as unknown as number },
    { where: { fornecedorId: id } }
  );

  const deletedCount = await this.fornecedoresModel.destroy({ where: { id } });
  return deletedCount > 0;
}

  async findSuppliersByObra(obraId: number): Promise<Fornecedores[] | null> {
  const obra = await this.obrasModel.findByPk(obraId, {
    include: [
      {
        model: this.fornecedoresModel,
        through: { attributes: [] },
      },
    ],
  });

  return obra ? (obra.fornecedores ?? []) : null; 
}

  async findOneByOptions(options: any): Promise<Fornecedores | null> {
  return this.fornecedoresModel.findOne(options);
  }
}