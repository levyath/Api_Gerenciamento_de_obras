import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { EquipamentosRepository } from './equipamentos.repository';
import { CreateEquipamentoDto } from './dto/create-equipamento.dto';
import { Equipamentos } from './entities/equipamento.entity';
import { UpdateEquipamentoDto } from './dto/update-equipamento.dto';
import { Obras } from '../obras/entities/obras.entity';
import { Fornecedores } from '../fornecedores/entities/fornecedores.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class EquipamentosService {
  constructor(
    private readonly equipamentosRepository: EquipamentosRepository,
    @InjectModel(Obras)
    private readonly obrasRepository: typeof Obras,
    @InjectModel(Fornecedores)
    private readonly fornecedoresRepository: typeof Fornecedores,
  ) {}

  async findAll(): Promise<Equipamentos[]> {
    return this.equipamentosRepository.findAll();
  }

  async findOne(id: number): Promise<Equipamentos | null> {
    return this.equipamentosRepository.findById(id);
  }

  async create(data: CreateEquipamentoDto): Promise<Equipamentos> {

    if (data.numeroDeSerie) {
      const existe = await this.equipamentosRepository.findOneByOptions({
        where: { numeroDeSerie: data.numeroDeSerie },
      });

      if (existe) {
        throw new HttpException(
          'Já existe um equipamento com o mesmo número de série.',
          HttpStatus.CONFLICT,
        );
      }
    }

    if (data.fornecedorId) {
      const fornecedor = await this.fornecedoresRepository.findOne({
        where: { id: data.fornecedorId },
      });

      if (!fornecedor) {
        throw new HttpException(
          'O fornecedor informado não existe.',
          HttpStatus.NOT_FOUND,
        );
      }
    }

    if (data.obrasId?.length) {
      const obraIds = data.obrasId;

      const obrasExistentes = await this.obrasRepository.findAll({
        where: { id: obraIds },
      });

      if (obrasExistentes.length !== obraIds.length) {
        throw new HttpException(
          'Uma ou mais obras informadas não existem.',
          HttpStatus.NOT_FOUND,
        );
      }

      data.obrasId = obrasExistentes.map((obra) => obra.id);
    }
    return this.equipamentosRepository.create(data);
  }

  async update(id: number, data: Partial<UpdateEquipamentoDto>): Promise<Equipamentos | null> {

    if (data.numeroDeSerie) {
      const existe = await this.equipamentosRepository.findOneByOptions({
        where: { numeroDeSerie: data.numeroDeSerie },
      });

      if (existe) {
        throw new HttpException(
          'Já existe um equipamento com o mesmo número de série.',
          HttpStatus.CONFLICT,
        );
      }
    }

    if (data.fornecedorId) {
      const fornecedor = await this.fornecedoresRepository.findOne({
        where: { id: data.fornecedorId },
      });

      if (!fornecedor) {
        throw new HttpException(
          'O fornecedor informado não existe.',
          HttpStatus.NOT_FOUND,
        );
      }
    }

    if (data.obrasId?.length) {
      const obraIds = data.obrasId;

      const obrasExistentes = await this.obrasRepository.findAll({
        where: { id: obraIds },
      });

      if (obrasExistentes.length !== obraIds.length) {
        throw new HttpException(
          'Uma ou mais obras informadas não existem.',
          HttpStatus.NOT_FOUND,
        );
      }

      data.obrasId = obrasExistentes.map((obra) => obra.id);
    }
    
    return this.equipamentosRepository.update(id, data);
  }

  async delete(id: number): Promise<boolean> {
    return this.equipamentosRepository.delete(id);
  }
}

