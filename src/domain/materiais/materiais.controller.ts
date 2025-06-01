import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiConflictResponse, ApiBody } from '@nestjs/swagger';
import { MateriaisService } from './materiais.service';
import { CreateMaterialDto } from './dto/create-material.dto';

@ApiTags('Materiais')
@Controller('materiais')
export class MateriaisController {
  constructor(private readonly materiaisService: MateriaisService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo material' })
  @ApiResponse({ status: 201, description: 'Material criado com sucesso.' })
  @ApiBadRequestResponse({ description: 'Dados inválidos ou incompletos.' })
  @ApiConflictResponse({ description: 'Material com este nome/código já existe.' })
  async create(@Body() dto: CreateMaterialDto) 
  {
    return this.materiaisService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os materiais' })
  @ApiResponse({ status: 200, description: 'Lista de materiais retornada com sucesso.' })
  async findAll() 
  {
    return this.materiaisService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um material por ID' })
  @ApiResponse({ status: 200, description: 'Material encontrado com sucesso.' })
  @ApiNotFoundResponse({ description: 'Material não encontrado.' })
  async findOne(@Param('id') id: number) 
  {
    return this.materiaisService.findOne(id);
  }
}