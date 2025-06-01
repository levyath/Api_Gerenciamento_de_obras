import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ResponsavelTecnico } from "./entities/responsavel-tecnico.entity";

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
}