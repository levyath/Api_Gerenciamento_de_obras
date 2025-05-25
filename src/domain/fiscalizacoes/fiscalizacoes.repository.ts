import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Fiscalizacoes } from "./entities/fiscalizacoes.entity";
import { ObraFiscalizacoes } from "../obra-fiscalizacoes/entities/obra-fiscalizacoes.entity";
import { CreateFiscalizacoesDto } from './dto/create-fiscalizacoes.dto';
import { UpdateFiscalizacoesDto } from './dto/update-fiscalizacoes.dto';

@Injectable()
export class FiscalizacoesRepository {
    constructor(
        @InjectRepository(Fiscalizacoes)
        private readonly fiscalizacoesRepository: Repository<Fiscalizacoes>,
        @InjectRepository(ObraFiscalizacoes)
        private readonly obraFiscalizacoesRepository: Repository<ObraFiscalizacoes>
    ) {}

    //get geral (/fiscalizacoes)
    async findAll(): Promise<Fiscalizacoes[]> {
        return this.fiscalizacoesRepository.find({
            relations: ['obras'],
        });
    }

    //get fiscalizacoes atreladas a uma obra (/obras/:id/fiscalizacoes)
    async findByObraId(obraId: number): Promise<Fiscalizacoes[]> {
        const obraFiscalizacoes = await this.obraFiscalizacoesRepository.find({
            where: { obra: { id: obraId } },
            relations: ['fiscalizacao'],
        });
        if (obraFiscalizacoes.length === 0) {
            throw new NotFoundException('Nenhuma fiscalização associada à obra ${obraId}');
        }
        return obraFiscalizacoes.map(of => of.fiscalizacao);
    }

    //get fiscalizacao individual (/fiscalizacoes/:id)
    async findOneById(id: number): Promise<Fiscalizacoes> {
        const fiscalizacao = await this.fiscalizacoesRepository.findOne({
            where: { id },
            relations: ['obras']//'relatorios', 'responsavelTecnico'], pendente eu e Levy
        });
        if (!fiscalizacao) {
            throw new NotFoundException('Fiscalização com ID ${id} não encontrada.');
        }
        return fiscalizacao;
    }

    //post criar fiscalização (/obras/:id/fiscalizacoes)
    async createForObra(obraId: number, dto: CreateFiscalizacoesDto): Promise<Fiscalizacoes> {
        const novaFiscalizacao = this.fiscalizacoesRepository.create({
        ...dto,
        //responsavel_id: dto.responsavel_id, pendente Levy
        });
        const salvarFisc = await this.fiscalizacoesRepository.save(novaFiscalizacao);
        const novaObraFisc = this.obraFiscalizacoesRepository.create({
            obra: { id: obraId },
            fiscalizacao: salvarFisc,
        });
        await this.obraFiscalizacoesRepository.save(novaObraFisc);
        return salvarFisc;
    }

    //put editar fiscalizacao especifica (/fiscalizacoes/:id)
    async update(id: number, dto: UpdateFiscalizacoesDto): Promise<Fiscalizacoes> {
        const fiscalizacao = await this.fiscalizacoesRepository.findOne({ where: { id } });
        if (!fiscalizacao) {
            throw new NotFoundException('Fiscalização com ID ${id} não encontrada.');
        }
        Object.assign(fiscalizacao, dto);
        return this.fiscalizacoesRepository.save(fiscalizacao);
    }

    //patch atualizar dados especificos fiscalizacao (/fiscalizacoes/:id)
    async patch(id: number, dto: UpdateFiscalizacoesDto): Promise<Fiscalizacoes> {
        const fiscalizacao = await this.fiscalizacoesRepository.findOne({ where: { id } });
        if (!fiscalizacao) {
            throw new NotFoundException('Fiscalização com ID ${id} não encontrada.');
        }
        if (dto.titulo !== undefined) {
            fiscalizacao.titulo = dto.titulo;
        }
        if (dto.descricao !== undefined) {
            fiscalizacao.descricao = dto.descricao;
        }
        return this.fiscalizacoesRepository.save(fiscalizacao);
    }

    //delete fiscalizacao especifica (/fiscalizacoes/:id)
    async remove(id: number): Promise<void> {
        const fiscalizacao = await this.fiscalizacoesRepository.findOne({ where: { id } });
        if (!fiscalizacao) {
            throw new NotFoundException('Fiscalização com ID ${id} não encontrada.');
        }
        await this.fiscalizacoesRepository.remove(fiscalizacao);
    }
}