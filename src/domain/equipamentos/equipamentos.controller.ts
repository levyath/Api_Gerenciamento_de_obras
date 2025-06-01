import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
  ParseIntPipe,
  BadRequestException,
  Put,
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
    try {
      return await this.equipamentosService.findAll();
    } catch (error) {
      throw new BadRequestException('Erro ao listar equipamentos: ' + error.message);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar equipamento por ID' })
  @ApiResponse({ status: 200, description: 'Equipamento encontrado.', type: Equipamentos })
  @ApiNotFoundResponse({ description: 'Equipamento não encontrado.' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Equipamentos | null> {
    try {
      return await this.equipamentosService.findOne(id);
    } catch (error) {
      throw new BadRequestException('Erro ao buscar equipamento: ' + error.message);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Criar um novo equipamento' })
  @ApiResponse({ status: 201, description: 'Equipamento criado com sucesso.', type: Equipamentos })
  @ApiBody({ type: CreateEquipamentoDto })
  async create(@Body() equipamentos: CreateEquipamentoDto): Promise<Equipamentos> {
    try {
      return await this.equipamentosService.create(equipamentos);
    } catch (error) {
      throw new BadRequestException('Erro ao criar equipamento: ' + error.message);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um equipamento existente' })
  @ApiResponse({ status: 200, description: 'Equipamento atualizado com sucesso.', type: Equipamentos })
  @ApiNotFoundResponse({ description: 'Equipamento não encontrado.' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<UpdateEquipamentoDto>,
  ): Promise<Equipamentos | null> {
    try {
      return this.equipamentosService.update(id, data);
    } catch (error) {
      throw new BadRequestException('Erro ao atualizar equipamento: ' + error.message);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar as obras associadas a um equipamento' })
  @ApiResponse({ status: 200, description: 'Obras do equipamento atualizadas com sucesso.', type: Equipamentos })
  @ApiNotFoundResponse({ description: 'Equipamento não encontrado.' })
  @ApiBody({ schema: { type: 'object', properties: { obras: { type: 'array', items: { type: 'number' } } } } })
  async updateObras(
    @Param('id', ParseIntPipe) id: number,
    @Body('obras') obras: number[]
  ): Promise<Equipamentos | null> {
    try {
      return await this.equipamentosService.updateObras(id, obras);
    } catch (error) {
      throw new BadRequestException('Erro ao atualizar obras do equipamento: ' + error.message);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover equipamento por ID' })
  @ApiResponse({ status: 200, description: 'Equipamento removido com sucesso.' })
  @ApiNotFoundResponse({ description: 'Equipamento não encontrado.' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    try {
      await this.equipamentosService.delete(id);
      return { message: 'Equipamento removido com sucesso.' };
    } catch (error) {
      throw new BadRequestException('Erro ao remover equipamento: ' + error.message);
    }
  }
}

@ApiTags('Equipamentos')
@Controller('obras')
export class ObrasEquipamentoController {
  constructor(private readonly equipamentosService: EquipamentosService) {}

  @Get(':id/equipamentos')
  @ApiOperation({ summary: 'Listar equipamentos de uma obra pelo ID da obra' })
  @ApiResponse({ status: 200, description: 'Equipamentos da obra retornados com sucesso.', type: [Equipamentos] })
  async findEquipamentosByObra(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.equipamentosService.getEquipamentosByObraId(id);
    } catch (error) {
      throw new BadRequestException('Erro ao visualizar equipamentos da obra: ' + error.message);
    }
  }
}
