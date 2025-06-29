import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Endereco } from './entities/endereco.entity';
import { Obras } from '../obras/entities/obras.entity';  

@Injectable()
export class EnderecoRepository {
  constructor(
    @InjectModel(Endereco)
    private readonly enderecoModel: typeof Endereco,

    @InjectModel(Obras)
    private readonly obraModel: typeof Obras,  
  ) {}

  async findAll(): Promise<Endereco[]> {
  return this.enderecoModel.findAll({
    include: [
      {
        model: Obras,
        attributes: ['id'], 
      },
    ],
  });
}

  async create(obraId: number, enderecoData: Partial<Endereco>): Promise<Endereco | null> {
    const createdEndereco = await this.enderecoModel.create(enderecoData as any);

    await this.obraModel.update(
      { enderecoId: createdEndereco.id },
      { where: { id: obraId } },
    );

    return this.findById(createdEndereco.id);
  }

  async findById(id: number): Promise<Endereco | null> {
    return this.enderecoModel.findByPk(id);
  }

  async findEnderecoByObraId(obraId: number): Promise<Endereco | null> {
    const obra = await this.obraModel.findOne({
      where: { id: obraId },
      attributes: ['enderecoId'],
    });

    if (!obra || obra.enderecoId == null) {
      return null;
    }
    return this.enderecoModel.findByPk(obra.enderecoId);
  }

  async update(obraId: number, enderecoData: Partial<Endereco>): Promise<void> {
    const obra = await this.obraModel.findByPk(obraId);

    if (!obra || obra.enderecoId == null) {
      throw new Error('Obra não encontrada ou sem endereço associado.');
    }

    await this.enderecoModel.update(enderecoData, {
      where: { id: obra.enderecoId },
    });
  }
}