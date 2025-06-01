import { Injectable, HttpException, HttpStatus, NotFoundException, BadRequestException } from '@nestjs/common';
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

  if(!data.ativo){
    throw new HttpException('Não é possível criar um fornecedor inativo!', HttpStatus.CONFLICT);
  }

  if (data.obrasId?.length) {
    const todasObras = await this.obrasRepository.findAll();
    const obrasExistentes = todasObras.filter((obra) => data.obrasId!.includes(obra.id));

    if (obrasExistentes.length !== data.obrasId.length) {
      const idsIncorretos = data.obrasId.filter(
        (id) => !obrasExistentes.some((obra) => obra.id === id)
      );
      throw new HttpException(
        `As obras a seguir não existem: ${idsIncorretos.join(', ')}`,
        HttpStatus.NOT_FOUND,
      );
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
        const idsIncorretos = data.obrasId.filter(
          (id) => !obrasExistentes.some((obra) => obra.id === id)
        );
        throw new HttpException(
          `As obras a seguir não existem: ${idsIncorretos.join(', ')}`,
          HttpStatus.NOT_FOUND,
        );
      }

      data.obrasId = obrasExistentes.map((obra) => obra.id);
    }

    return this.fornecedoresRepo.update(id, data);
  }

   async updateActive(id: number, ativo: boolean) {
  const existeFornecedor = await this.fornecedoresRepo.findById(id);

  if (!existeFornecedor) {
    throw new NotFoundException(`O fornecedor buscado não existe!`);
  }

  if (existeFornecedor.ativo === ativo) {
    throw new BadRequestException(`O campo 'ativo' já está definido como ${ativo}. Nenhuma atualização necessária.`);
  }

  return this.fornecedoresRepo.updateActive(id, ativo);
}

  async remove(id: number): Promise<boolean> {
    const existeFornecedor = await this.fornecedoresRepo.findById(id);
    
    if (!existeFornecedor) {
      throw new NotFoundException('O Fornecedor buscado não existe!');
    }

    return this.fornecedoresRepo.delete(id);
  }

  async findSuppliersByObra(obraId: number) {
  const existeObra = await this.obrasRepository.findById(obraId);

  if (!existeObra) {
    throw new NotFoundException(`A obra buscada não existe!`);
  }

  const fornecedores = await this.fornecedoresRepo.findSuppliersByObra(obraId);

  if (!fornecedores || fornecedores.length === 0) {
    throw new NotFoundException(`Nenhum fornecedor encontrado para a obra de ID ${obraId}.`);
  }

  return fornecedores;
}
}
