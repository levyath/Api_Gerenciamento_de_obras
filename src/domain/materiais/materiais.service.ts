import { Injectable, NotFoundException, BadRequestException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { MaterialRepository } from './materiais.repository';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { Material } from './entities/material.entity';

@Injectable()
export class MateriaisService {
  constructor(
    private readonly materialRepository: MaterialRepository,
  ) {}

  async create(dto: CreateMaterialDto): Promise<Material> {
    const existing = await this.materialRepository.findByCodigo(dto.codigo);
    if (existing) {
      throw new ConflictException('Já existe um material com este código');
    }

    try {
      return await this.materialRepository.create(dto);
    } catch (error) {
      throw new InternalServerErrorException('Falha ao criar material');
    }
  }
  
  async findAll(): Promise<Material[]> {
    return this.materialRepository.findAll();
  }

  async findOne(id: number): Promise<Material> {
    const material = await this.materialRepository.findById(id);
    if (!material) {
      throw new NotFoundException(`Material com ID ${id} não encontrado`);
    }
    return material;
  }

  
}