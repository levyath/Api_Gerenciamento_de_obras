import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { EnderecosService } from './enderecos.service';
import { Endereco } from './entities/endereco.entity';


@Controller('enderecos')
export class EnderecosController {
  constructor(private readonly enderecosService: EnderecosService) {}

  @Get()
  async findAll(): Promise<Endereco[]> {
    return this.enderecosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Endereco> {
    const endereco = await this.enderecosService.findOne(id);
    if (!endereco) {
      throw new NotFoundException(`Endereço com id ${id} não encontrado.`);
    }
    return endereco;
  }

  @Post()
  async create(@Body() data: Endereco): Promise<Endereco> {
    return this.enderecosService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Endereco>,
  ): Promise<Endereco> {
    const updated = await this.enderecosService.update(id, data);
    if (!updated) {
      throw new NotFoundException(`Endereço com id ${id} não encontrado.`);
    }
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    const deleted = await this.enderecosService.remove(id);
    if (!deleted) {
      throw new NotFoundException(`Endereço com id ${id} não encontrado.`);
    }
    return { message: `Endereço com id ${id} removido com sucesso.` };
  }
}
