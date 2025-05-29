import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
  AllowNull,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript';
import { Fornecedores } from '../../fornecedores/entities/fornecedores.model';
import { Obra } from '../../obras/entities/obra.model';
import { ObraEquipamento } from 'src/domain/obra-equipamentos/entities/obra-equipamento.model';



@Table({
  tableName: 'equipamentos',
})
export class Equipamentos extends Model<Equipamentos> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  declare id: number;

  @Column({ type: DataType.STRING(255) })
  nome: string;

  @Column({ type: DataType.STRING(100) })
  tipo: string;

  @AllowNull
  @Column({ type: DataType.STRING(100) })
  marca: string;

  @AllowNull
  @Column({ type: DataType.STRING(100) })
  modelo: string;

  @Column({ type: DataType.STRING(100) })
  numeroDeSerie: string;

  @AllowNull
  @ForeignKey(() => Fornecedores)
  @Column
  declare fornecedorId: number;

  @BelongsTo(() => Fornecedores)
  fornecedor: Fornecedores;

  @AllowNull
  @Column({ type: DataType.STRING(50) })
  estado: string;

  @BelongsToMany(() => Obra, () => ObraEquipamento)
  declare obras: Obra[];
}
