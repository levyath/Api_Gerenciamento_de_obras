import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
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
    try {
      return await this.fornecedoresService.findAll();
    } catch (error) {
      throw new BadRequestException('Erro ao listar fornecedores: ' + error.message);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar fornecedor por ID' })
  @ApiResponse({ status: 200, description: 'Fornecedor encontrado.', type: Fornecedores })
  @ApiNotFoundResponse({ description: 'Fornecedor não encontrado.' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Fornecedores | null> {
    try {
      return await this.fornecedoresService.findOne(id);
    } catch (error) {
      throw new BadRequestException('Erro ao buscar fornecedor: ' + error.message);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Criar um novo fornecedor' })
  @ApiResponse({ status: 201, description: 'Fornecedor criado com sucesso.', type: Fornecedores })
  @ApiBody({ type: CreateFornecedoresDto })
  async create(@Body() data: CreateFornecedoresDto): Promise<Fornecedores> {
    try {
      return await this.fornecedoresService.create(data);
    } catch (error) {
      throw new BadRequestException('Erro ao criar fornecedor: ' + error.message);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar fornecedor existente' })
  @ApiResponse({ status: 200, description: 'Fornecedor atualizado com sucesso.', type: Fornecedores })
  @ApiNotFoundResponse({ description: 'Fornecedor não encontrado.' })
  @ApiBody({ type: UpdateFornecedoresDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<UpdateFornecedoresDto>,
  ): Promise<Fornecedores | null> {
    try {
      return await this.fornecedoresService.update(id, data);
    } catch (error) {
      throw new BadRequestException('Erro ao atualizar fornecedor: ' + error.message);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover fornecedor por ID' })
  @ApiResponse({ status: 200, description: 'Fornecedor removido com sucesso.' })
  @ApiNotFoundResponse({ description: 'Fornecedor não encontrado.' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    try {
      await this.fornecedoresService.remove(id);
      return { message: `Fornecedor com id ${id} removido com sucesso.` };
    } catch (error) {
      throw new BadRequestException('Erro ao remover fornecedor: ' + error.message);
    }
  }
}