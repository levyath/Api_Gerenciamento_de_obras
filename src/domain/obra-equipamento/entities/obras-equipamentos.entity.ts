import { Table, Column, Model, ForeignKey, PrimaryKey } from 'sequelize-typescript';
import { Obras } from '../../obras/entities/obras.entity';
import { Equipamentos } from '../../equipamentos/entities/equipamento.entity';

@Table({ tableName: 'obras_equipamentos', timestamps: true })
export class ObrasEquipamentos extends Model {
  @PrimaryKey
  @ForeignKey(() => Obras)
  @Column
  obraId: number;

  @PrimaryKey
  @ForeignKey(() => Equipamentos)
  @Column
  equipamentoId: number;
}