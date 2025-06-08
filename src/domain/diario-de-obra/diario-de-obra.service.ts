/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { DiarioDeObraRepository } from './diario-de-obra.repository';
import { CreateDiarioDeObraDto } from './dto/create-diario-de-obra.dto';
import { DiarioDeObra } from './entities/diario-de-obra.entity';
import { UpdateDiarioDeObraDto } from './dto/update-diario-de-obra.dto';
import { MaterialRepository } from '../materiais/materiais.repository';
import { Material } from '../materiais/entities/material.entity';

@Injectable()
export class DiarioDeObraService {
  constructor(
    private readonly diarioDeObraRepository: DiarioDeObraRepository,
    private readonly materiaisRepository: MaterialRepository,
  ) {}

  async create(dto: CreateDiarioDeObraDto): Promise<DiarioDeObra> {
    if (dto.materiaisId?.length) {
      const materiaisId = dto.materiaisId;

      const todosMateriais = (await this.materiaisRepository.findAll())
        .filter(material => materiaisId.includes(material.id));

      if (todosMateriais.length !== materiaisId.length) {
        const idsIncorretos = materiaisId.filter(id => !todosMateriais.some(f => f.id === id));
        throw new HttpException(
          `Os materiais a seguir não existem: ${idsIncorretos.join(', ')}`,
          HttpStatus.NOT_FOUND,
        );
      }

      dto.materiaisId = todosMateriais.map(f => f.id);
    }

    const obraExists = await this.diarioDeObraRepository.checkObraExists(dto.obraId);
    if (!obraExists) {
      throw new NotFoundException(`Obra com ID ${dto.obraId} não encontrada`);
    }

    // Cria o diário
    const diario = await this.diarioDeObraRepository.create(dto);

    // Associa materiais, se houver
    if (dto.materiaisId?.length) {
      await diario.$set('materiaisUtilizados', dto.materiaisId);
      // Recarrega para incluir materiais no retorno
      await diario.reload({ include: [{ model: Material, as: 'materiaisUtilizados' }] });
    }

    return diario;
  }

  async findAllByObra(obraId: number): Promise<DiarioDeObra[]> {
    const exists = await this.diarioDeObraRepository.checkObraExists(obraId);
    if (!exists) {
      throw new NotFoundException(`Obra com ID ${obraId} não encontrada`);
    }
    return this.diarioDeObraRepository.findAllByObra(obraId);
  }

  async findById(id: number, idObra: number): Promise<DiarioDeObra> {
    const obraExists = await this.diarioDeObraRepository.checkObraExists(idObra);
    if (!obraExists) {
      throw new NotFoundException(`Obra com ID ${idObra} não encontrada`);
    }
    const diario = await this.diarioDeObraRepository.findById(id);
    if (!diario) {
      throw new NotFoundException(`Diário de obra com ID ${id} não encontrado`);
    }
    return diario;
  }

  async update(id: number, dto: UpdateDiarioDeObraDto, idObra: number): Promise<void> {
    const obraExists = await this.diarioDeObraRepository.checkObraExists(idObra);
    if (!obraExists) {
      throw new NotFoundException(`Obra com ID ${idObra} não encontrada`);
    }

    const [count] = await this.diarioDeObraRepository.update(id, dto);

    if (count === 0) {
      throw new NotFoundException(`Diário de obra com ID ${id} não encontrado`);
    }

    // Se quiser atualizar materiais aqui, faça lógica similar à create
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
