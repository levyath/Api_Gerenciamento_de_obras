import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { EquipamentosService } from './equipamentos.service';
import { CreateEquipamentoDto } from './dto/create-equipamento.dto';
import { UpdateEquipamentoDto } from './dto/update-equipamento.dto';
import { Equipamentos } from './entities/equipamento.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiNotFoundResponse,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Equipamentos')
@Controller('equipamentos')
export class EquipamentosController {
  constructor(private readonly equipamentosService: EquipamentosService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os equipamentos' })
  @ApiResponse({ status: 200, description: 'Lista de equipamentos retornada com sucesso.', type: [Equipamentos] })
  async findAll(): Promise<Equipamentos[]> {
    return this.equipamentosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar equipamento por ID' })
  @ApiResponse({ status: 200, description: 'Equipamento encontrado.', type: Equipamentos })
  @ApiNotFoundResponse({ description: 'Equipamento não encontrado.' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Equipamentos> {
    return this.equipamentosService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar um novo equipamento' })
  @ApiResponse({ status: 201, description: 'Equipamento criado com sucesso.', type: Equipamentos })
  @ApiBody({ type: CreateEquipamentoDto })
  async create(@Body() Equipamentos: CreateEquipamentoDto): Promise<Equipamentos>  {
    return this.equipamentosService.create(Equipamentos);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um equipamento existente' })
  @ApiResponse({ status: 200, description: 'Equipamento atualizado com sucesso.', type: Equipamentos })
  @ApiNotFoundResponse({ description: 'Equipamento não encontrado.' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<UpdateEquipamentoDto>,
  ): Promise<Equipamentos>  {
    return this.equipamentosService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover equipamento por ID' })
  @ApiResponse({ status: 200, description: 'Equipamento removido com sucesso.' })
  @ApiNotFoundResponse({ description: 'Equipamento não encontrado.' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.equipamentosService.delete(id);
  }
}
