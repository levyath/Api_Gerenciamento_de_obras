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
  HttpCode,
  UseGuards,
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
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@ApiTags('Equipamentos')
@Controller('equipamentos')
export class EquipamentosController {
  constructor(private readonly equipamentosService: EquipamentosService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os equipamentos' })
  @HttpCode(200)
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
  @HttpCode(200)
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
  @HttpCode(201)
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
  @HttpCode(204)
  @ApiResponse({ status: 204, description: 'Equipamento atualizado com sucesso.', type: Equipamentos })
  @ApiNotFoundResponse({ description: 'Equipamento não encontrado.' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<UpdateEquipamentoDto>,
  ): Promise<void> {
    try {
      await this.equipamentosService.update(id, data);
    } catch (error) {
      throw new BadRequestException('Erro ao atualizar equipamento: ' + error.message);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar as obras associadas a um equipamento' })
  @HttpCode(204)
  @ApiResponse({ status: 204, description: 'Obras do equipamento atualizadas com sucesso.', type: Equipamentos })
  @ApiNotFoundResponse({ description: 'Equipamento não encontrado.' })
  @ApiBody({ schema: { type: 'object', properties: { obras: { type: 'array', items: { type: 'number' } } } } })
  async updateObras(
    @Param('id', ParseIntPipe) id: number,
    @Body('obras') obras: number[]
  ): Promise<void> {
    try {
      await this.equipamentosService.updateObras(id, obras);
    } catch (error) {
      throw new BadRequestException('Erro ao atualizar obras do equipamento: ' + error.message);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover equipamento por ID' })
  @HttpCode(204)
  @ApiResponse({ status: 204, description: 'Equipamento removido com sucesso.' })
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

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@ApiTags('Equipamentos')
@Controller('obras')
export class ObrasEquipamentoController {
  constructor(private readonly equipamentosService: EquipamentosService) {}

  @Get(':id/equipamentos')
  @ApiOperation({ summary: 'Listar equipamentos de uma obra pelo ID da obra' })
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'Equipamentos da obra retornados com sucesso.', type: [Equipamentos] })
  async findEquipamentosByObra(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.equipamentosService.getEquipamentosByObraId(id);
    } catch (error) {
      throw new BadRequestException('Erro ao visualizar equipamentos da obra: ' + error.message);
    }
  }
}
