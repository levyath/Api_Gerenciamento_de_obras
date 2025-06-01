import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Material } from './entities/material.entity';
import { Op, Sequelize } from 'sequelize';

@Injectable()
export class MaterialRepository {
    constructor(
        @InjectModel(Material)
        private readonly materialModel: typeof Material,
    ) {}

    async findByCodigo(codigo: string): Promise<Material | null> {
        return this.materialModel.findOne({
        where: { codigo },
        });
    }

    async create(dto: any): Promise<Material> {
        return this.materialModel.create(dto);
    }

    async findAll(): Promise<Material[]> {
        return this.materialModel.findAll({
        order: [['nome', 'ASC']],
        });
    }

    async findById(id: number): Promise<Material | null> {
        return this.materialModel.findByPk(id);
    }

    async update(id: number, dto: any): Promise<[number]> {
        return this.materialModel.update(dto, {
        where: { id },
        });
    }

    // async countVinculos(id: number): Promise<number> {
    //     const result = await this.materialModel.findByPk(id, {
    //         include: [{
    //             association: 'obras',
    //             attributes: [],
    //             required: false,
    //             through: { attributes: [] }
    //         }],
    //         attributes: [
    //             [Sequelize.fn('COUNT', Sequelize.col('obras.id')), 'vinculosCount']
    //         ],
    //         group: ['Material.id'],
    //         raw: true,
    //         plain: true
    //     }) as unknown as { vinculosCount: number }; // Type assertion for raw query result

    //     return result?.vinculosCount || 0;
    // }

    async delete(id: number): Promise<number> {
        return this.materialModel.destroy({
        where: { id },
        });
    }
}