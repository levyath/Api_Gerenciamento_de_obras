import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Relatorios } from "./entities/relatorios.entity";
import { CreateRelatoriosDto } from "./dto/create-relatorios.dto";
import { UpdateRelatoriosDto } from "./dto/update-relatorios.dto";

@Injectable()
export class RelatoriosRepository {
    constructor(
        @InjectModel(Relatorios)
        private readonly relatoriosModel: typeof Relatorios,
    ) {}

    //get /relatorios
    async findAll(): Promise<Relatorios[]> {
        return this.relatoriosModel.findAll();
    }

    //get /relatorios/:id
    async findOne(id: number): Promise<Relatorios | null> {
        return await this.relatoriosModel.findOne({
            where: { id },
        });
    }

    //get /fiscalizacoes/:id/relatorios
    async findByFiscalizacao(fiscalizacaoId: number): Promise<Relatorios[]> {
        return await this.relatoriosModel.findAll({
            where: { fiscalizacaoId },
        });
    }

    //post /fiscalizacoes/:id/relatorio
    async create(fiscalizacaoId: number, dto: CreateRelatoriosDto): Promise<Relatorios> {
        return await this.relatoriosModel.create({ ...dto as any, fiscalizacaoId });
    }

    //put /relatorios/:id
    async update(id: number, dto: UpdateRelatoriosDto): Promise<Relatorios> {
        const relatorio = await this.relatoriosModel.findByPk(id);
        if (!relatorio)
            throw new NotFoundException(`Relatório com ID ${id} não encontrado.`)

        await relatorio.update(dto as any);
        return relatorio;
    }

    //delete /relatorios/:id
    async delete(id: number): Promise<void> {
        const relatorio = await this.relatoriosModel.findByPk(id);
        if (!relatorio)
            throw new NotFoundException(`Relatório com ID ${id} não encontrado.`);

        await relatorio.destroy();
    }

    //delete /fiscalizacoes/:id/relatorios
    async deleteByFiscalizacao(fiscalizacaoId: number): Promise<void> {
        await this.relatoriosModel.destroy({ where: { fiscalizacaoId } });
    }
}
