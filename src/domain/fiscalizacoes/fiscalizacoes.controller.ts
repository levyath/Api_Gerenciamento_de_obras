import { Controller, Get, Param, Post, Body, Put, Patch, Delete, BadRequestException, NotFoundException } from '@nestjs/common';
import { Fiscalizacoes } from './entities/fiscalizacoes.entity';
import { FiscalizacoesService } from './fiscalizacoes.service';
import { CreateFiscalizacoesDto } from './dto/create-fiscalizacoes.dto';
import { UpdateFiscalizacoesDto } from './dto/update-fiscalizacoes.dto';

@Controller('fiscalizacoes')
export class FiscalizacoesController {
    constructor(private readonly fiscalizacoesService: FiscalizacoesService) {}

    @Get()
    async findAll(): Promise<Fiscalizacoes[]> {
        try {
            return await this.fiscalizacoesService.findAll();
        } catch (error) {
            throw new BadRequestException('Erro ao listar fiscalizações...');
        }
    }

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

    @Get('/status/:status')
    async findByStatus(@Param('status') status: string): Promise<Fiscalizacoes[]> {
        try {
            return await this.fiscalizacoesService.findAllByStatus(status);
        } catch (error) {
            throw new BadRequestException(`Erro ao listar as fiscalizações com status "${status}".`);
        }
    }

    @Get('/recentes')
    async findRecentes(): Promise<Fiscalizacoes[]> {
        try {
            return await this.fiscalizacoesService.findRecentes();
        } catch (error) {
            throw new BadRequestException('Erro ao listar fiscalizações recentes.');
        }
    }

    @Get(':id/detalhes')
    async findDetalhes(@Param('id') id: number): Promise<Fiscalizacoes | null> {
        try {
            return await this.fiscalizacoesService.findDetalhes(id);
        } catch (error) {
            throw new BadRequestException('Erro ao listar fiscalizações detalhadas.');
        }
    }

    @Get('/obras/:id/fiscalizacoes')
    async findByObraId(@Param('id') obraId: number): Promise<Fiscalizacoes[]> {
        try {
            return await this.fiscalizacoesService.findByObraId(obraId);
        } catch (error) {
            throw new BadRequestException(`Erro ao listar fiscalizações da obra ${obraId}.`);
        }
    }

    @Post('/obras/:id/fiscalizacoes')
    async create(@Param('id') obraId: number, @Body() dto: CreateFiscalizacoesDto) {
        try {
            return await this.fiscalizacoesService.create(obraId, dto);
        } catch (error) {
            if (error instanceof BadRequestException || error instanceof NotFoundException) {
                throw error;
            }
            throw new BadRequestException(`Erro ao criar fiscalização para a obra ${obraId}.`);
        }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() dto: UpdateFiscalizacoesDto): Promise<Fiscalizacoes> {
        try {
            return await this.fiscalizacoesService.update(id, dto);
        } catch (error) {
            throw new BadRequestException(`Erro ao atualizar a fiscalização ${id}.`);
        }
    }

    @Patch(':id')
    async partialUpdate(@Param('id') id: number, @Body() dto: Partial<UpdateFiscalizacoesDto>): Promise<Fiscalizacoes> {
        try {
            return await this.fiscalizacoesService.patch(id, dto);
        } catch (error) {
            throw new BadRequestException(`Erro ao atualizar parcialmente a fiscalização ${id}.`);
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        try {
            await this.fiscalizacoesService.delete(id);
        } catch (error) {
            throw new BadRequestException(`Erro ao excluir fiscalização ID ${id}.`);
        }
    }
}
