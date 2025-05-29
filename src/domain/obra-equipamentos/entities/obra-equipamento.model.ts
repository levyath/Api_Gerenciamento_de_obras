import { Table, Column, Model, ForeignKey, PrimaryKey } from 'sequelize-typescript';
import { Obra } from '../../obras/entities/obra.model';
import { Equipamentos } from '../../equipamentos/entities/equipamento.model';

@Table({
  tableName: 'obra_equipamentos',
  timestamps: false, // geralmente tabelas pivot não têm timestamps
})
export class ObraEquipamento extends Model<ObraEquipamento> {
  @PrimaryKey
  @ForeignKey(() => Obra)
  @Column
  obraId: number;

  @PrimaryKey
  @ForeignKey(() => Equipamentos)
  @Column
  equipamentoId: number;
}
