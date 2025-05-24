import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { ObrasRepository } from './obras.repository';
import { FornecedoresRepository } from '../fornecedores/fornecedores.repository';
import { EnderecoRepository } from '../enderecos/endereco.repository';
import { EquipamentosRepository } from '../equipamentos/equipamentos.repository';

@Injectable()
export class ObrasService {
  constructor(private readonly obraRepository: ObrasRepository,
    private readonly fornecedoresRepository: FornecedoresRepository,
    private readonly enderecoRepository: EnderecoRepository,
    private readonly equipamentosRepository: EquipamentosRepository
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

  if (obra.fornecedores?.length) {
    const fornecedoresIds = obra.fornecedores.map((f) => f.id);
    const todosFornecedores = await this.fornecedoresRepository.findAll();
    const fornecedoresExistentes = todosFornecedores.filter((f) =>
      fornecedoresIds.includes(f.id)
    );

    if (fornecedoresExistentes.length !== fornecedoresIds.length) {
      throw new HttpException(
        'Um ou mais fornecedores informado(s) não existem!',
        HttpStatus.NOT_FOUND
      );
    }

    obra.fornecedores = fornecedoresExistentes;
  }

  if (obra.equipamentos?.length) {
    const equipamentosIds = obra.equipamentos.map((e) => e.id);
    const todosEquipamentos = await this.equipamentosRepository.findAll();
    const equipamentosExistentes = todosEquipamentos.filter((e) =>
      equipamentosIds.includes(e.id)
    );

    if (equipamentosExistentes.length !== equipamentosIds.length) {
      throw new HttpException(
        'Um ou mais equipamentos informado(s) não existem!',
        HttpStatus.NOT_FOUND
      );
    }

    obra.equipamentos = equipamentosExistentes;
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


     if (obra.equipamentos?.length) {
    const equipamentosIds = obra.equipamentos.map((e) => e.id);
    const todosEquipamentos = await this.equipamentosRepository.findAll();
    const equipamentosExistentes = todosEquipamentos.filter((e) =>
      equipamentosIds.includes(e.id)
    );

    if (equipamentosExistentes.length !== equipamentosIds.length) {
      throw new HttpException(
        'Um ou mais equipamentos informado(s) não existem!',
        HttpStatus.NOT_FOUND
      );
    }

    obra.equipamentos = equipamentosExistentes;
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