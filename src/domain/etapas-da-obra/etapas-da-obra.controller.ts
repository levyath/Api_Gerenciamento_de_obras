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
import { EtapasDaObraService } from './etapas-da-obra.service';
import { CreateEtapasDaObraDto } from './dto/create-etapas-da-obra.dto';
import { UpdateEtapasDaObraDto } from './dto/update-etapas-da-obra.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { EtapasDaObra } from './entities/etapas-da-obra.entity';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@ApiTags('Etapas da Obra')
@Controller('obras/:idObra/etapas')
export class EtapasDaObraController {
  constructor(private readonly etapaObraService: EtapasDaObraService) {}

  @Post()
  @ApiOperation({ summary: 'Criar nova etapa da obra', description: 'Registra uma nova etapa para a obra especificada' })
  @HttpCode(201)
  @ApiResponse({ status: 201, description: 'Etapa criada com sucesso', type: EtapasDaObra })
  @ApiBadRequestResponse({ description: 'Dados inválidos ou erro na criação' })
  async create(
    @Param('idObra', ParseIntPipe) idObra: number,
    @Body() dto: CreateEtapasDaObraDto,
  ) {
    try {
      return await this.etapaObraService.create({ ...dto, obraId: idObra });
    } catch (error) {
      throw new NotFoundException(`Erro ao criar etapa da obra: ${error.message}`);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Listar etapas da obra', description: 'Retorna todas as etapas associadas à obra especificada' })
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'Lista de etapas retornada com sucesso', type: [EtapasDaObra] })
  @ApiBadRequestResponse({ description: 'Erro ao buscar etapas' })
  async findAll(@Param('idObra', ParseIntPipe) idObra: number) {
    try {
      return await this.etapaObraService.findAllByObra(idObra);
    } catch (error) {
      throw new NotFoundException(`Erro ao buscar etapas da obra: ${error.message}`);
    }
  }

  @Get(':etapaId')
  @ApiOperation({ summary: 'Obter etapa específica', description: 'Retorna uma etapa da obra específica pelo seu ID' })
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'Etapa retornada com sucesso', type: EtapasDaObra })
  @ApiNotFoundResponse({ description: 'Etapa não encontrada' })
  async findOne(
    @Param('idObra', ParseIntPipe) idObra: number,
    @Param('etapaId', ParseIntPipe) etapaId: number,
  ) {
    try {
      return await this.etapaObraService.findById(etapaId, idObra);
    } catch (error) {
      throw new NotFoundException(`Erro ao buscar etapa da obra: ${error.message}`);
    }
  }

  @Put(':etapaId')
  @HttpCode(204)
  @ApiOperation({ summary: 'Atualizar etapa da obra', description: 'Atualiza os dados de uma etapa existente' })
  @ApiResponse({ status: 204, description: 'Etapa atualizada com sucesso' })
  @ApiBadRequestResponse({ description: 'Dados inválidos ou erro na atualização' })
  @ApiNotFoundResponse({ description: 'Etapa não encontrada' })
  async update(
    @Param('idObra', ParseIntPipe) idObra: number,
    @Param('etapaId', ParseIntPipe) etapaId: number,
    @Body() dto: UpdateEtapasDaObraDto,
  ) {
    try {
      await this.etapaObraService.update(etapaId, dto, idObra);
    } catch (error) {
      throw new NotFoundException(`Erro ao atualizar etapa da obra: ${error.message}`);
    }
  }

  @Delete(':etapaId')
  @HttpCode(204)
  @ApiOperation({ summary: 'Remover etapa da obra', description: 'Remove permanentemente uma etapa da obra' })
  @ApiResponse({ status: 204, description: 'Etapa removida com sucesso' })
  @ApiNotFoundResponse({ description: 'Etapa não encontrada' })
  async remove(
    @Param('idObra', ParseIntPipe) idObra: number,
    @Param('etapaId', ParseIntPipe) etapaId: number,
  ) {
    try {
      await this.etapaObraService.remove(etapaId, idObra);
    } catch (error) {
      throw new NotFoundException(`Erro ao remover etapa da obra: ${error.message}`);
    }
  }
}