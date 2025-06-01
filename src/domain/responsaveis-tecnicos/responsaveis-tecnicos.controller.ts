import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, NotFoundException } from '@nestjs/common';
import { ResponsaveisTecnicosService } from './responsaveis-tecnicos.service';
import { ResponsavelTecnico } from './entities/responsavel-tecnico.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiBody,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

@ApiTags('Responsaveis Tecnicos')
@Controller('responsaveis-tecnicos')
export class ResponsaveisTecnicosController 
{
  constructor(private readonly responsavelTecnicoService: ResponsaveisTecnicosService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os responsáveis técnicos' })
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'Lista de responsáveis técnicos retornada com sucesso.', type: [ResponsavelTecnico] })
  async findAll(): Promise<ResponsavelTecnico[]> 
  {
    return await this.responsavelTecnicoService.findAll();
  }
}