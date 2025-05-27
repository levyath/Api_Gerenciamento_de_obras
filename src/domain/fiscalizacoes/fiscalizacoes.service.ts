import { Injectable, BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { FiscalizacoesRepository } from './fiscalizacoes.repository';
import { CreateFiscalizacoesDto } from './dto/create-fiscalizacoes.dto';
import { UpdateFiscalizacoesDto } from './dto/update-fiscalizacoes.dto';
import { Fiscalizacoes } from './entities/fiscalizacoes.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Obra } from 'src/domain/obras/entities/obra.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FiscalizacoesService {
    constructor(
        private readonly fiscalizacoesRepository: FiscalizacoesRepository,

        @InjectRepository(Obra)
        private readonly obraRepository: Repository<Obra>
    ) {}

    async findAll(): Promise<Fiscalizacoes[]> {
        return this.fiscalizacoesRepository.findAll();
    }

    async findOne(id: number): Promise<Fiscalizacoes> {
        return this.fiscalizacoesRepository.findOneById(id);
    }

    async findByObraId(obraId: number): Promise<Fiscalizacoes[]> {
        return this.fiscalizacoesRepository.findByObraId(obraId);
    }

    async createForObra(obraId: number, dto: CreateFiscalizacoesDto): Promise<Fiscalizacoes> {
        const hoje = new Date();
        if (dto.data && new Date(dto.data) > hoje) {
            throw new BadRequestException('A data da fiscalização não pode estar no futuro.');
        }

        const fiscalizacoesExistentes = await this.fiscalizacoesRepository.findByObraId(obraId);
        const tituloExistente = fiscalizacoesExistentes.some(f => f.titulo === dto.titulo);
        if (tituloExistente) {
            throw new ConflictException(`Já existe uma fiscalização com o título "${dto.titulo}" para esta obra.`);
        }

        const obra = await this.obraRepository.findOne({ where: { id: obraId } });
        if (!obra) {
            throw new NotFoundException(`Obra com ID ${obraId} não encontrada.`);
        }
        if (obra.status === 'Concluída') {
            throw new BadRequestException('Não é possível cadastrar fiscalizações para obras concluídas.');
        }

        return this.fiscalizacoesRepository.createForObra(obraId, dto);
    }

    async update(id: number, dto: UpdateFiscalizacoesDto): Promise<Fiscalizacoes> {
        return this.fiscalizacoesRepository.update(id, dto);
    }

    async patch(id: number, dto: UpdateFiscalizacoesDto): Promise<Fiscalizacoes> {
        return this.fiscalizacoesRepository.patch(id, dto);
    }

    async remove(id: number): Promise<void> {
        return this.fiscalizacoesRepository.remove(id);
    }
}
