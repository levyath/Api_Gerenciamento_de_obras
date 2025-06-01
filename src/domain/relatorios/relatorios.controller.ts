import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Relatorios } from "./entities/relatorios.entity";
import { RelatoriosService } from "./relatorios.service";
import { CreateRelatoriosDto } from "./dto/create-relatorios.dto";
import { UpdateRelatoriosDto } from "./dto/update-relatorios.dto";

@ApiTags('Relatórios')
@Controller('relatorios')
export class RelatoriosController {
    constructor(private readonly relatoriosService: RelatoriosService) {}

    @ApiOperation({ summary: 'Lista todos os relatórios' })
    @ApiResponse({ status: 200, description: 'Lista de relatórios retornada com sucesso' })
    @Get()
    async findAll(): Promise<Relatorios[]> {
        try {
            return await this.relatoriosService.findAll();
        } catch (error) {
            throw new BadRequestException('Erro ao listar relatórios.');
        }
    }

    @ApiOperation({ summary: 'Busca um relatório específico pelo ID' })
    @ApiResponse({ status: 200, description: 'Relatório encontrado' })
    @ApiResponse({ status: 404, description: 'Relatório não encontrado' })
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Relatorios> {
        try {
            return await this.relatoriosService.findOne(id);
        } catch (error) {
            if (error instanceof NotFoundException)
                throw new NotFoundException(`Relatorio com ID ${id} não encontrado.`);
            throw new BadRequestException(`Erro ao buscar relatório com ID ${id}.`);
        }
    }

    @ApiOperation({ summary: 'Lista os relatórios de uma fiscalização específica' })
    @ApiResponse({ status: 200, description: 'Lista de relatórios retornada com sucesso' })
    @Get('/fiscalizacoes/:id')
    async findByFiscalizacao(@Param('id') fiscalizacaoId: number): Promise<Relatorios[]> {
        try {   
            return await this.relatoriosService.findByFiscalizacao(fiscalizacaoId);
        } catch (error) {
            throw new BadRequestException(`Erro ao listar relatórios da fiscalização com ID ${fiscalizacaoId}.`);
        }
    }

    @ApiOperation({ summary: 'Cria um novo relatório para uma fiscalização' })
    @ApiResponse({ status: 201, description: 'Relatório criado com sucesso' })
    @ApiResponse({ status: 400, description: 'Erro na criação do relatório' })
    @Post('/fiscalizacoes/:id')
    async create(@Param('id') fiscalizacaoId: number, @Body() dto: CreateRelatoriosDto): Promise<Relatorios> {
        try {
            return await this.relatoriosService.create(fiscalizacaoId, dto);
        } catch (error) {
            if (error instanceof NotFoundException)
                throw new NotFoundException(`Fiscalização com ID ${fiscalizacaoId} não encontrada.`);
            throw new BadRequestException(`Erro ao criar relatório para fiscalização ID ${fiscalizacaoId}.`);
        }
    }

    @ApiOperation({ summary: 'Atualiza um relatório pelo ID' })
    @ApiResponse({ status: 200, description: 'Relatório atualizado com sucesso' })
    @ApiResponse({ status: 404, description: 'Relatório não encontrado' })
    @Put(':id')
    async update(@Param('id') id: number, @Body() dto: UpdateRelatoriosDto): Promise<Relatorios> {
        try {
            return await this.relatoriosService.update(id, dto);
        } catch (error) {
            if (error instanceof NotFoundException)
                throw new NotFoundException(`Relatorio com ID ${id} não encontrado.`);
            throw new BadRequestException(`Erro ao atualizar relatorio com ID ${id}.`);
        }
    }

    @ApiOperation({ summary: 'Exclui um relatório pelo ID' })
    @ApiResponse({ status: 200, description: 'Relatório excluído com sucesso' })
    @ApiResponse({ status: 404, description: 'Relatório não encontrado' })
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        try {
            await this.relatoriosService.delete(id);
        } catch (error) {
            throw new BadRequestException(`Erro ao excluir relatório com ID ${id}.`);
        }
    }

    @ApiOperation({ summary: 'Exclui todos os relatórios de uma fiscalização' })
    @ApiResponse({ status: 200, description: 'Todos os relatórios excluídos com sucesso' })
    @Delete('/fiscalizacoes/:id')
    async deleteByFiscalizacao(@Param('id') fiscalizacaoId: number): Promise<void> {
        try {
            await this.relatoriosService.deleteByFiscalizacao(fiscalizacaoId);
        } catch (error) {
            throw new BadRequestException(`Erro ao excluir relatórios da fiscalização ${fiscalizacaoId}.`);
        }
    }
}
