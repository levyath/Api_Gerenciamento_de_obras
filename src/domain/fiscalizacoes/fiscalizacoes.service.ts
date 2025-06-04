import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { FiscalizacoesRepository } from './fiscalizacoes.repository';
import { CreateFiscalizacoesDto } from './dto/create-fiscalizacoes.dto';
import { UpdateFiscalizacoesDto } from './dto/update-fiscalizacoes.dto';
import { Fiscalizacoes } from './entities/fiscalizacoes.entity';
import { Obras } from 'src/domain/obras/entities/obras.entity';
import { ResponsavelTecnico } from '../responsaveis-tecnicos/entities/responsavel-tecnico.entity';
import { FiscalizacaoStatus } from './enums/fiscalizacoes-status.enum';

@Injectable()
export class FiscalizacoesService {
    constructor(
        private readonly fiscalizacoesRepository: FiscalizacoesRepository,
    ) {}

    async findAll(): Promise<Fiscalizacoes[]> {
        return this.fiscalizacoesRepository.findAll();
    }

    async findOne(id: number): Promise<Fiscalizacoes | null> {
        return this.fiscalizacoesRepository.findOne(id);
    }

    async findDetalhes(id: number): Promise<Fiscalizacoes | null> {
        return await this.fiscalizacoesRepository.findDetalhes(id);
    }

    async findAllByStatus(status: string): Promise<Fiscalizacoes[]> {
        const fiscalizacoes = this.fiscalizacoesRepository.findAllByStatus(status);
        if ((await fiscalizacoes).length === 0)
            throw new NotFoundException(`Não há fiscalizações com o status ${status}`);
        return fiscalizacoes;
    }

    async findRecentes(): Promise<Fiscalizacoes[]> {
        return await this.fiscalizacoesRepository.findRecentes();
    }

    async findByObraId(obraId: number): Promise<Fiscalizacoes[]> {
        return this.fiscalizacoesRepository.findByObraId(obraId);
    }

    async create(dto: CreateFiscalizacoesDto): Promise<Fiscalizacoes> {
        const { data_inicio, data_fim, responsavelTecnicoId, obraIds } = dto;
        const hoje = new Date();
        const dataInicio = new Date(data_inicio);
        const dataFim = data_fim ? new Date(data_fim) : null;
        const responsavel = await ResponsavelTecnico.findByPk(responsavelTecnicoId);
        
        if (!responsavel || !responsavel.ativo)
            throw new BadRequestException(`Responsável técnico ID ${responsavelTecnicoId} inválido ou inativo.`);
        if (dataInicio > hoje)
            throw new BadRequestException('A fiscalização não pode ter uma data futura.');
        if (dataFim && dataFim < dataInicio)
            throw new BadRequestException('A data de fim não pode ser anterior ao início da fiscalização.')

        for (const obraId of obraIds) {
            const obra = await Obras.findByPk(obraId);
            if (!obra)
                throw new NotFoundException(`Obra com ID ${obraId} não encontrada.`);
            if (obra.status === 'Concluída')
                throw new BadRequestException('Não é possível adicionar fiscalização a uma obra concluída.');
        }

        return this.fiscalizacoesRepository.create(dto);
    }

    async update(id: number, dto: UpdateFiscalizacoesDto): Promise<Fiscalizacoes> {
        if (dto.responsavelTecnicoId) {
            const responsavel = await ResponsavelTecnico.findByPk(dto.responsavelTecnicoId);
            if (!responsavel || !responsavel.ativo)
                throw new BadRequestException(`Responsável técnico ID ${dto.responsavelTecnicoId} inválido ou inativo.`);
        }

        const fiscalizacaoExistente = await this.fiscalizacoesRepository.findOne(id);
        if (!fiscalizacaoExistente)
             throw new NotFoundException(`Fiscalização com ID ${id} não encontrada para atualização.`);

        const dataInicioValidate = dto.data_inicio || fiscalizacaoExistente.data_inicio;
        const dataFimValidate = dto.data_fim || fiscalizacaoExistente.data_fim;

        if (dataInicioValidate && dataFimValidate && dataFimValidate < dataInicioValidate)
            throw new BadRequestException('A data de fim não pode ser menor que a data de início.');

        if (dto.obraIds && dto.obraIds.length > 0) {
            const obrasExistentes = await Obras.findAll({ where: { id: dto.obraIds } });

            if (obrasExistentes.length !== dto.obraIds.length) {
                const foundIds = new Set(obrasExistentes.map(obra => obra.id));
                const missingIds = dto.obraIds.filter(id => !foundIds.has(id));
                throw new BadRequestException(`As seguintes Obras com IDs não foram encontradas: ${missingIds.join(', ')}.`);
            }

            const fiscalizacaoAtualizada = await this.fiscalizacoesRepository.update(id, dto);
            await fiscalizacaoAtualizada.$set('obras', obrasExistentes);
            return fiscalizacaoAtualizada;

        } else if (dto.obraIds && dto.obraIds.length === 0) {
            const fiscalizacaoAtualizada = await this.fiscalizacoesRepository.update(id, dto);
            await fiscalizacaoAtualizada.$set('obras', []);
            return fiscalizacaoAtualizada;
        }

        return this.fiscalizacoesRepository.update(id, dto);
    }

    async patchStatus(id: number, status: FiscalizacaoStatus): Promise<Fiscalizacoes> {
        const fiscalizacao = await this.fiscalizacoesRepository.findOne(id);
        if (!fiscalizacao)
            throw new NotFoundException(`Fiscalização com ID ${id} não encontrada.`);
        
        const updateStatus: Partial<Fiscalizacoes> = { status: status };
        return this.fiscalizacoesRepository.patch(id, updateStatus);
    }

    async delete(id: number): Promise<void> {
        return this.fiscalizacoesRepository.delete(id);
    }

    async deleteAllByObraId(obraId: number): Promise<void> {
        return await this.fiscalizacoesRepository.deleteAllByObraId(obraId);
    }
}
