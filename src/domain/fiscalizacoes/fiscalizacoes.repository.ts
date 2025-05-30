import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Fiscalizacoes } from "./entities/fiscalizacoes.entity";
import { ObraFiscalizacoes } from "../obra-fiscalizacoes/entities/obra-fiscalizacoes.entity";
import { CreateFiscalizacoesDto } from './dto/create-fiscalizacoes.dto';
import { UpdateFiscalizacoesDto } from './dto/update-fiscalizacoes.dto';
import { Obra } from "../obras/entities/obra.entity";
import { Sequelize } from "sequelize";

@Injectable()
export class FiscalizacoesRepository {
    constructor(
        @Inject('SEQUELIZE') private sequelize: Sequelize,

        @InjectModel(Fiscalizacoes)
        private readonly fiscalizacoesModel: typeof Fiscalizacoes,
        
        @InjectModel(ObraFiscalizacoes)
        private readonly obraFiscalizacoesModel: typeof ObraFiscalizacoes
    ) {}

    async findAll(): Promise<Fiscalizacoes[]> {
        return this.fiscalizacoesModel.findAll({
            include: [{ model: Obra }],
        });
    }

    async findByObraId(obraId: number): Promise<Fiscalizacoes[]> {
        const obraFiscalizacoes = await this.obraFiscalizacoesModel.findAll({
            where: { obraId },
            include: [{ model: Fiscalizacoes }],
        });
        return obraFiscalizacoes.map(of => of.fiscalizacao);
    }

    async findOneById(id: number): Promise<Fiscalizacoes> {
        const fiscalizacao = await this.fiscalizacoesModel.findByPk(id, {
            include: [{ model: Obra }],
        });
        if (!fiscalizacao) {
            throw new NotFoundException(`Fiscalização com ID ${id} não encontrada.`);
        }
        return fiscalizacao;
    }

    async createForObra(obraId: number, dto: CreateFiscalizacoesDto): Promise<Fiscalizacoes> {
        const transaction = await this.sequelize.transaction();
        try {
            const obras = await Obra.findAll({
                where: {
                    id: dto.obra_ids
                }
            });
            const novaFiscalizacao = await this.fiscalizacoesModel.create(
                {
                    titulo: dto.titulo,
                    descricao: dto.descricao,
                    data: new Date(dto.data),
                    obras: obras,
                },
                { transaction }
            );

            await this.obraFiscalizacoesModel.create(
                {
                    obraId,
                    fiscalizacaoId: novaFiscalizacao.id,
                },
                { transaction }
            );

            await transaction.commit();
            return novaFiscalizacao;
        } catch (error) {
            await transaction.rollback();
            throw new BadRequestException('Erro ao criar fiscalização!');
        }
    }   

    async update(id: number, dto: UpdateFiscalizacoesDto): Promise<Fiscalizacoes> {
        const transaction = await this.sequelize.transaction();
        try {
            const fiscalizacao = await this.findOneById(id);

            // Atualizar os campos da fiscalização
            await fiscalizacao.update(
                {
                    titulo: dto.titulo,
                    descricao: dto.descricao,
                    data: dto.data ? new Date(dto.data) : fiscalizacao.data,
                },
                { transaction }
            );

            await transaction.commit();
            return fiscalizacao;
        } catch (error) {
            await transaction.rollback();
            throw new BadRequestException('Erro ao atualizar fiscalização!');
        }
    }

    async patch(id: number, dto: UpdateFiscalizacoesDto): Promise<Fiscalizacoes> {
        return this.update(id, dto);
    }

    async remove(id: number): Promise<void> {
        const fiscalizacao = await this.findOneById(id);
        await fiscalizacao.destroy();
    }
}
