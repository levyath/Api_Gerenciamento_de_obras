import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ObrasService } from './obras.service';
import { Obra } from './entities/obra.entity';


@Controller('obras')
export class ObrasController {
  constructor(private readonly obraService: ObrasService) {}
  @Get()
  findAll(): any{
    return this.obraService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Obra> {
    return this.obraService.findOne(id);
  }

  @Post()
  create(@Body() obra: Obra): Promise<Obra> {
    return this.obraService.create(obra);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() obra: Partial<Obra>): Promise<Obra> {''
    return this.obraService.update(id, obra);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.obraService.remove(id);
  }
}