import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
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

    const existeObra = await this.obrasRepo.findById(id);

    if (!existeObra) {
      throw new NotFoundException('A obra buscada não existe!');
    }
    
    return this.obrasRepo.findById(id);
  }

 async create(data: CreateObraDto): Promise<Obras> {
  if (data.fornecedoresId?.length) {
    const fornecedoresIds = data.fornecedoresId;

    const todosFornecedores = (await this.fornecedoresRepository.findAll())
      .filter(fornecedor => fornecedoresIds.includes(fornecedor.id));

    if (todosFornecedores.length !== fornecedoresIds.length) {
      const idsIncorretos = fornecedoresIds.filter(id => !todosFornecedores.some(f => f.id === id));
      throw new HttpException(
        `Os fornecedores a seguir não existem: ${idsIncorretos.join(', ')}`,
        HttpStatus.NOT_FOUND,
      );
    }

    const fornecedoresInativos = todosFornecedores.filter(f => f.ativo === false || f.ativo === null || f.ativo === undefined);

    if (fornecedoresInativos.length > 0) {
      throw new HttpException(
        `Os fornecedores a seguir estão inativos: ${fornecedoresInativos.map(f => f.id).join(', ')}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    data.fornecedoresId = todosFornecedores.map(f => f.id);
  }

  if (data.equipamentosId?.length) {
    const equipamentosIds = data.equipamentosId;
    const todosEquipamentos = await this.equipamentosRepository.findAll();
    const equipamentosExistentes = todosEquipamentos.filter(e => equipamentosIds.includes(e.id));

    if (equipamentosExistentes.length !== equipamentosIds.length) {
      const idsIncorretos = equipamentosIds.filter(id => !equipamentosExistentes.some(e => e.id === id));
      throw new HttpException(
        `Os equipamentos a seguir não existem: ${idsIncorretos.join(', ')}`,
        HttpStatus.NOT_FOUND,
      );
    }

    data.equipamentosId = equipamentosExistentes.map(e => e.id);
  }

    return this.obrasRepo.create(data);
  }

  async update(id: number, data: UpdateObraDto): Promise<Obras | null> {

    const existeObra = await this.obrasRepo.findById(id);

    if (!existeObra) {
      throw new NotFoundException('A obra buscada não existe!');
    }

    if (data.fornecedoresId?.length) {
    const fornecedoresIds = data.fornecedoresId;

    const todosFornecedores = (await this.fornecedoresRepository.findAll())
      .filter(fornecedor => fornecedoresIds.includes(fornecedor.id));

    if (todosFornecedores.length !== fornecedoresIds.length) {
      const idsIncorretos = fornecedoresIds.filter(id => !todosFornecedores.some(f => f.id === id));
      throw new HttpException(
        `Os fornecedores a seguir não existem: ${idsIncorretos.join(', ')}`,
        HttpStatus.NOT_FOUND,
      );
    }

    const fornecedoresInativos = todosFornecedores.filter(f => f.ativo === false || f.ativo === null || f.ativo === undefined);

    if (fornecedoresInativos.length > 0) {
      throw new HttpException(
        `Os fornecedores a seguir estão inativos: ${fornecedoresInativos.map(f => f.id).join(', ')}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    data.fornecedoresId = todosFornecedores.map(f => f.id);
  }

  if (data.equipamentosId?.length) {
    const equipamentosIds = data.equipamentosId;
    const todosEquipamentos = await this.equipamentosRepository.findAll();
    const equipamentosExistentes = todosEquipamentos.filter(e => equipamentosIds.includes(e.id));

    if (equipamentosExistentes.length !== equipamentosIds.length) {
      const idsIncorretos = equipamentosIds.filter(id => !equipamentosExistentes.some(e => e.id === id));
      throw new HttpException(
        `Os equipamentos a seguir não existem: ${idsIncorretos.join(', ')}`,
        HttpStatus.NOT_FOUND,
      );
    }

    data.equipamentosId = equipamentosExistentes.map(e => e.id);
  }

    return this.obrasRepo.update(id, data);
  }

  async remove(id: number): Promise<boolean> {
    const existeObra = await this.obrasRepo.findById(id);

    if (!existeObra) {
      throw new NotFoundException('A obra buscada não existe!');
    }
    return this.obrasRepo.delete(id);
  }
}
