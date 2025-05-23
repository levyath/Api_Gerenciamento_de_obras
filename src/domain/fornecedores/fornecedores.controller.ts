import { Controller, Get, Post, Body, Patch, Put, Param, Delete } from '@nestjs/common';
import { FornecedoresService } from './fornecedores.service';
import { Fornecedores } from './entities/fornecedores.entity';
import { CreateFornecedoreDto } from './dto/create-fornecedores.dto';

@Controller('fornecedores')
export class FornecedoresController {
  constructor(private readonly fornecedoresService: FornecedoresService) {}

  @Get()
  findAll(): Promise<Fornecedores[]> {
    return this.fornecedoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Fornecedores | null> {
    return this.fornecedoresService.findOne(id);
  }

  @Post()
  create(@Body() fornecedores: CreateFornecedoreDto): Promise<Fornecedores | null> {
    return this.fornecedoresService.create(fornecedores);
  }

  @Put(':id')
  update(
    @Param('id') id: number, @Body() fornecedores: CreateFornecedoreDto): Promise<Fornecedores | null> {
    return this.fornecedoresService.update(id, fornecedores);
  }

  @Patch(':id')
  updateActive(@Param('id') id: number, @Body('ativo') ativo: boolean): Promise<Fornecedores | null> {
    return this.fornecedoresService.updateActive(id, ativo);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.fornecedoresService.remove(id);
  }

  @Get('obras/:id')
  async findSuppliersByObra(@Param('id') id: number) {
    return this.fornecedoresService.findSuppliersByObra(id);
  }
}
