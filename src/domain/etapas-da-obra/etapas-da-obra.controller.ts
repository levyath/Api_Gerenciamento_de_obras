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
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('obras/:idObra/etapas')
export class EtapasDaObraController {
  constructor(private readonly etapaObraService: EtapasDaObraService) {}

  @Post()
  async create(
    @Param('idObra', ParseIntPipe) idObra: number,
    @Body() dto: CreateEtapasDaObraDto,
  ) {
    try {
      return await this.etapaObraService.create({ ...dto, obraId: idObra });
    } catch (error) {
      throw new NotFoundException(
        `Erro ao criar etapa da obra: ${error.message}`,
      );
    }
  }

  @Get()
  async findAll(@Param('idObra', ParseIntPipe) idObra: number) {
    try {
      return await this.etapaObraService.findAllByObra(idObra);
    } catch (error) {
      throw new NotFoundException(
        `Erro ao buscar etapas da obra: ${error.message}`,
      );
    }
  }

  @Get(':etapaId')
  async findOne(
    @Param('idObra', ParseIntPipe) idObra: number,
    @Param('etapaId', ParseIntPipe) etapaId: number,
  ) {
    try {
      return await this.etapaObraService.findById(etapaId, idObra);
    } catch (error) {
      throw new NotFoundException(
        `Erro ao buscar etapa da obra: ${error.message}`,
      );
    }
  }

  @Put(':etapaId')
  @HttpCode(204)
  async update(
    @Param('idObra', ParseIntPipe) idObra: number,
    @Param('etapaId', ParseIntPipe) etapaId: number,
    @Body() dto: UpdateEtapasDaObraDto,
  ) {
    try {
      return await this.etapaObraService.update(etapaId, dto, idObra);
    } catch (error) {
      throw new NotFoundException(
        `Erro ao atualizar etapa da obra: ${error.message}`,
      );
    }
  }

  @HttpCode(204)
  @Delete(':etapaId')
  async remove(
    @Param('idObra', ParseIntPipe) idObra: number,
    @Param('etapaId', ParseIntPipe) etapaId: number,
  ) {
    try {
      return await this.etapaObraService.remove(etapaId, idObra);
    } catch (error) {
      throw new NotFoundException(
        `Erro ao remover etapa da obra: ${error.message}`,
      );
    }
  }
}
