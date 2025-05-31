import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Fornecedores } from './entities/fornecedores.entity';
import { CreateFornecedoresDto } from './dto/create-fornecedores.dto';
import { UpdateFornecedoresDto } from './dto/update-fornecedores.dto';
import { Obras } from '../obras/entities/obras.entity';


@Injectable()
export class FornecedoresRepository {
  constructor(
    @InjectModel(Fornecedores)
    private readonly fornecedoresModel: typeof Fornecedores,
  ) {}

  async findAll(): Promise<Fornecedores[]> {
    return this.fornecedoresModel.findAll({
    include: [
      {
        association: 'obras',
        attributes: ['id'],
        through: { attributes: [] }, 
      },
    ],
  });
  }

  async findById(id: number): Promise<Fornecedores | null> {
    return this.fornecedoresModel.findByPk(id, { include: [Obras] });
  }

  async create(data: CreateFornecedoresDto): Promise<Fornecedores> {
    const { obrasId, ...obraData } = data;
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
    const endereco = await this.fornecedoresModel.findByPk(id);
    if (!endereco) return null;
    return endereco.update(data as any);
  }

  async delete(id: number): Promise<boolean> {
    const deletedCount = await this.fornecedoresModel.destroy({ where: { id } });
    return deletedCount > 0;
  }

  async findOneByOptions(options: any): Promise<Fornecedores | null> {
  return this.fornecedoresModel.findOne(options);
  }
}