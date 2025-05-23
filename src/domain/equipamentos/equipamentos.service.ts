import {Injectable, HttpException,HttpStatus,NotFoundException} from '@nestjs/common';
import { In } from 'typeorm';
import { EquipamentosRepository } from './equipamentos.repository';
import { FornecedoresRepository } from '../fornecedores/fornecedores.repository';
import { ObrasRepository } from '../obras/obras.repository';

@Injectable()
export class EquipamentosService {
  constructor(
    private readonly equipamentosRepository: EquipamentosRepository,
    private readonly obrasRepository: ObrasRepository,
    private readonly FornecedoresRepository: FornecedoresRepository,
  ) {}

  async findAll() {
    return this.equipamentosRepository.findAll();
  }

  async findOne(id: number) {
    const equipamento = await this.equipamentosRepository.findOne(id);

    if (!equipamento) {
      throw new NotFoundException('O equipamento buscado não existe!');
    }

    return equipamento;
  }


  async create(equipamentoInput: any) {
    const equipamento = equipamentoInput;

    if (equipamento.numeroDeSerie) {
      const existe = await this.equipamentosRepository.findOneByOptions({
        where: { numeroDeSerie: equipamento.numeroDeSerie },
      });

      if (existe) {
        throw new HttpException(
          'Já existe um equipamento com o mesmo número de série.',
          HttpStatus.CONFLICT,
        );
      }
    }

    if (equipamento.fornecedor) {
  const fornecedor = await this.FornecedoresRepository.findOneByOptions({
      where: { id: equipamento.fornecedor },
    });

    if (!fornecedor) {
      throw new HttpException(
        'O fornecedor informado não existe.',
        HttpStatus.NOT_FOUND,
      );
    }
  }

    if (equipamento.obras?.length) {
      const obraIds = equipamento.obras.map((obra) => obra.id);

      const todasObras = await this.obrasRepository.findAll();
      const obrasExistentes = todasObras.filter((obra) =>
        obraIds.includes(obra.id),
      );

      if (obrasExistentes.length !== obraIds.length) {
        throw new HttpException(
          'Uma ou mais obras informadas não existem.',
          HttpStatus.NOT_FOUND,
        );
      }

      equipamento.obras = obrasExistentes;
    }

    return this.equipamentosRepository.create(equipamento);
  }


  async update(id: number, equipamentoInput: any) {
    const existe = await this.equipamentosRepository.findOne(id);

    if (!existe) {
      throw new NotFoundException('O equipamento buscado não existe!');
    }

    const equipamento = equipamentoInput;

    if (equipamento.numeroDeSerie) {
      const existeOutro = await this.equipamentosRepository.findOneByOptions({
        where: { numeroDeSerie: equipamento.numeroDeSerie },
      });

      if (existeOutro && existeOutro.id !== id) {
        throw new HttpException(
          'Já existe um equipamento com o mesmo número de série.',
          HttpStatus.CONFLICT,
        );
      }
    }

    if (equipamento.fornecedor) {
  const fornecedor = await this.FornecedoresRepository.findOneByOptions({
      where: { id: equipamento.fornecedor },
    });

    if (!fornecedor) {
      throw new HttpException(
        'O fornecedor informado não existe.',
        HttpStatus.NOT_FOUND,
      );
    }
  }

     if (equipamento.obras?.length) {
      const obraIds = equipamento.obras.map((obra) => obra.id);

      const todasObras = await this.obrasRepository.findAll();
      const obrasExistentes = todasObras.filter((obra) =>
        obraIds.includes(obra.id),
      );

      if (obrasExistentes.length !== obraIds.length) {
        throw new HttpException(
          'Uma ou mais obras informadas não existem.',
          HttpStatus.NOT_FOUND,
        );
      }

      equipamento.obras = obrasExistentes;
    }

    return this.equipamentosRepository.update(id, equipamento);
  }


  async updateObras(id: number, obrasIds: number[]) {
  const equipamento = await this.equipamentosRepository.findOne(id);

  if (!equipamento) {
    throw new NotFoundException('O equipamento buscado não existe!');
  }

  const obrasFiltradas = await this.obrasRepository.findByIds(obrasIds);

  if (obrasFiltradas.length !== obrasIds.length) {
    throw new HttpException(
      'Uma ou mais obras informadas não existem.',
      HttpStatus.NOT_FOUND,
    );
  }

  return this.equipamentosRepository.updateObras(id, obrasFiltradas);
}


  async remove(id: number) {
    const existe = await this.equipamentosRepository.findOne(id);

    if (!existe) {
      throw new NotFoundException('O equipamento buscado não existe!');
    }

    return this.equipamentosRepository.remove(id);
  }


  async getEquipamentosByObraId(obraId: number){
    const equipamentos = await this.obrasRepository.findOne(obraId);

    if (!equipamentos) {
      throw new NotFoundException('A obra buscada não existe!');
    }

    return this.equipamentosRepository.findByObraId(obraId);;
  }
}