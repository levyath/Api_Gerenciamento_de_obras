import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { ObrasService } from './obras.service';
import { Obras } from './entities/obras.entity';




@Controller('obras')
export class ObrasController {
  constructor(private readonly obrasService: ObrasService) {}

  @Get()
  async findAll(): Promise<Obras[]> {
    return this.obrasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Obras> {
    const obras = await this.obrasService.findOne(id);
    if (!obras) {
      throw new NotFoundException(`Obras com id ${id} não encontrado.`);
    }
    return obras;
  }

  @Post()
  async create(@Body() data: Obras): Promise<Obras> {
    return this.obrasService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Obras>,
  ): Promise<Obras> {
    const updated = await this.obrasService.update(id, data);
    if (!updated) {
      throw new NotFoundException(`Obras com id ${id} não encontrado.`);
    }
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    const deleted = await this.obrasService.remove(id);
    if (!deleted) {
      throw new NotFoundException(`Obras com id ${id} não encontrado.`);
    }
    return { message: `Obras com id ${id} removido com sucesso.` };
  }
}
