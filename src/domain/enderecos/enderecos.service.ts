import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { EnderecoRepository } from './endereco.repository';
import { ObrasRepository } from '../obras/obras.repository';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';

@Injectable()
export class EnderecosService {
  constructor(
    private readonly enderecoRepository: EnderecoRepository,
    private readonly obrasRepository: ObrasRepository,
  ) {}

  async create(id: number, endereco: CreateEnderecoDto) {
    const obra = await this.obrasRepository.findById(id);

    if (!obra) {
      throw new NotFoundException('A obra informada não existe!');
    }

    if (obra.enderecoId) {
      throw new BadRequestException('Esta obra já possui um endereço cadastrado!');
    }

    return this.enderecoRepository.create(id, endereco);
  }

  async findOne(id: number) {
    const obra = await this.obrasRepository.findById(id);

    if (!obra) {
      throw new NotFoundException('A obra informada não existe!');
    }

    if (obra.enderecoId === null || obra.enderecoId === undefined) {
    throw new BadRequestException('Esta obra não possui endereço!');
  }

    return this.enderecoRepository.findEnderecoByObraId(id);
  }

  async update(id: number, enderecoInput: UpdateEnderecoDto) {
  const obra = await this.obrasRepository.findById(id);

  if (!obra) {
    throw new NotFoundException('A obra informada não existe!');
  }

  if (obra.enderecoId === null || obra.enderecoId === undefined) {
    throw new BadRequestException('Esta obra não possui endereço cadastrado para atualizar!');
  }

  this.enderecoRepository.update(id, enderecoInput);
}

async findAll() {
  return this.enderecoRepository.findAll();
}
}