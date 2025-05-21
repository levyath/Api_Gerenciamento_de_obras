import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ObrasService } from './obras.service';
import { Obra } from './entities/obra.entity';
import { CreateObraDto } from './dto/create-obra.dto';

@Controller('obras')
export class ObrasController {
  constructor(private readonly obraService: ObrasService) {}
  @Get()
  findAll(): any{
    return this.obraService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Obra | null> {
    return this.obraService.findOne(id);
  }

  @Get(':id/fornecedores')
  findOneSuppliers(@Param('id') id: number): Promise<Obra | null> {
    return this.obraService.findOneSuppliers(id);
  }

  @Post()
  create(@Body() obra: CreateObraDto): Promise<Obra | null> {
    return this.obraService.create(obra);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() obra: CreateObraDto): Promise<Obra | null> {
    return this.obraService.update(id, obra);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.obraService.remove(id);
  }
}