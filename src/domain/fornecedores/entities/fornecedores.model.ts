import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
  AllowNull,
  Unique,
  Default,
  BelongsToMany,
} from 'sequelize-typescript';
import { Obra } from '../../obras/entities/obra.model';
import { ObraFornecedor } from 'src/domain/obra-fornecedor/entities/obra-fornecedor.model';


@Table({
  tableName: 'fornecedores',
})
export class Fornecedores extends Model<Fornecedores> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  declare id: number;

  @Column({ type: DataType.STRING(255) })
  nome: string;

  @AllowNull
  @Unique
  @Column({ type: DataType.STRING(20) })
  cnpj: string;

  @AllowNull
  @Unique
  @Column({ type: DataType.STRING(100) })
  email: string;

  @AllowNull
  @Unique
  @Column({ type: DataType.STRING(20) })
  telefone: string;

  @AllowNull
  @Column({ type: DataType.STRING(255) })
  endereco: string;

  @Default(true)
  @Column(DataType.BOOLEAN)
  ativo: boolean;

  @BelongsToMany(() => Obra, () => ObraFornecedor)
  obras: Obra[];
}
