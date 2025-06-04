/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  NotFoundException,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { CreateDiarioDeObraDto } from './dto/create-diario-de-obra.dto';
import { DiarioDeObraService } from './diario-de-obra.service';
import { UpdateDiarioDeObraDto } from './dto/update-diario-de-obra.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiNotFoundResponse,
  ApiBody,
  ApiBadRequestResponse,
  ApiBearerAuth
} from '@nestjs/swagger';
import { DiarioDeObra } from './entities/diario-de-obra.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@ApiTags('Diarios de Obra')
@Controller('obras/:idObra/diarios')
export class DiarioDeObraController {
  constructor(private readonly diarioDeObraService: DiarioDeObraService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo diário de obra', description: 'Registra um novo diário de obra para a obra especificada' })
  @HttpCode(201)
  @ApiResponse({ status: 201, description: 'Diário de obra criado com sucesso', type: DiarioDeObra })
  @ApiBadRequestResponse({ description: 'Dados inválidos ou erro na criação' })
  @ApiNotFoundResponse({ description: 'Obra não encontrada' })
  async create(@Param('idObra', ParseIntPipe) idObra: number, @Body() dto: CreateDiarioDeObraDto )
  {
    try {
      return await this.diarioDeObraService.create({ ...dto, obraId: idObra });
    } catch (error) {
      throw new NotFoundException(
        `Erro ao criar diário de obra: ${error.message}`,
      );
    }
  }

  @Get()
  @ApiOperation({ summary: 'Listar diários de obra', description: 'Retorna todos os diários de obra associados à obra especificada' })
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'Lista de diários de obra retornada com sucesso', type: [DiarioDeObra] })
  @ApiBadRequestResponse({ description: 'Erro ao buscar diários' })
  async findAll(@Param('idObra', ParseIntPipe) idObra: number) 
  {
    try {
      return await this.diarioDeObraService.findAllByObra(idObra);
    } catch (error) {
      throw new NotFoundException(
        `Erro ao buscar diários de obra: ${error.message}`,
      );
    }
  }

  @Get(':diarioId')
  @ApiOperation({ summary: 'Obter diário específico', description: 'Retorna um diário de obra específico pelo seu ID' })
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'Diário de obra retornado com sucesso', type: DiarioDeObra })
  @ApiNotFoundResponse({ description: 'Diário não encontrado' })
  async findOne(@Param('idObra', ParseIntPipe) idObra: number, @Param('diarioId', ParseIntPipe) diarioId: number )
  {
    try {
      return await this.diarioDeObraService.findById(diarioId, idObra);
    } catch (error) {
      throw new NotFoundException(
        `Erro ao buscar diário de obra: ${error.message}`,
      );
    }
  }

  @Put(':diarioId')
  @HttpCode(204)
  @ApiOperation({ summary: 'Atualizar diário de obra', description: 'Atualiza os dados de um diário de obra existente' })
  @ApiResponse({ status: 204, description: 'Diário atualizado com sucesso', type: DiarioDeObra })
  @ApiBadRequestResponse({ description: 'Dados inválidos ou erro na atualização' })
  @ApiNotFoundResponse({ description: 'Diário não encontrado' })
  async update(
    @Param('idObra', ParseIntPipe) idObra: number,
    @Param('diarioId', ParseIntPipe) diarioId: number,
    @Body() dto: UpdateDiarioDeObraDto,
  ) {
    try {
      await this.diarioDeObraService.update(diarioId, dto, idObra);
    } catch (error: any) {
      throw new NotFoundException(
        `Erro ao atualizar diário de obra: ${error.message}`,
      );
    }
  } 

  @Delete(':diarioId')
  @HttpCode(204)
  @ApiOperation({ summary: 'Remover diário de obra', description: 'Remove permanentemente um diário de obra' })
  @ApiResponse({ status: 204, description: 'Diário removido com sucesso' })
  @ApiNotFoundResponse({ description: 'Diário não encontrado' })
  async remove(@Param('idObra', ParseIntPipe) idObra: number, @Param('diarioId', ParseIntPipe) diarioId: number ) {
    try {
      return await this.diarioDeObraService.remove(diarioId, idObra);
    } catch (error) {
      throw new NotFoundException(
        `Erro ao remover diário de obra: ${error.message}`,
      );
    }
  }
}
