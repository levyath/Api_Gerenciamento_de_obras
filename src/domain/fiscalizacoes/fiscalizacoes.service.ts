import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { FiscalizacoesRepository } from './fiscalizacoes.repository';
import { CreateFiscalizacoesDto } from './dto/create-fiscalizacoes.dto';
import { UpdateFiscalizacoesDto } from './dto/update-fiscalizacoes.dto';
import { Fiscalizacoes } from './entities/fiscalizacoes.entity';
import { Obras } from 'src/domain/obras/entities/obras.entity';

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
        return await this.fiscalizacoesRepository.findAllByStatus(status);
    }

    async findRecentes(): Promise<Fiscalizacoes[]> {
        return await this.fiscalizacoesRepository.findRecentes();
    }

    async findByObraId(obraId: number): Promise<Fiscalizacoes[]> {
        return this.fiscalizacoesRepository.findByObraId(obraId);
    }

    async create(obraId: number, dto: CreateFiscalizacoesDto): Promise<Fiscalizacoes> {
        const { data, titulo } = dto;
        const hoje = new Date();
        const dataFiscalizacao = new Date(data);
        const fiscalizacoesExistentes = await this.findByObraId(obraId);
        const tituloDuplicado = fiscalizacoesExistentes.some(f => f.titulo === titulo);
        const obra = await Obras.findByPk(obraId);

        if (dataFiscalizacao > hoje)
            throw new BadRequestException('A fiscalização não pode ter uma data futura.');
        if (tituloDuplicado)
            throw new BadRequestException(`A obra já possui uma fiscalização com o título "${titulo}".`);
        if (!obra)
            throw new NotFoundException(`Obra com ID ${obraId} não encontrada.`);
        if (obra.status === 'Concluída')
            throw new BadRequestException('Não é possível adicionar fiscalização a uma obra concluída.');

        return this.fiscalizacoesRepository.create(obraId, dto);
    }

    async update(id: number, dto: UpdateFiscalizacoesDto): Promise<Fiscalizacoes> {
        return this.fiscalizacoesRepository.update(id, dto);
    }

    async patch(id: number, dto: UpdateFiscalizacoesDto): Promise<Fiscalizacoes> {
        return this.fiscalizacoesRepository.patch(id, dto);
    }

    async delete(id: number): Promise<void> {
        return this.fiscalizacoesRepository.delete(id);
    }

    async deleteAllByObraId(obraId: number): Promise<void> {
        return await this.fiscalizacoesRepository.deleteAllByObraId(obraId);
    }
}
