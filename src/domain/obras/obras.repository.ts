import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Obras } from './entities/obras.entity';
import { CreateObraDto } from './dto/create-obra.dto';
import { UpdateObraDto } from './dto/update-obra.dto';
import { Endereco } from '../enderecos/entities/endereco.entity';
import { Fornecedores } from '../fornecedores/entities/fornecedores.entity';
import { Equipamentos } from '../equipamentos/entities/equipamento.entity';

@Injectable()
export class ObrasRepository {
  constructor(
    @InjectModel(Obras)
    private readonly obrasModel: typeof Obras,
  ) {}

  async findAll(): Promise<Obras[]> {
  return this.obrasModel.findAll({
    include: [
      {
        association: 'fornecedores',
        attributes: ['id'],
        through: { attributes: [] }, 
      },
      {
        association: 'equipamentos',
        attributes: ['id'], 
        through: { attributes: [] }, 
      },
    ],
  });
}

  async findById(id: number): Promise<Obras | null> {
    return this.obrasModel.findByPk(id, { include: [Endereco, Fornecedores, Equipamentos] });
  }

  async create(data: CreateObraDto): Promise<Obras> {
  const { fornecedoresId, equipamentosId, ...obraData } = data as any;

  const novaObra = await this.obrasModel.create(obraData);

  if (fornecedoresId && fornecedoresId.length > 0) {
    await novaObra.$set('fornecedores', fornecedoresId);
  }

  if (equipamentosId && equipamentosId.length > 0) {
    await novaObra.$set('equipamentos', equipamentosId);
  }

  const obra = await this.findById(novaObra.id);
  if (!obra) {
    throw new Error('Obra not found after creation');
  }

  return obra;
}

  async update(id: number, data: UpdateObraDto): Promise<Obras | null> {
    const obra = await this.obrasModel.findByPk(id);
    if (!obra) return null;

    const { fornecedoresId, equipamentosId, ...updateData } = data;

    await obra.update(updateData);

    if (fornecedoresId) {
      await obra.$set('fornecedores', fornecedoresId); 
    }

    if (equipamentosId) {
    await obra.$set('equipamentos', equipamentosId);
  }

    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const deletedCount = await this.obrasModel.destroy({ where: { id } });
    return deletedCount > 0;
  }
}
