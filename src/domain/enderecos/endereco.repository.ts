import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Endereco } from './entities/endereco.model';
import { Obra } from '../obras/entities/obra.model';

@Injectable()
export class EnderecoRepository {
  constructor(
    @InjectModel(Endereco)
    private readonly enderecoModel: typeof Endereco,

    @InjectModel(Obra)
    private readonly obraModel: typeof Obra,
  ) {}

  async create(
  obraId: number,
  enderecoData: Omit<Partial<Endereco>, 'id'>,
): Promise<Endereco | null> {
  const createdEndereco = await this.enderecoModel.create(enderecoData as any);

  const obra = await this.obraModel.findByPk(obraId);
  if (!obra) {
    return null;
  }

  await obra.update({ enderecoId: createdEndereco.id }); // ajusta FK na obra

  await obra.reload({ include: [{ model: Endereco, as: 'endereco' }] });

  return obra.endereco ?? null;
}


  async findOne(id: number): Promise<Endereco | null> {
    const obra = await this.obraModel.findByPk(id, {
      include: [{ model: Endereco, as: 'endereco' }],
    });

    return obra?.endereco ?? null;
  }

  async findOneByOptions(options: any): Promise<Endereco | null> {
    return this.enderecoModel.findOne(options);
  }

  async update(id: number, enderecoData: Partial<Endereco>): Promise<Endereco | null> {
    const obra = await this.obraModel.findByPk(id, {
      include: [{ model: Endereco, as: 'endereco' }],
    });

    if (!obra || !obra.endereco) {
      return null;
    }

    await this.enderecoModel.update(enderecoData, {
      where: { id: obra.endereco.id },
    });

    return this.enderecoModel.findByPk(obra.endereco.id);
  }
}
