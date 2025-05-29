import { Controller, Get, Post, Body, Put, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { EquipamentosService } from './equipamentos.service';
import { Equipamentos } from './entities/equipamento.model';
import { CreateEquipamentoDto } from './dto/create-equipamento.dto';

@Controller('equipamentos')
export class EquipamentosController {
  constructor(private readonly equipamentosService: EquipamentosService) {}

  @Post()
  async create(@Body() equipamentos: CreateEquipamentoDto): Promise<Equipamentos | null> {
    try {
      return this.equipamentosService.create(equipamentos);
    } catch (error) {
      throw new BadRequestException('Erro ao criar equipamento: ' + error.message);
    }
  }  

  @Get()
  async findAll(): Promise<Equipamentos[]> {
    try {
      return this.equipamentosService.findAll();
    } catch (error) {
      throw new BadRequestException('Erro ao listar equipamentos: ' + error.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Equipamentos | null> {
    try {
      return this.equipamentosService.findOne(+id);
    } catch (error) {
      throw new BadRequestException('Erro ao visualizar equipamento: ' + error.message);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number, 
    @Body() equipamentos: CreateEquipamentoDto
  ): Promise<Equipamentos | null> {
    try {
      return this.equipamentosService.update(id, equipamentos);
    } catch (error) {
      throw new BadRequestException('Erro ao atualizar equipamento: ' + error.message);
    }
  }

  @Patch(':id')
  async updateObras(
    @Param('id') id: number,
    @Body('obras') obras: number[]
  ): Promise<Equipamentos | null> {
    try {
      return this.equipamentosService.updateObras(+id, obras);
    } catch (error) {
      throw new BadRequestException('Erro ao atualizar obras do equipamento: ' + error.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      return this.equipamentosService.remove(+id);
    } catch (error) {
      throw new BadRequestException('Erro ao deletar equipamento: ' + error.message);
    }
  }

  @Get('obras/:id')
  async findEquipamentosByObra(@Param('id') id: number) {
    try {
      return this.equipamentosService.getEquipamentosByObraId(id);
    } catch (error) {
      throw new BadRequestException('Erro ao visualizar equipamentos da obra: ' + error.message);
    }
  }
}
