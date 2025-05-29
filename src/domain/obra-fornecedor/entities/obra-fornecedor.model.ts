import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Obra } from '../../obras/entities/obra.model';
import { Fornecedores } from '../../fornecedores/entities/fornecedores.model';

@Table({
  tableName: 'obra_fornecedor',
  timestamps: false,
})
export class ObraFornecedor extends Model {
  @ForeignKey(() => Obra)
  @Column
  obra_id: number;

  @ForeignKey(() => Fornecedores)
  @Column
  fornecedor_id: number;

  @BelongsTo(() => Obra, { onDelete: 'CASCADE' })
  obra: Obra;

  @BelongsTo(() => Fornecedores, { onDelete: 'CASCADE' })
  fornecedor: Fornecedores;
}
