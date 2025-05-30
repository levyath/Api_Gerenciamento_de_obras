import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { FornecedoresService } from './fornecedores.service';
import { Fornecedores } from './entities/fornecedores.entity';



@Controller('fornecedores')
export class FornecedoresController {
  constructor(private readonly fornecedoresService: FornecedoresService) {}

  @Get()
  async findAll(): Promise<Fornecedores[]> {
    return this.fornecedoresService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Fornecedores> {
    const fornecedores = await this.fornecedoresService.findOne(id);
    if (!fornecedores) {
      throw new NotFoundException(`Endereço com id ${id} não encontrado.`);
    }
    return fornecedores;
  }

  @Post()
  async create(@Body() data: Fornecedores): Promise<Fornecedores> {
    return this.fornecedoresService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Fornecedores>,
  ): Promise<Fornecedores> {
    const updated = await this.fornecedoresService.update(id, data);
    if (!updated) {
      throw new NotFoundException(`Endereço com id ${id} não encontrado.`);
    }
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    const deleted = await this.fornecedoresService.remove(id);
    if (!deleted) {
      throw new NotFoundException(`Endereço com id ${id} não encontrado.`);
    }
    return { message: `Endereço com id ${id} removido com sucesso.` };
  }
}
