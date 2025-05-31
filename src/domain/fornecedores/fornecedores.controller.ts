import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { FornecedoresService } from './fornecedores.service';
import { Fornecedores } from './entities/fornecedores.entity';
import { CreateFornecedoresDto } from './dto/create-fornecedores.dto';
import { UpdateFornecedoresDto } from './dto/update-fornecedores.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiNotFoundResponse,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Fornecedores')
@Controller('fornecedores')
export class FornecedoresController {
  constructor(private readonly fornecedoresService: FornecedoresService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os fornecedores' })
  @ApiResponse({ status: 200, description: 'Lista de fornecedores retornada com sucesso.', type: [Fornecedores] })
  async findAll(): Promise<Fornecedores[]> {
    return this.fornecedoresService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar fornecedor por ID' })
  @ApiResponse({ status: 200, description: 'Fornecedor encontrado.', type: Fornecedores })
  @ApiNotFoundResponse({ description: 'Fornecedor não encontrado.' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Fornecedores> {
    const fornecedores = await this.fornecedoresService.findOne(id);
    if (!fornecedores) {
      throw new NotFoundException(`Fornecedor com id ${id} não encontrado.`);
    }
    return fornecedores;
  }

  @Post()
  @ApiOperation({ summary: 'Criar um novo fornecedor' })
  @ApiResponse({ status: 201, description: 'Fornecedor criado com sucesso.', type: Fornecedores })
  @ApiBody({ type: CreateFornecedoresDto })
  async create(@Body() data: CreateFornecedoresDto): Promise<Fornecedores> {
    return this.fornecedoresService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar fornecedor existente' })
  @ApiResponse({ status: 200, description: 'Fornecedor atualizado com sucesso.', type: Fornecedores })
  @ApiNotFoundResponse({ description: 'Fornecedor não encontrado.' })
  @ApiBody({ type: UpdateFornecedoresDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<UpdateFornecedoresDto>,
  ): Promise<Fornecedores> {
    const updated = await this.fornecedoresService.update(id, data);
    if (!updated) {
      throw new NotFoundException(`Fornecedor com id ${id} não encontrado.`);
    }
    return updated;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover fornecedor por ID' })
  @ApiResponse({ status: 200, description: 'Fornecedor removido com sucesso.' })
  @ApiNotFoundResponse({ description: 'Fornecedor não encontrado.' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    const deleted = await this.fornecedoresService.remove(id);
    if (!deleted) {
      throw new NotFoundException(`Fornecedor com id ${id} não encontrado.`);
    }
    return { message: `Fornecedor com id ${id} removido com sucesso.` };
  }
}
