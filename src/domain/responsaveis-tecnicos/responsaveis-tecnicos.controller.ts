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
import { CreateResponsavelTecnicoDto } from './dto/create-responsavel-tecnico.dto';
import { UpdateResponsavelTecnicoDto } from './dto/update-responsavel-tecnico.dto';

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

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um responsável técnico por ID' })
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'Responsável técnico encontrado com sucesso.', type: ResponsavelTecnico })
  @ApiBadRequestResponse({ description: 'ID inválido fornecido.' })
  @ApiNotFoundResponse({ description: 'Responsável técnico não encontrado.' })
  async findOne(@Param('id') id: number): Promise<ResponsavelTecnico> 
  {
    return await this.responsavelTecnicoService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar um novo responsável técnico' })
  @ApiResponse({ status: 201, description: 'Responsável técnico criado com sucesso.', type: ResponsavelTecnico })
  @ApiBadRequestResponse({ description: 'Dados obrigatórios ausentes ou CPF inválido.' })
  @ApiConflictResponse({ description: 'CPF já cadastrado no sistema.' })
  @ApiBody({ type: CreateResponsavelTecnicoDto, description: 'Dados do responsável técnico a ser criado' })
  async create(@Body() dto: CreateResponsavelTecnicoDto): Promise<ResponsavelTecnico> 
  {
    return await this.responsavelTecnicoService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um responsável técnico existente' })
  @HttpCode(204)
  @ApiResponse({ status: 204, description: 'Responsável técnico atualizado com sucesso.' })
  @ApiBadRequestResponse({ description: 'ID inválido ou CPF com formato incorreto.' })
  @ApiNotFoundResponse({ description: 'Responsável técnico não encontrado.' })
  @ApiConflictResponse({ description: 'Já existe um responsável técnico com este CPF.' })
  @ApiBody({ type: UpdateResponsavelTecnicoDto, description: 'Dados atualizados do responsável técnico' })
  async update(@Param('id') id: number, @Body() dto: UpdateResponsavelTecnicoDto ): Promise<void> 
  {
    await this.responsavelTecnicoService.update(id, dto);
  }
}