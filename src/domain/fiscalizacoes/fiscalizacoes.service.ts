import { Injectable } from "@nestjs/common";
import { FiscalizacoesRepository } from "./fiscalizacoes.repository";
import { CreateFiscalizacoesDto } from "./dto/create-fiscalizacoes.dto";
import { UpdateFiscalizacoesDto } from "./dto/update-fiscalizacoes.dto";
import { Fiscalizacoes } from "./entities/fiscalizacoes.entity";

@Injectable()
export class FiscalizacoesService {
    constructor(
        private readonly fiscalizacoesRepository: FiscalizacoesRepository
    ) {}

    findAll(): Promise<Fiscalizacoes[]> {
        return this.fiscalizacoesRepository.findAll();
    }

    findOne(id: number): Promise<Fiscalizacoes> {
        return this.fiscalizacoesRepository.findOneById(id);
    }

    findByObraId(obraId: number): Promise<Fiscalizacoes[]> {
        return this.fiscalizacoesRepository.findByObraId(obraId);
    }

    createForObra(obraId: number, dto: CreateFiscalizacoesDto): Promise<Fiscalizacoes> {
        return this.fiscalizacoesRepository.createForObra(obraId, dto);
    }

    update(id: number, dto: UpdateFiscalizacoesDto): Promise<Fiscalizacoes> {
        return this.fiscalizacoesRepository.update(id, dto);
    }

    patch(id: number, dto: UpdateFiscalizacoesDto): Promise<Fiscalizacoes> {
        return this.fiscalizacoesRepository.patch(id, dto);
    }

    remove(id: number): Promise<void> {
        return this.fiscalizacoesRepository.remove(id);
    }
}