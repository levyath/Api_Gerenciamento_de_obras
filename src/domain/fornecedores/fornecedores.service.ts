import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { FornecedoresRepository } from './fornecedores.repository';
import { Fornecedores } from './entities/fornecedores.entity';
import { CreateFornecedoresDto } from './dto/create-fornecedores.dto';
import { UpdateFornecedoresDto } from './dto/update-fornecedores.dto';
import { ObrasRepository } from '../obras/obras.repository';

@Injectable()
export class FornecedoresService {
  constructor(
    private readonly fornecedoresRepo: FornecedoresRepository,
    private readonly obrasRepository: ObrasRepository,
  ) {}

  async findAll(): Promise<Fornecedores[]> {
    return this.fornecedoresRepo.findAll();
  }

  async findOne(id: number): Promise<Fornecedores | null> {
    const existeFornecedor = await this.fornecedoresRepo.findById(id);
    
    if (!existeFornecedor) {
      throw new NotFoundException('O Fornecedor buscado não existe!');
    }

    return this.fornecedoresRepo.findById(id);
  }

  async create(data: CreateFornecedoresDto): Promise<Fornecedores> {

  if (data.email) {
    const existeEmail = await this.fornecedoresRepo.findOneByOptions({
      where: { email: data.email },
    });
    if (existeEmail) {
      throw new HttpException('Já existe um fornecedor com o mesmo e-mail.', HttpStatus.CONFLICT);
    }
  }

  if (data.telefone) {
    const existeTelefone = await this.fornecedoresRepo.findOneByOptions({
      where: { telefone: data.telefone },
    });
    if (existeTelefone) {
      throw new HttpException('Já existe um fornecedor com o mesmo telefone.', HttpStatus.CONFLICT);
    }
  }

  if (data.cnpj) {
    const existeCnpj = await this.fornecedoresRepo.findOneByOptions({
      where: { cnpj: data.cnpj },
    });
    if (existeCnpj) {
      throw new HttpException('Já existe um fornecedor com o mesmo CNPJ.', HttpStatus.CONFLICT);
    }
  }

  if (data.obrasId?.length) {
    const todasObras = await this.obrasRepository.findAll();
    const obrasExistentes = todasObras.filter((obra) => data.obrasId!.includes(obra.id));

    if (obrasExistentes.length !== data.obrasId.length) {
      throw new HttpException('Uma ou mais obras informadas não existem.', HttpStatus.NOT_FOUND);
    }

    data.obrasId = obrasExistentes.map((obra) => obra.id);
  }

  return this.fornecedoresRepo.create(data);
}

  async update(id: number, data: Partial<UpdateFornecedoresDto>): Promise<Fornecedores | null> {

    const existeFornecedor = await this.fornecedoresRepo.findById(id);
    
    if (!existeFornecedor) {
      throw new NotFoundException('O Fornecedor buscado não existe!');
    }

    if (data.email) {
      const existeEmail = await this.fornecedoresRepo.findOneByOptions({
        where: { email: data.email },
      });
      if (existeEmail) {
        throw new HttpException('Já existe um fornecedor com o mesmo e-mail.', HttpStatus.CONFLICT);
      }
    }

    if (data.telefone) {
      const existeTelefone = await this.fornecedoresRepo.findOneByOptions({
        where: { telefone: data.telefone },
      });
      if (existeTelefone) {
        throw new HttpException('Já existe um fornecedor com o mesmo telefone.', HttpStatus.CONFLICT);
      }
    }

    if (data.cnpj) {
      const existeCnpj = await this.fornecedoresRepo.findOneByOptions({
        where: { cnpj: data.cnpj },
      });
      if (existeCnpj) {
        throw new HttpException('Já existe um fornecedor com o mesmo CNPJ.', HttpStatus.CONFLICT);
      }
    }

    if (data.obrasId?.length) {
      const todasObras = await this.obrasRepository.findAll();
      const obrasExistentes = todasObras.filter((obra) => data.obrasId!.includes(obra.id));

      if (obrasExistentes.length !== data.obrasId.length) {
        throw new HttpException('Uma ou mais obras informadas não existem.', HttpStatus.NOT_FOUND);
      }

      data.obrasId = obrasExistentes.map((obra) => obra.id);
    }

    return this.fornecedoresRepo.update(id, data);
  }

  async remove(id: number): Promise<boolean> {
    const existeFornecedor = await this.fornecedoresRepo.findById(id);
    
    if (!existeFornecedor) {
      throw new NotFoundException('O Fornecedor buscado não existe!');
    }

    return this.fornecedoresRepo.delete(id);
  }
}
