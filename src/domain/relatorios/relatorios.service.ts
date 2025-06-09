import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { RelatoriosRepository } from "./relatorios.repository";
import { CreateRelatoriosDto } from "./dto/create-relatorios.dto";
import { UpdateRelatoriosDto } from "./dto/update-relatorios.dto";
import { Relatorios } from "./entities/relatorios.entity";

@Injectable()
export class RelatoriosService {
    constructor(private readonly relatoriosRepository: RelatoriosRepository) {}

    async findAll(): Promise<Relatorios[]> {
        return await this.relatoriosRepository.findAll();
    }

    async findOne(id: number): Promise<Relatorios> {
        const relatorio = await this.relatoriosRepository.findOne(id);
        if (!relatorio)
            throw new NotFoundException(`Relatório com ID ${id} não encontrado.`);

        return relatorio;
    }

    async findByFiscalizacao(fiscalizacaoId: number): Promise<Relatorios[]> {
        return await this.relatoriosRepository.findByFiscalizacao(fiscalizacaoId);
    }

    async create(fiscalizacaoId: number, dto: CreateRelatoriosDto): Promise<Relatorios> {
        const { titulo, dataCriacao } = dto;
        const hoje = new Date();
        const dataRelatorio = new Date(dataCriacao);
        const relatoriosExistentes = await this.findByFiscalizacao(fiscalizacaoId);
        const tituloDuplicado = relatoriosExistentes.some(r => r.titulo === titulo);

        if (dataRelatorio > hoje)
            throw new BadRequestException('A data de criação do relatório não pode estar no futuro.');
        if (tituloDuplicado && dataRelatorio == hoje)
            throw new BadRequestException(`Já existe um relatório com o título "${titulo}" para essa fiscalização.`);

        return await this.relatoriosRepository.create(fiscalizacaoId, dto);
    }

    async update(id: number, dto: UpdateRelatoriosDto): Promise<Relatorios> {
        const relatorio = await this.relatoriosRepository.findOne(id);
        if (!relatorio)
            throw new NotFoundException(`Relatório com o ID ${id} não foi encontrado.`);

        if (dto.dataCriacao) {
            const novaData = new Date(dto.dataCriacao);
            if (novaData > new Date())
                throw new BadRequestException('A data de criação do relatório não pode ser alterada para o futuro.');
        }

        return await this.relatoriosRepository.update(id, dto);
    }

    async delete(id: number): Promise<void> {
        return await this.relatoriosRepository.delete(id);
    }

    async deleteByFiscalizacao(fiscalizacaoId: number): Promise<void> {
        return await this.relatoriosRepository.deleteByFiscalizacao(fiscalizacaoId);
    }
}
