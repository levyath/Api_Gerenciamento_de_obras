import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ResponsavelTecnico } from "./entities/responsavel-tecnico.entity";
import { CreateResponsavelTecnicoDto } from './dto/create-responsavel-tecnico.dto';
import { UpdateResponsavelTecnicoDto } from './dto/update-responsavel-tecnico.dto';

@Injectable()
export class ResponsaveisTecnicosRepository {
    constructor(
        @InjectModel(ResponsavelTecnico)
        private readonly responsavelTecnicoModel: typeof ResponsavelTecnico,
    ) {}

    async findAll(): Promise<ResponsavelTecnico[]> {
        return this.responsavelTecnicoModel.findAll({
        include: [
            {
            association: 'obras',
            attributes: ['id', 'nome', 'status'],
            through: { attributes: [] },
            },
        ],
        });
    }
    
    async findById(id: number): Promise<ResponsavelTecnico | null> {
        return this.responsavelTecnicoModel.findByPk(id, {
        include: [
            {
            association: 'obras',
            attributes: ['id', 'nome', 'status'],
            through: { attributes: [] },
            },
        ],
        });
    }

    async findByCPF(cpf: string): Promise<ResponsavelTecnico | null> {
        return this.responsavelTecnicoModel.findOne({
        where: { cpf },
        include: [
            {
            association: 'obras',
            attributes: ['id', 'nome', 'status'],
            through: { attributes: [] },
            },
        ],
        });
    }

    async create(data: CreateResponsavelTecnicoDto & { obrasIds?: number[] }): Promise<ResponsavelTecnico> {
        const { obrasIds, ...responsavelData } = data;

        const novoResponsavel = await this.responsavelTecnicoModel.create(responsavelData);

        if (obrasIds && obrasIds.length > 0) {
            await novoResponsavel.$set('obras', obrasIds);
        }

        const responsavel = await this.findById(novoResponsavel.id);
        if (!responsavel) {
            throw new Error('Responsável Técnico não encontrado após criação');
        }

        return responsavel;
    }

    async update(id: number, data: UpdateResponsavelTecnicoDto & { obrasIds?: number[] }): Promise<ResponsavelTecnico | null> {
        const responsavel = await this.responsavelTecnicoModel.findByPk(id);
        if (!responsavel) return null;

        const { obrasIds, ...updateData } = data;

        await responsavel.update(updateData);

        if (obrasIds) {
        await responsavel.$set('obras', obrasIds);
        }

        return this.findById(id);
    }

    async delete(id: number): Promise<boolean> {
        const deletedCount = await this.responsavelTecnicoModel.destroy({ where: { id } });
        return deletedCount > 0 ? true : false;
    }
}