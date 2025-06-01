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
}