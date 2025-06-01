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
  BadRequestException,
} from '@nestjs/common';
import { EtapasDaObraService } from './etapas-da-obra.service';
import { CreateEtapasDaObraDto } from './dto/create-etapas-da-obra.dto';
import { UpdateEtapasDaObraDto } from './dto/update-etapas-da-obra.dto';

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
      throw new BadRequestException(
        `Erro ao criar etapa da obra: ${error.message}`,
      );
    }
  }

  @Get()
  async findAll(@Param('idObra', ParseIntPipe) idObra: number) {
    try {
      return await this.etapaObraService.findAllByObra(idObra);
    } catch (error) {
      throw new BadRequestException(
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
      return await this.etapaObraService.findById(etapaId);
    } catch (error) {
      throw new BadRequestException(
        `Erro ao buscar etapa da obra: ${error.message}`,
      );
    }
  }

  @Put(':etapaId')
  async update(
    @Param('idObra', ParseIntPipe) idObra: number,
    @Param('etapaId', ParseIntPipe) etapaId: number,
    @Body() dto: UpdateEtapasDaObraDto,
  ) {
    try {
      return await this.etapaObraService.update(etapaId, dto);
    } catch (error) {
      throw new BadRequestException(
        `Erro ao atualizar etapa da obra: ${error.message}`,
      );
    }
  }

  @Delete(':etapaId')
  async remove(
    @Param('idObra', ParseIntPipe) idObra: number,
    @Param('etapaId', ParseIntPipe) etapaId: number,
  ) {
    try {
      return await this.etapaObraService.remove(etapaId);
    } catch (error) {
      throw new BadRequestException(
        `Erro ao remover etapa da obra: ${error.message}`,
      );
    }
  }
}
