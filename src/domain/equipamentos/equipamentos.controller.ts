import { Controller, Get, Post, Body, Put, Patch, Param, Delete } from '@nestjs/common';
import { EquipamentosService } from './equipamentos.service';
import { Equipamentos } from './entities/equipamento.entity';
import { CreateEquipamentoDto } from './dto/create-equipamento.dto';

@Controller('equipamentos')
export class EquipamentosController {
  constructor(private readonly equipamentosService: EquipamentosService) {}

  @Post()
  create(@Body() equipamentos: CreateEquipamentoDto) {
    return this.equipamentosService.create(equipamentos);
  }  

  @Get()
  findAll(): Promise<Equipamentos[]> {
    return this.equipamentosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Equipamentos | null> {
    return this.equipamentosService.findOne(+id);
  }

  @Put(':id')
    update(
      @Param('id') id: number, @Body() equipamentos: CreateEquipamentoDto): Promise<Equipamentos | null> {
      return this.equipamentosService.update(id, equipamentos);
    }

  @Patch(':id')
  updateObras(@Param('id') id: number,@Body('obras') obras: number[]): Promise<Equipamentos | null> {
    return this.equipamentosService.updateObras(+id, obras);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.equipamentosService.remove(+id);
  }

  @Get('obras/:id')
    async findEquipamentosByObra(@Param('id') id: number): Promise<Equipamentos[]> {
      return this.equipamentosService.getEquipamentosByObraId(id);
    }
}
