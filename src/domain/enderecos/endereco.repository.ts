import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Endereco } from './entities/endereco.entity';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';


@Injectable()
export class EnderecoRepository {
  constructor(
    @InjectModel(Endereco)
    private readonly enderecoModel: typeof Endereco,
  ) {}

  async findAll(): Promise<Endereco[]> {
    return this.enderecoModel.findAll();
  }

  async findById(id: number): Promise<Endereco | null> {
    return this.enderecoModel.findByPk(id);
  }

  async create(data: CreateEnderecoDto): Promise<Endereco> {
    return this.enderecoModel.create(data as any);
  }

  async update(id: number, data: Partial<UpdateEnderecoDto>): Promise<Endereco | null> {
    const endereco = await this.enderecoModel.findByPk(id);
    if (!endereco) return null;
    return endereco.update(data);
  }

  async delete(id: number): Promise<boolean> {
    const deletedCount = await this.enderecoModel.destroy({ where: { id } });
    return deletedCount > 0;
  }
}
