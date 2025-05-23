import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { FornecedoresRepository } from './fornecedores.repository';
import { ObrasRepository } from '../obras/obras.repository';

@Injectable()
export class FornecedoresService {
  constructor(private readonly fornecedoresRepository: FornecedoresRepository,
    private readonly obrasRepository: ObrasRepository
  ) {}



  async findAll() {
    return this.fornecedoresRepository.findAll();
  }



  async findOne(id: number) {
    const existeFornecedor = await this.fornecedoresRepository.findOne(id);

    if (!existeFornecedor) {
      throw new NotFoundException(`O fornecedor buscado não existe!`);
    }
    return existeFornecedor;
  }



  async create(fornecedorInput: any) {
    const fornecedor = fornecedorInput;

    // Verificando duplicidade de informações separadamente
    if (fornecedor.email) {
      const existeEmail = await this.fornecedoresRepository.findOneByOptions({
        where: { email: fornecedor.email },
      });
      if (existeEmail) {
        throw new HttpException('Já existe um fornecedor com o mesmo e-mail.', HttpStatus.CONFLICT);
      }
    }

    if (fornecedor.telefone) {
      const existeTelefone = await this.fornecedoresRepository.findOneByOptions({
        where: { telefone: fornecedor.telefone },
      });
      if (existeTelefone) {
        throw new HttpException('Já existe um fornecedor com o mesmo telefone.', HttpStatus.CONFLICT);
      }
    }

    if (fornecedor.cnpj) {
      const existeCnpj = await this.fornecedoresRepository.findOneByOptions({
        where: { cnpj: fornecedor.cnpj },
      });
      if (existeCnpj) {
        throw new HttpException('Já existe um fornecedor com o mesmo CNPJ.', HttpStatus.CONFLICT);
      }
    }

    //verificando se as obras informadas pelo usuário existem 
    if (fornecedor.obras?.length) {
      const obraIds = fornecedor.obras.map((obra) => obra.id);

      const todasObras = await this.obrasRepository.findAll();
      const obrasExistentes = todasObras.filter((obra) => obraIds.includes(obra.id));

      if (obrasExistentes.length !== obraIds.length) {
        throw new HttpException('Uma ou mais obras informadas não existem.', HttpStatus.NOT_FOUND);
      }

      fornecedor.obras = obrasExistentes;
    }

    return this.fornecedoresRepository.create(fornecedor);
  }



  async update(id: number, fornecedorInput: any) {

    const existeFornecedor = await this.fornecedoresRepository.findOne(id);

    if (!existeFornecedor) {
      throw new NotFoundException(`O fornecedor buscado não existe!`);
    }

    const fornecedor = fornecedorInput;

    // Verificando duplicidade de informações separadamente
    if (fornecedor.email) {
      const existeEmail = await this.fornecedoresRepository.findOneByOptions({
        where: { email: fornecedor.email },
      });
      if (existeEmail) {
        throw new HttpException('Já existe um fornecedor com o mesmo e-mail.', HttpStatus.CONFLICT);
      }
    }

    if (fornecedor.telefone) {
      const existeTelefone = await this.fornecedoresRepository.findOneByOptions({
        where: { telefone: fornecedor.telefone },
      });
      if (existeTelefone) {
        throw new HttpException('Já existe um fornecedor com o mesmo telefone.', HttpStatus.CONFLICT);
      }
    }

    if (fornecedor.cnpj) {
      const existeCnpj = await this.fornecedoresRepository.findOneByOptions({
        where: { cnpj: fornecedor.cnpj },
      });
      if (existeCnpj) {
        throw new HttpException('Já existe um fornecedor com o mesmo CNPJ.', HttpStatus.CONFLICT);
      }
    }

    //verificando se as obras informadas pelo usuário existem 
    if (fornecedor.obras?.length) {
      const obraIds = fornecedor.obras.map((obra) => obra.id);

      const todasObras = await this.obrasRepository.findAll();
      const obrasExistentes = todasObras.filter((obra) => obraIds.includes(obra.id));

      if (obrasExistentes.length !== obraIds.length) {
        throw new HttpException('Uma ou mais obras informadas não existem.', HttpStatus.NOT_FOUND);
      }

      fornecedor.obras = obrasExistentes;
    }

    return this.fornecedoresRepository.update(id, fornecedorInput);
  }



  async updateActive(id: number, ativo: boolean) {
    const existeFornecedor = await this.fornecedoresRepository.findOne(id);

    if (!existeFornecedor) {
      throw new NotFoundException(`O fornecedor buscado não existe!`);
    }

    return this.fornecedoresRepository.updateActive(id, ativo);
  }



  async remove(id: number) {
    const existeFornecedor = await this.fornecedoresRepository.findOne(id);

    if (!existeFornecedor) {
      throw new NotFoundException(`O fornecedor buscado não existe!`);
    }

    return this.fornecedoresRepository.remove(id);
  }


  async findSuppliersByObra(obraId: number) {
  const existeObra = await this.obrasRepository.findOne(obraId);

  if (!existeObra) {
    throw new NotFoundException(`A obra buscada não existe!`);
  }

  return this.fornecedoresRepository.findSuppliersByObra(obraId);
}
}
