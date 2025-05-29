import { Injectable, NotFoundException } from '@nestjs/common';
import { EquipamentosRepository } from './equipamentos.repository';
import { CreateEquipamentoDto } from './dto/create-equipamento.dto';
import { Equipamentos } from './entities/equipamento.entity';


@Injectable()
export class EquipamentosService {
  constructor(private readonly equipamentosRepository: EquipamentosRepository) {}

  async findAll(): Promise<Equipamentos[]> {
    return this.equipamentosRepository.findAll();
  }

  async findOne(id: number): Promise<Equipamentos> {
    const equipamento = await this.equipamentosRepository.findOne(id);
    if (!equipamento) {
      throw new NotFoundException(`Equipamento com id ${id} não encontrado`);
    }
    return equipamento;
  }

  async create(data: Equipamentos): Promise<Equipamentos> {
    return this.equipamentosRepository.create(data);
  }

  async update(id: number, data: Partial<Equipamentos>): Promise<Equipamentos> {
    const equipamento = await this.equipamentosRepository.update(id, data);
    if (!equipamento) {
      throw new NotFoundException(`Equipamento com id ${id} não encontrado`);
    }
    return equipamento;
  }

  async delete(id: number): Promise<void> {
    const deleted = await this.equipamentosRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Equipamento com id ${id} não encontrado`);
    }
  }
}
