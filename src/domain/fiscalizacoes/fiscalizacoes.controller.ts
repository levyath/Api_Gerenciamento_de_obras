import { Controller, Get, Param, Post, Body, Put, Patch, Delete, BadRequestException, NotFoundException, UseGuards, ParseIntPipe, HttpCode } from '@nestjs/common';
import { Fiscalizacoes } from './entities/fiscalizacoes.entity';
import { FiscalizacoesService } from './fiscalizacoes.service';
import { CreateFiscalizacoesDto } from './dto/create-fiscalizacoes.dto';
import { UpdateFiscalizacoesDto } from './dto/update-fiscalizacoes.dto';
import { UpdateFiscalizacaoStatusDto } from './dto/update-fiscalizacoes-status.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiNotFoundResponse } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@ApiTags('Fiscalizações')
@Controller('fiscalizacoes')
export class FiscalizacoesController {
  constructor(private readonly fiscalizacoesService: FiscalizacoesService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todas as fiscalizações' })
  @ApiResponse({ status: 200, description: 'Lista retornada com sucesso', type: [Fiscalizacoes] })
  @ApiBadRequestResponse({ description: 'Erro ao listar fiscalizações' })
  async findAll(): Promise<Fiscalizacoes[]> {
    try {
      return await this.fiscalizacoesService.findAll();
    } catch (error) {
      throw new BadRequestException('Erro ao listar fiscalizações.');
    }
  }

  @Get('recentes')
  @ApiOperation({ summary: 'Lista as 10 fiscalizações mais recentes' })
  @ApiResponse({ status: 200, description: 'Lista retornada com sucesso', type: [Fiscalizacoes] })
  @ApiBadRequestResponse({ description: 'Erro ao listar fiscalizações recentes' })
  async findRecentes(): Promise<Fiscalizacoes[]> {
    try {
      return await this.fiscalizacoesService.findRecentes();
    } catch (error) {
      throw new BadRequestException('Erro ao listar fiscalizações recentes.');
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca uma fiscalização pelo ID' })
  @ApiResponse({ status: 200, description: 'Fiscalização encontrada', type: Fiscalizacoes })
  @ApiNotFoundResponse({ description: 'Fiscalização não encontrada' })
  @ApiBadRequestResponse({ description: 'Erro na requisição' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Fiscalizacoes> {
    try {
      const fiscalizacao = await this.fiscalizacoesService.findOne(id);
      if (!fiscalizacao) {
        throw new NotFoundException(`Fiscalização com ID ${id} não encontrada.`);
      }
      return fiscalizacao;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException(`Erro ao buscar fiscalização com ID ${id}.`);
    }
  }

  @Get('status/:status')
  @ApiOperation({ summary: 'Busca fiscalizações por status' })
  @ApiResponse({ status: 200, description: 'Lista retornada com sucesso', type: [Fiscalizacoes] })
  @ApiBadRequestResponse({ description: 'Erro na requisição' })
  async findByStatus(@Param('status') status: string): Promise<Fiscalizacoes[]> {
    try {
      return await this.fiscalizacoesService.findAllByStatus(status);
    } catch (error) {
      throw new BadRequestException(`Erro ao listar fiscalizações com status "${status}".`);
    }
  }

  @Get(':id/detalhes')
  @ApiOperation({ summary: 'Busca uma fiscalização e suas relações com obras, responsável técnico e relatórios' })
  @ApiResponse({ status: 200, description: 'Detalhes da fiscalização retornados com sucesso', type: Fiscalizacoes })
  @ApiBadRequestResponse({ description: 'Erro na requisição' })
  async findDetalhes(@Param('id', ParseIntPipe) id: number): Promise<Fiscalizacoes | null> {
    try {
      return await this.fiscalizacoesService.findDetalhes(id);
    } catch (error) {
      throw new BadRequestException('Erro ao listar fiscalizações detalhadas.');
    }
  }

  @Get('obras/:id/fiscalizacoes')
  @ApiOperation({ summary: 'Busca todas as fiscalizações associadas a uma obra' })
  @ApiResponse({ status: 200, description: 'Lista retornada com sucesso', type: [Fiscalizacoes] })
  @ApiBadRequestResponse({ description: 'Erro na requisição' })
  async findByObraId(@Param('id', ParseIntPipe) obraId: number): Promise<Fiscalizacoes[]> {
    try {
      return await this.fiscalizacoesService.findByObraId(obraId);
    } catch (error) {
      throw new BadRequestException(`Erro ao listar fiscalizações da obra ${obraId}.`);
    }
  }

  @Post('obras/fiscalizacao')
  @ApiOperation({ summary: 'Cria uma fiscalização para uma obra' })
  @ApiResponse({ status: 201, description: 'Fiscalização criada com sucesso', type: Fiscalizacoes })
  @ApiBadRequestResponse({ description: 'Erro na criação da fiscalização' })
  @HttpCode(201)
  async create(@Body() dto: CreateFiscalizacoesDto): Promise<Fiscalizacoes> {
    try {
      return await this.fiscalizacoesService.create(dto);
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Erro ao criar fiscalização.');
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza por completo uma fiscalização pelo ID' })
  @ApiResponse({ status: 200, description: 'Fiscalização atualizada com sucesso', type: Fiscalizacoes })
  @ApiBadRequestResponse({ description: 'Erro na atualização da fiscalização' })
  @ApiNotFoundResponse({ description: 'Fiscalização não encontrada' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateFiscalizacoesDto,
  ): Promise<Fiscalizacoes> {
    try {
      return await this.fiscalizacoesService.update(id, dto);
    } catch (error) {
      throw new BadRequestException(`Erro ao atualizar fiscalização ${id}.`);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza o status de uma fiscalização pelo ID' })
  @ApiResponse({ status: 200, description: 'Status atualizado com sucesso', type: Fiscalizacoes })
  @ApiBadRequestResponse({ description: 'Requisição inválida ou status inválido' })
  @ApiNotFoundResponse({ description: 'Fiscalização não encontrada' })
  async patchStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStatusDto: UpdateFiscalizacaoStatusDto,
  ): Promise<Fiscalizacoes> {
    try {
      return await this.fiscalizacoesService.patchStatus(id, updateStatusDto.status);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException(`Erro ao atualizar status da fiscalização ${id}. Detalhes: ${error.message}`);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Exclui uma fiscalização pelo ID' })
  @ApiResponse({ status: 204, description: 'Fiscalização excluída com sucesso' })
  @ApiBadRequestResponse({ description: 'Erro ao excluir fiscalização' })
  @HttpCode(204)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    try {
      await this.fiscalizacoesService.delete(id);
    } catch (error) {
      throw new BadRequestException(`Erro ao excluir fiscalização com ID ${id}.`);
    }
  }

  @Delete('obras/:id/fiscalizacoes')
  @ApiOperation({ summary: 'Exclui todas as fiscalizações associadas a uma obra' })
  @ApiResponse({ status: 204, description: 'Fiscalizações da obra excluídas com sucesso' })
  @ApiBadRequestResponse({ description: 'Erro ao excluir fiscalizações da obra' })
  @HttpCode(204)
  async deleteAllByObraId(@Param('id', ParseIntPipe) obraId: number): Promise<void> {
    try {
      await this.fiscalizacoesService.deleteAllByObraId(obraId);
    } catch (error) {
      throw new BadRequestException(`Erro ao excluir fiscalizações da obra com ID ${obraId}.`);
    }
  }
}
