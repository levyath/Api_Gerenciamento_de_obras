import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { ResponsavelTecnico } from './entities/responsavel-tecnico.entity';
import { ResponsaveisTecnicosRepository } from './responsaveis-tecnicos.repository';

@Injectable()
export class ResponsaveisTecnicosService 
{
    constructor(
        private readonly responsaveisTecnicosRepository: ResponsaveisTecnicosRepository,
    ) {}

    async findAll(): Promise<ResponsavelTecnico[]> 
    {
        return this.responsaveisTecnicosRepository.findAll();
    }

    async findOne(id: number): Promise<ResponsavelTecnico> 
    {
        this.validarId(id);
        const responsavel = await this.obterResponsavelPorId(id);
        return responsavel;
    }


    // ============ MÉTODOS AUXILIARES PRIVADOS ============

    private validarId(id: number): void {
        if (!id || id <= 0) {
            throw new BadRequestException('ID inválido.');
        }
    }

    private async obterResponsavelPorId(id: number): Promise<ResponsavelTecnico> {
        const responsavel = await this.responsaveisTecnicosRepository.findById(id);
        if (!responsavel) {
            throw new NotFoundException(`Responsável técnico com id ${id} não encontrado.`);
        }
        return responsavel;
    }
}