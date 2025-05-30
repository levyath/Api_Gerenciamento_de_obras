import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { Obras } from '../../obras/entities/obras.entity';
import { Fornecedores } from '../../fornecedores/entities/fornecedores.entity';

@Table({ tableName: 'obras_fornecedores', timestamps: false })
export class ObrasFornecedores extends Model {
  @ForeignKey(() => Obras)
  @Column
  obraId: number;

  @ForeignKey(() => Fornecedores)
  @Column
  fornecedorId: number;
}