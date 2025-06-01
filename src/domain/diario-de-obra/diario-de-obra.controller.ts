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
import { CreateDiarioDeObraDto } from './dto/create-diario-de-obra.dto';
import { DiarioDeObraService } from './diario-de-obra.service';
import { UpdateDiarioDeObraDto } from './dto/update-diario-de-obra.dto';

@Controller('obras/:idObra/diarios')
export class DiarioDeObraController {
  constructor(private readonly diarioDeObraService: DiarioDeObraService) {}

  @Post()
  async create(
    @Param('idObra', ParseIntPipe) idObra: number,
    @Body() dto: CreateDiarioDeObraDto,
  ) {
    try {
      return await this.diarioDeObraService.create({ ...dto, obraId: idObra });
    } catch (error) {
      throw new BadRequestException(
        `Erro ao criar diário de obra: ${error.message}`,
      );
    }
  }

  @Get()
  async findAll(@Param('idObra', ParseIntPipe) idObra: number) {
    try {
      return await this.diarioDeObraService.findAllByObra(idObra);
    } catch (error) {
      throw new BadRequestException(
        `Erro ao buscar diários de obra: ${error.message}`,
      );
    }
  }

  @Get(':diarioId')
  async findOne(
    @Param('idObra', ParseIntPipe) idObra: number,
    @Param('diarioId', ParseIntPipe) diarioId: number,
  ) {
    try {
      return await this.diarioDeObraService.findById(diarioId);
    } catch (error) {
      throw new BadRequestException(
        `Erro ao buscar diário de obra: ${error.message}`,
      );
    }
  }

  @Put(':diarioId')
  async update(
    @Param('idObra', ParseIntPipe) idObra: number,
    @Param('diarioId', ParseIntPipe) diarioId: number,
    @Body() dto: UpdateDiarioDeObraDto,
  ) {
    try {
      return await this.diarioDeObraService.update(diarioId, dto);
    } catch (error) {
      throw new BadRequestException(
        `Erro ao atualizar diário de obra: ${error.message}`,
      );
    }
  }

  @Delete(':diarioId')
  async remove(
    @Param('idObra', ParseIntPipe) idObra: number,
    @Param('diarioId', ParseIntPipe) diarioId: number,
  ) {
    try {
      return await this.diarioDeObraService.remove(diarioId);
    } catch (error) {
      throw new BadRequestException(
        `Erro ao remover diário de obra: ${error.message}`,
      );
    }
  }
}
