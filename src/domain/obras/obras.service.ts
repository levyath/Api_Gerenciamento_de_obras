import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { ObrasRepository } from './obras.repository';
import { FornecedoresRepository } from '../fornecedores/fornecedores.repository';

@Injectable()
export class ObrasService {
  constructor(private readonly obraRepository: ObrasRepository,
    private readonly fornecedoresRepository: FornecedoresRepository
  ) {}


  async findAll() {
    return this.obraRepository.findAll();
  }


  async findOne(id: number) {
    const existeObra = await this.obraRepository.findOne(id);
    
    if (!existeObra) {
      throw new NotFoundException(`A obra buscada não existe!`);
    }

    return existeObra;
  }


  async create(obraInput: any) {

    const obra = obraInput;

    //verificando se os fornecedores informados pelo usuário existem 
    if (obra.fornecedores?.length) {
      const fornecedoresIds = obra.fornecedores.map((obra) => obra.id);

      const todasObras = await this.fornecedoresRepository.findAll();
      const obrasExistentes = todasObras.filter((obra) => fornecedoresIds.includes(obra.id));

      if (obrasExistentes.length !== fornecedoresIds.length) {
        throw new HttpException('Um ou mais fornecedores informado(s) não existem!', HttpStatus.NOT_FOUND);
      }

      obra.fornecedores = obrasExistentes;
    }

    return this.obraRepository.create(obra);
  }


  async update(id: number, obraInput: any) {
    const existeObra = await this.obraRepository.findOne(id);
    
    if (!existeObra) {
      throw new NotFoundException(`A obra buscada não existe!`);
    }

    const obra = obraInput;

    //verificando se os fornecedores informados pelo usuário existem 
    if (obra.fornecedores?.length) {
      const fornecedoresIds = obra.fornecedores.map((obra) => obra.id);

      const todasObras = await this.fornecedoresRepository.findAll();
      const obrasExistentes = todasObras.filter((obra) => fornecedoresIds.includes(obra.id));

      if (obrasExistentes.length !== fornecedoresIds.length) {
        throw new HttpException('Um ou mais fornecedores informado(s) não existem!', HttpStatus.NOT_FOUND);
      }

      obra.fornecedores = obrasExistentes;
    }

    return this.obraRepository.update(id, obra);
  }
  

  async remove(id: number) {
    const existeObra = await this.obraRepository.findOne(id);
    
    if (!existeObra) {
      throw new NotFoundException(`A obra buscada não existe!`);
    }

    return this.obraRepository.remove(id);
  }
}