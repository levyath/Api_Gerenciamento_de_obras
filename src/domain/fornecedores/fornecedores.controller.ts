import { Controller, Get, Post, Body, Patch, Put, Param, Delete, BadRequestException } from '@nestjs/common';
import { FornecedoresService } from './fornecedores.service';
import { Fornecedores } from './entities/fornecedores.entity';
import { CreateFornecedoreDto } from './dto/create-fornecedores.dto';

@Controller('fornecedores')
export class FornecedoresController {
  constructor(private readonly fornecedoresService: FornecedoresService) {}

  @Get()
  async findAll(): Promise<Fornecedores[]> {
    try {
      return this.fornecedoresService.findAll();
    } catch (error) {
      throw new BadRequestException('Erro ao listar fornecedores: ' + error.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Fornecedores | null> {
    try {
      return this.fornecedoresService.findOne(id);
    } catch (error) {
      throw new BadRequestException('Erro ao visualizar fornecedor: ' + error.message);
    }
  }

  @Post()
  async create(@Body() fornecedores: CreateFornecedoreDto): Promise<Fornecedores | null> {
    try {
      return this.fornecedoresService.create(fornecedores);
    } catch (error) {
      throw new BadRequestException('Erro ao criar fornecedor: ' + error.message);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number, @Body() fornecedores: CreateFornecedoreDto): Promise<Fornecedores | null> {
    try {
      return this.fornecedoresService.update(id, fornecedores);
    } catch (error) {
      throw new BadRequestException('Erro ao atualizar fornecedor: ' + error.message);
    }
  }

  @Patch(':id')
  async updateActive(@Param('id') id: number, @Body('ativo') ativo: boolean): Promise<Fornecedores | null> {
    try {
      return this.fornecedoresService.updateActive(id, ativo);
    } catch (error) {
      throw new BadRequestException('Erro ao atualizar o estado do fornecedor: ' + error.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    try {
    return this.fornecedoresService.remove(id);
      } catch (error) {
      throw new BadRequestException('Erro ao deletar fornecedor: ' + error.message);
    }
  }

  @Get('obras/:id')
  async findSuppliersByObra(@Param('id') id: number) {
    try {
      return this.fornecedoresService.findSuppliersByObra(id);
    } catch (error) {
      throw new BadRequestException('Erro ao visualizar fornecedores da obra: ' + error.message);
    }
  }
}
