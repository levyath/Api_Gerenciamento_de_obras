/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { EtapasDaObraRepository } from './etapas-da-obra.repository';
import { CreateEtapasDaObraDto } from './dto/create-etapas-da-obra.dto';
import { EtapasDaObra } from './entities/etapas-da-obra.entity';
import { UpdateEtapasDaObraDto } from './dto/update-etapas-da-obra.dto';

@Injectable()
export class EtapasDaObraService {
  constructor(private readonly etapaObraRepository: EtapasDaObraRepository) {}

  async create(dto: CreateEtapasDaObraDto): Promise<EtapasDaObra> {
    return this.etapaObraRepository.create(dto);
  }

  async findAllByObra(obraId: number): Promise<EtapasDaObra[]> {
    return this.etapaObraRepository.findAllByObra(obraId);
  }

  async findById(id: number): Promise<EtapasDaObra> {
    const etapa = await this.etapaObraRepository.findById(id);
    if (!etapa) {
      throw new NotFoundException(`Etapa com ID ${id} não encontrada`);
    }
    return etapa;
  }

  async update(id: number, dto: UpdateEtapasDaObraDto): Promise<EtapasDaObra> {
    const [count, [updated]] = await this.etapaObraRepository.update(id, dto);
    if (count === 0) {
      throw new NotFoundException(`Etapa com ID ${id} não encontrada`);
    }
    return updated;
  }

  async remove(id: number): Promise<void> {
    const deleted = await this.etapaObraRepository.remove(id);
    if (deleted === 0) {
      throw new NotFoundException(`Etapa com ID ${id} não encontrada`);
    }
  }
}
