import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Fiscalizacoes } from "./entities/fiscalizacoes.entity";
import { CreateFiscalizacoesDto } from './dto/create-fiscalizacoes.dto';
import { UpdateFiscalizacoesDto } from './dto/update-fiscalizacoes.dto';
import { Obras } from "../obras/entities/obras.entity";

@Injectable()
export class FiscalizacoesRepository {
    constructor(
        @InjectModel(Fiscalizacoes)
        private readonly fiscalizacoesModel: typeof Fiscalizacoes,
    ) {}

    //get /fiscalizacoes
    async findAll(): Promise<Fiscalizacoes[]> {
        return this.fiscalizacoesModel.findAll();
    }

    //get /fiscalizacoes/:id
    async findOne(id: number): Promise<Fiscalizacoes | null> {
        return await this.fiscalizacoesModel.findOne({
            where: { id },
        })
    }

    //get /fiscalizacoes/:id/detalhes
    async findDetalhes(id: number): Promise<Fiscalizacoes | null>{
        return await this.fiscalizacoesModel.findOne({
            where: { id },
            include: [Obras],
        })
    }

    //get /fiscalizacoes/status/:status
    async findAllByStatus(status: string): Promise<Fiscalizacoes[]>{
        return await this.fiscalizacoesModel.findAll({ where: { status } });
    }

    //get /fiscalizacoes/recentes
    async findRecentes(): Promise<Fiscalizacoes[]>{
        return await this.fiscalizacoesModel.findAll({
            order: [['data', 'DESC']],
            limit: 10,
        });
    }

    //get /obras/:id/fiscalizacoes
    async findByObraId(obraId: number): Promise<Fiscalizacoes[]> {
        return await this.fiscalizacoesModel.findAll({
            include: [{
                where: { id: obraId },
                include: [Obras],
               // model: Obras,
            }],
        });
    }

    //post /obras/:id/fiscalizacoes
    async create(obraId: number, dto: CreateFiscalizacoesDto): Promise<Fiscalizacoes> {
        const fiscalizacao = await this.fiscalizacoesModel.create(dto as any);
        
        const obra = await Obras.findByPk(obraId);
        if (!obra)
            throw new NotFoundException(`Obra com ID ${obraId} não encontrada`);
    
        await obra.$add('fiscalizacoes', fiscalizacao);
        return fiscalizacao;
    }
    
    //put /fiscalizacao/:id
    async update(id: number, dto: UpdateFiscalizacoesDto): Promise<Fiscalizacoes> {
        const fiscalizacao = await this.fiscalizacoesModel.findByPk(id);
        if (!fiscalizacao)
            throw new NotFoundException(`Fiscalização com ID ${id} não encontrada`);
    
        await fiscalizacao.update(dto as any);
        return fiscalizacao;
    }
    
    //patch /fiscalizacao/:id
    async patch(id: number, dto: Partial<UpdateFiscalizacoesDto>): Promise<Fiscalizacoes> {
        return this.update(id, dto);
    }
    
    //delete /fiscalizacao/:id
    async delete(id: number): Promise<void> {
        const fiscalizacao = await this.fiscalizacoesModel.findByPk(id);
        if (!fiscalizacao) {
            throw new NotFoundException(`Fiscalização com ID ${id} não encontrada`);
        }

        await fiscalizacao.destroy();
    }

    //delete /obras/:id/fiscalizacoes
    async deleteAllByObraId(obraId: number): Promise<void>{
        const obra = await Obras.findByPk(obraId, {
            include: [Fiscalizacoes],
        });

        if (!obra)
            throw new NotFoundException(`Obra com ID ${obraId} não encontrada.`);
        if (obra.fiscalizacoes.length > 0)
            await obra.$remove('fiscalizacoes', obra.fiscalizacoes);
    }
}
