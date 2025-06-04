import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiConflictResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { MateriaisService } from './materiais.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@ApiTags('Materiais')
@Controller('materiais')
export class MateriaisController {
  constructor(private readonly materiaisService: MateriaisService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo material' })
  @HttpCode(201)
  @ApiResponse({ status: 201, description: 'Material criado com sucesso.' })
  @ApiBadRequestResponse({ description: 'Dados inválidos ou incompletos.' })
  @ApiConflictResponse({ description: 'Material com este nome/código já existe.' })
  async create(@Body() dto: CreateMaterialDto) 
  {
    return this.materiaisService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os materiais' })
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'Lista de materiais retornada com sucesso.' })
  async findAll() 
  {
    return this.materiaisService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um material por ID' })
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'Material encontrado com sucesso.' })
  @ApiNotFoundResponse({ description: 'Material não encontrado.' })
  async findOne(@Param('id') id: number) 
  {
    return this.materiaisService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um material existente' })
  @HttpCode(204)
  @ApiResponse({ status: 204, description: 'Material atualizado com sucesso.' })
  @ApiBadRequestResponse({ description: 'Dados inválidos ou nenhuma alteração fornecida.' })
  @ApiNotFoundResponse({ description: 'Material não encontrado.' })
  @ApiConflictResponse({ description: 'Novo nome/código já está em uso.' })
  async update(@Param('id') id: number, @Body() dto: UpdateMaterialDto ): Promise<void> 
  {
    await this.materiaisService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um material' })
  @HttpCode(204)
  @ApiResponse({ status: 204, description: 'Material removido com sucesso.' })
  @ApiNotFoundResponse({ description: 'Material não encontrado.' })
  @ApiConflictResponse({ description: 'Material está vinculado a obras e não pode ser removido.' })
  async remove(@Param('id') id: number): Promise<void> 
  {
    await this.materiaisService.remove(id);
  }
}