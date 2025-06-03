/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { DiarioDeObraRepository } from './diario-de-obra.repository';
import { CreateDiarioDeObraDto } from './dto/create-diario-de-obra.dto';
import { DiarioDeObra } from './entities/diario-de-obra.entity';
import { UpdateDiarioDeObraDto } from './dto/update-diario-de-obra.dto';

@Injectable()
export class DiarioDeObraService {
  constructor(
    private readonly diarioDeObraRepository: DiarioDeObraRepository,
  ) {}

  async create(dto: CreateDiarioDeObraDto): Promise<DiarioDeObra> {
    const obraExists = await this.diarioDeObraRepository.checkObraExists(
      dto.obraId
    );
    if (!obraExists) {
      throw new NotFoundException(`Obra com ID ${dto.obraId} não encontrada`);
    }
    return this.diarioDeObraRepository.create(dto);
  }

  async findAllByObra(obraId: number): Promise<DiarioDeObra[]> {
    return this.diarioDeObraRepository.findAllByObra(obraId);
  }

  async findById(id: number): Promise<DiarioDeObra> {
    const diario = await this.diarioDeObraRepository.findById(id);
    if (!diario) {
      throw new NotFoundException(`Diário de obra com ID ${id} não encontrado`);
    }
    return diario;
  }

  async update(id: number, dto: UpdateDiarioDeObraDto, idObra: number): Promise<DiarioDeObra> {
    const obraExists = await this.diarioDeObraRepository.checkObraExists(idObra);
    if (!obraExists) {
      throw new NotFoundException(`Obra com ID ${idObra} não encontrada`);
    }
    const [count, [updated]] = await this.diarioDeObraRepository.update(
      id,
      dto,
    );
    if (count === 0) {
      throw new NotFoundException(`Diário de obra com ID ${id} não encontrado`);
    }
    return updated;
  }

  async remove(id: number, idObra: number): Promise<void> {
    const obraExists = await this.diarioDeObraRepository.checkObraExists(idObra);
    if (!obraExists) {
      throw new NotFoundException(`Obra com ID ${idObra} não encontrada`);
    }
    const deleted = await this.diarioDeObraRepository.remove(id);
    if (deleted === 0) {
      throw new NotFoundException(`Diário de obra com ID ${id} não encontrado`);
    }
  }
}
