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
} from 'sequelize-typescript';

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
}
