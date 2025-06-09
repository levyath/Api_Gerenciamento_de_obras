import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { DiarioDeObra } from '../diario-de-obra/entities/diario-de-obra.entity';
import { Material } from '../materiais/entities/material.entity';

@Table({ tableName: 'diario_material' })
export class DiarioMaterial extends Model<DiarioMaterial> {
  @ForeignKey(() => DiarioDeObra)
  @Column
  diarioDeObraId: number;

  @ForeignKey(() => Material)
  @Column
  materialId: number;
}
