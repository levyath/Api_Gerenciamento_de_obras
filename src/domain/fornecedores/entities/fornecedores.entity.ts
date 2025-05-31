import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  Unique,
  AllowNull,
  Default,
  BelongsToMany,
} from 'sequelize-typescript';
import { ObrasFornecedores } from 'src/domain/obra-fornecedor/entities/obras-fornecedores.entity';
import { Obras } from 'src/domain/obras/entities/obras.entity';

@Table({
  tableName: 'fornecedores',
  timestamps: false,
})
export class Fornecedores extends Model<Fornecedores> {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  nome: string;

  @Unique
  @AllowNull
  @Column({
    type: DataType.STRING(20),
  })
  cnpj: string;

  @Unique
  @AllowNull
  @Column({
    type: DataType.STRING(100),
  })
  email: string;

  @Unique
  @AllowNull
  @Column({
    type: DataType.STRING(20),
  })
  telefone: string;

  @AllowNull
  @Column({
    type: DataType.STRING(255),
  })
  endereco: string;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
  })
  ativo: boolean;

  @BelongsToMany(() => Obras, () => ObrasFornecedores)
  obrasId: Obras[];
}
