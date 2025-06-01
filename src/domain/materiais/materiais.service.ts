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
    // Validação básica do ID
    this.validarId(id);

    const material = await this.materialRepository.findById(id);
    if (!material) {
      throw new NotFoundException(`Material com ID ${id} não encontrado`);
    }

    return material;
  }

  async update(id: number, input: UpdateMaterialDto): Promise<Material | null> {
    // Validação básica do ID
    this.validarId(id);
    
    // Verifica se há dados para atualizar
    if (Object.keys(input).length === 0) {
        throw new BadRequestException('Nenhum dado fornecido para atualização');
    }

    // Valida propriedades permitidas
    const allowedProperties = ['nome', 'codigo', 'unidadeMedida', 'descricao', 'precoUnitario', 'fabricante', 'modelo', 'ativo'];
    const invalidProperties = Object.keys(input).filter(
        prop => !allowedProperties.includes(prop)
    );

    if (invalidProperties.length > 0) {
        throw new BadRequestException(
            `Propriedades inválidas para atualização: ${invalidProperties.join(', ')}. ` +
            `Apenas estas propriedades podem ser atualizadas: ${allowedProperties.join(', ')}`
        );
    }

    // Obtém o material existente
    const materialExistente = await this.findOne(id);
    if (!materialExistente) {
        throw new NotFoundException('Material não encontrado');
    }

    // Verifica se há alterações nos valores
    const hasChanges = Object.keys(input).some(key => {
        const inputValue = input[key];
        const currentValue = materialExistente[key];
        return inputValue !== undefined && inputValue !== currentValue;
    });

    if (!hasChanges) {
        throw new BadRequestException('Nenhuma alteração fornecida em relação aos dados atuais');
    }

    // Validações específicas para cada campo
    if (input.nome !== undefined) {
        if (input.nome === materialExistente.nome) {
            throw new BadRequestException('O nome fornecido é igual ao atual');
        }
        if (!input.nome.trim()) {
            throw new BadRequestException('Nome não pode ser vazio');
        }
    }

    if (input.codigo !== undefined) {
        if (input.codigo === materialExistente.codigo) {
            throw new BadRequestException('O código fornecido é igual ao atual');
        }
        const existing = await this.materialRepository.findByCodigo(input.codigo);
        if (existing) {
            throw new ConflictException('Código já está em uso');
        }
    }

    if (input.precoUnitario !== undefined) {
        if (input.precoUnitario <= 0) {
            throw new BadRequestException('Preço unitário deve ser maior que zero');
        }
    }

    if (input.unidadeMedida !== undefined && !input.unidadeMedida.trim()) {
        throw new BadRequestException('Unidade de medida não pode ser vazia');
    }

    try {
        const [affectedRows] = await this.materialRepository.update(id, input);
        if (affectedRows === 0) {
            throw new NotFoundException('Material não encontrado para atualização');
        }
        return this.findOne(id); // Retorna o material atualizado
    } catch (error) {
        throw new InternalServerErrorException('Falha ao atualizar material');
    }
  }

  async remove(id: number): Promise<void> {
    // const countVinculos = await this.materialRepository.countVinculos(id);
    // if (countVinculos > 0) {
    //   throw new ConflictException(
    //     `Material está vinculado a ${countVinculos} obra(s)`
    //   );
    // }

    try {
      const deleted = await this.materialRepository.delete(id);
      if (deleted === 0) {
        throw new NotFoundException('Material não encontrado para exclusão');
      }
    } catch (error) {
      throw new InternalServerErrorException('Falha ao remover material');
    }
  }

  // ============ MÉTODOS AUXILIARES PRIVADOS ============

  private validarId(id: number): void {
      if (!id || id <= 0) {
          throw new BadRequestException('ID inválido.');
      }
  }
}