import { Controller, Get, Param, Post, Body, Put, Patch, Delete, BadRequestException, NotFoundException } from '@nestjs/common';
import { Fiscalizacoes } from './entities/fiscalizacoes.entity';
import { FiscalizacoesService } from './fiscalizacoes.service';
import { CreateFiscalizacoesDto } from './dto/create-fiscalizacoes.dto';
import { UpdateFiscalizacoesDto } from './dto/update-fiscalizacoes.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateFiscalizacaoStatusDto } from './dto/update-fiscalizacoes-status.dto';

@ApiTags('Fiscalizações')
@Controller('fiscalizacoes')
export class FiscalizacoesController {
    constructor(private readonly fiscalizacoesService: FiscalizacoesService) {}

    @ApiOperation({ summary: 'Lista todas as fiscalizações' })
    @ApiResponse({ status: 200, description: 'Lista retornada com sucesso' })
    @Get()
    async findAll(): Promise<Fiscalizacoes[]> {
        try {
            return await this.fiscalizacoesService.findAll();
        } catch (error) {
            throw new BadRequestException('Erro ao listar fiscalizações...');
        }
    }

    @ApiOperation({ summary: 'Lista as 10 fiscalizações mais recentes' })
    @Get('/recentes')
    async findRecentes(): Promise<Fiscalizacoes[]> {
        try {
            return await this.fiscalizacoesService.findRecentes();
        } catch (error) {
            throw new BadRequestException('Erro ao listar fiscalizações recentes.');
        }
    }

    @ApiOperation({ summary: 'Busca uma fiscalização pelo ID' })
    @ApiResponse({ status: 200, description: 'Fiscalização encontrada' })
    @ApiResponse({ status: 404, description: 'Fiscalização não encontrada' })
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Fiscalizacoes> {
        try {
            const fiscalizacao = await this.fiscalizacoesService.findOne(id);
            if (!fiscalizacao) {
                throw new NotFoundException(`Fiscalização com ID ${id} não encontrada.`);
            }
            return fiscalizacao;
        } catch (error) {
            throw new BadRequestException(`Erro ao buscar a fiscalização ${id}.`);
        }
    }

    @ApiOperation({ summary: 'Busca fiscalizações por status' })
    @Get('/status/:status')
    async findByStatus(@Param('status') status: string): Promise<Fiscalizacoes[]> {
        try {
            return await this.fiscalizacoesService.findAllByStatus(status);
        } catch (error) {
            throw new BadRequestException(`Erro ao listar as fiscalizações com status "${status}".`);
        }
    }

    @ApiOperation({ summary: 'Busca uma fiscalização, e suas relações com obras, responsável técnico, e relatórios' })
    @Get(':id/detalhes')
    async findDetalhes(@Param('id') id: number): Promise<Fiscalizacoes | null> {
        try {
            return await this.fiscalizacoesService.findDetalhes(id);
        } catch (error) {
            throw new BadRequestException('Erro ao listar fiscalizações detalhadas.');
        }
    }

    @ApiOperation({ summary: 'Busca todas as fiscalizações associadas a uma obra' })
    @Get('/obras/:id/fiscalizacoes')
    async findByObraId(@Param('id') obraId: number): Promise<Fiscalizacoes[]> {
        try {
            return await this.fiscalizacoesService.findByObraId(obraId);
        } catch (error) {
            throw new BadRequestException(`Erro ao listar fiscalizações da obra ${obraId}.`);
        }
    }

    @ApiOperation({ summary: 'Cria uma fiscalização para uma obra' })
    @ApiResponse({ status: 201, description: 'Fiscalização criada com sucesso' })
    @ApiResponse({ status: 400, description: 'Erro na criação da fiscalização' })
    @Post('/obras/fiscalizacao')
    async create(@Body() dto: CreateFiscalizacoesDto): Promise<Fiscalizacoes> {
        try {
            return await this.fiscalizacoesService.create(dto);
        } catch (error) {
            if (error instanceof BadRequestException || error instanceof NotFoundException) {
                throw error;
            }
            throw new BadRequestException(`Erro ao criar fiscalização.`);
        }
    }

    @ApiOperation({ summary: 'Atualiza por completo uma fiscalização pelo ID' })
    @Put(':id')
    async update(@Param('id') id: number, @Body() dto: UpdateFiscalizacoesDto): Promise<Fiscalizacoes> {
        try {
            return await this.fiscalizacoesService.update(id, dto);
        } catch (error) {
            throw new BadRequestException(`Erro ao atualizar a fiscalização ${id}.`);
        }
    }

    @ApiOperation({ summary: 'Atualiza o status de uma fiscalização pelo ID' })
    @ApiResponse({ status: 200, description: 'Status da fiscalização atualizado com sucesso.', type: Fiscalizacoes })
    @ApiResponse({ status: 400, description: 'Requisição inválida ou status inválido.' })
    @ApiResponse({ status: 404, description: 'Fiscalização não encontrada.' })
    @Patch(':id')
    async patchStatus(@Param('id') id: number, @Body() updateStatusDto: UpdateFiscalizacaoStatusDto): Promise<Fiscalizacoes> {
        try {
            return await this.fiscalizacoesService.patchStatus(id, updateStatusDto.status);
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new BadRequestException(`Erro ao atualizar o status da fiscalização ${id}. Detalhes: ${error.message}`);
        }
    }

    @ApiOperation({ summary: 'Exclui uma fiscalização' })
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        try {
            await this.fiscalizacoesService.delete(id);
        } catch (error) {
            throw new BadRequestException(`Erro ao excluir fiscalização com ID ${id}.`);
        }
    }

    @ApiOperation({ summary: 'Exclui todas as fiscalizações associadas a uma obra' })
    @Delete('/obras/:id/fiscalizacoes')
    async deleteAllByObraId(@Param('id') obraId: number): Promise<void> {
        try {
            await this.fiscalizacoesService.deleteAllByObraId(obraId);
        } catch (error) {
            throw new BadRequestException(`Erro ao excluir fiscalizações da obra com ID ${obraId}.`);
        }
    }
}
