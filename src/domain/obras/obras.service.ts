import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ObrasRepository } from './obras.repository';
import { Obras } from './entities/obras.entity';
import { CreateObraDto } from './dto/create-obra.dto';
import { UpdateObraDto } from './dto/update-obra.dto';
import { FornecedoresRepository } from '../fornecedores/fornecedores.repository';
import { EquipamentosRepository } from '../equipamentos/equipamentos.repository';

@Injectable()
export class ObrasService {
  constructor(
    private readonly obrasRepo: ObrasRepository,
    private readonly fornecedoresRepository: FornecedoresRepository,
    private readonly equipamentosRepository: EquipamentosRepository,
  ) {}

  async findAll(): Promise<Obras[]> {
    return this.obrasRepo.findAll();
  }

  async findOne(id: number): Promise<Obras | null> {
    return this.obrasRepo.findById(id);
  }

  async create(data: CreateObraDto): Promise<Obras> {

    if (data.fornecedoresId?.length) {
      const fornecedoresIds = data.fornecedoresId;
      const todosFornecedores = await this.fornecedoresRepository.findAll();
      const fornecedoresExistentes = todosFornecedores.filter(f => fornecedoresIds.includes(f.id));

      if (fornecedoresExistentes.length !== fornecedoresIds.length) {
        throw new HttpException(
          'Um ou mais fornecedores informados não existem!',
          HttpStatus.NOT_FOUND,
        );
      }

      const fornecedoresInativos = fornecedoresExistentes.filter(f => !f.ativo);

      if (fornecedoresInativos.length > 0) {
        throw new HttpException(
          'Um ou mais fornecedores estão inativos!',
          HttpStatus.BAD_REQUEST,
        );
      }

      data.fornecedoresId = fornecedoresExistentes.map(f => f.id);
    }

    if (data.equipamentosId?.length) {
      const equipamentosIds = data.equipamentosId;
      const todosEquipamentos = await this.equipamentosRepository.findAll();
      const equipamentosExistentes = todosEquipamentos.filter(e => equipamentosIds.includes(e.id));

      if (equipamentosExistentes.length !== equipamentosIds.length) {
        throw new HttpException(
          'Um ou mais equipamentos informados não existem!',
          HttpStatus.NOT_FOUND,
        );
      }

      const equipamentosEmUso = await this.equipamentosRepository.findEquipamentosEmUso(equipamentosIds);

      if (equipamentosEmUso.length > 0) {
        throw new HttpException(
          'Um ou mais equipamentos informados já estão em uso por outra obra!',
          HttpStatus.CONFLICT,
        );
      }

      data.equipamentosId = equipamentosExistentes.map(e => e.id);
    }

    return this.obrasRepo.create(data);
  }

  async update(id: number, data: UpdateObraDto): Promise<Obras | null> {

    if (data.fornecedoresId?.length) {
      const fornecedoresIds = data.fornecedoresId;
      const todosFornecedores = await this.fornecedoresRepository.findAll();
      const fornecedoresExistentes = todosFornecedores.filter(f => fornecedoresIds.includes(f.id));

      if (fornecedoresExistentes.length !== fornecedoresIds.length) {
        throw new HttpException(
          'Um ou mais fornecedores informados não existem!',
          HttpStatus.NOT_FOUND,
        );
      }

      const fornecedoresInativos = fornecedoresExistentes.filter(f => !f.ativo);

      if (fornecedoresInativos.length > 0) {
        throw new HttpException(
          'Um ou mais fornecedores estão inativos!',
          HttpStatus.BAD_REQUEST,
        );
      }

      data.fornecedoresId = fornecedoresExistentes.map(f => f.id);
    }

    if (data.equipamentosId?.length) {
      const equipamentosIds = data.equipamentosId;
      const todosEquipamentos = await this.equipamentosRepository.findAll();
      const equipamentosExistentes = todosEquipamentos.filter(e => equipamentosIds.includes(e.id));

      if (equipamentosExistentes.length !== equipamentosIds.length) {
        throw new HttpException(
          'Um ou mais equipamentos informados não existem!',
          HttpStatus.NOT_FOUND,
        );
      }

      const equipamentosEmUso = await this.equipamentosRepository.findEquipamentosEmUso(equipamentosIds);

      if (equipamentosEmUso.length > 0) {
        throw new HttpException(
          'Um ou mais equipamentos informados já estão em uso por outra obra!',
          HttpStatus.CONFLICT,
        );
      }

      data.equipamentosId = equipamentosExistentes.map(e => e.id);
    }

    return this.obrasRepo.update(id, data);
  }

  async remove(id: number): Promise<boolean> {
    return this.obrasRepo.delete(id);
  }
}
