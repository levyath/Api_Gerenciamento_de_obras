import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Obras } from './entities/obras.entity';
import { CreateObraDto } from './dto/create-obra.dto';
import { UpdateObraDto } from './dto/update-obra.dto';
import { Endereco } from '../enderecos/entities/endereco.entity';

@Injectable()
export class ObrasRepository {
  constructor(
    @InjectModel(Obras)
    private readonly obrasModel: typeof Obras,
    @InjectModel(Endereco)
    private readonly enderecoModel: typeof Endereco,
  ) {}

  async findAll(): Promise<Obras[]> {
    return this.obrasModel.findAll({
      include: [
        {
          association: 'endereco', 
          attributes: ['id', 'rua', 'numero','complemento', 'bairro', 'cidade', 'estado', 'cep'],
        },
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
  return this.obrasModel.findByPk(id, {
    attributes: { include: ['enderecoId'] }, 
    include: [
      {
        association: 'endereco',
        attributes: ['id'], 
      },
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

    await obra.update(updateData as any);

    if (fornecedoresId) {
      await obra.$set('fornecedores', fornecedoresId);
    }

    if (equipamentosId) {
      await obra.$set('equipamentos', equipamentosId);
    }

    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
  const obra = await this.obrasModel.findByPk(id);

  if (!obra) {
    return false;
  }

  const enderecoId = obra.enderecoId;

  const deletedCount = await this.obrasModel.destroy({ where: { id } });

  if (deletedCount > 0 && enderecoId) {
    await this.enderecoModel.destroy({ where: { id: enderecoId } });
    return true;
  }

  return false;
}
  
}