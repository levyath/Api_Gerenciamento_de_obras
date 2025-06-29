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
     const obraExists = await this.etapaObraRepository.checkObraExists(
      dto.obraId
    );
    if (!obraExists) {
      throw new NotFoundException(`Obra com ID ${dto.obraId} não encontrada`);
    }
    return this.etapaObraRepository.create(dto);
  }

  async findAllByObra(obraId: number): Promise<EtapasDaObra[]> {
    const exists = await this.etapaObraRepository.checkObraExists(obraId);
    if (!exists) {
      throw new NotFoundException(`Obra com ID ${obraId} não encontrada`);
    }
    return this.etapaObraRepository.findAllByObra(obraId);
  }

  async findById(id: number, obraId: number): Promise<EtapasDaObra> {
        const exists = await this.etapaObraRepository.checkObraExists(obraId);
    if (!exists) {
      throw new NotFoundException(`Obra com ID ${obraId} não encontrada`);
    }
    const etapa = await this.etapaObraRepository.findById(id);
    if (!etapa) {
      throw new NotFoundException(`Etapa com ID ${id} não encontrada`);
    }
    return etapa;
  }

  async update(id: number, dto: UpdateEtapasDaObraDto, idObra: number): Promise<EtapasDaObra> {
    const obraExists = await this.etapaObraRepository.checkObraExists(idObra);
    if (!obraExists) {
      throw new NotFoundException(`Obra com ID ${idObra} não encontrada`);
    }
    const [count, [updated]] = await this.etapaObraRepository.update(id, dto);
    if (count === 0) {
      throw new NotFoundException(`Etapa com ID ${id} não encontrada`);
    }
    return updated;
  }

  async remove(id: number, idObra): Promise<void> {
    const obraExists = await this.etapaObraRepository.checkObraExists(idObra);
    if (!obraExists) {
      throw new NotFoundException(`Obra com ID ${idObra} não encontrada`);
    }
    const deleted = await this.etapaObraRepository.remove(id);
    if (deleted === 0) {
      throw new NotFoundException(`Etapa com ID ${id} não encontrada`);
    }
  }
}
