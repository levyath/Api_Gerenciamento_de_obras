import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
  AllowNull,
} from 'sequelize-typescript';

@Table({
  tableName: 'enderecos',
})
export class Endereco extends Model<Endereco> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  declare id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  rua: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  numero: string;

  @AllowNull
  @Column(DataType.STRING)
  complemento?: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  bairro: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  cidade: string;

  @AllowNull(false)
  @Column(DataType.CHAR(2))
  estado: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  cep: string;
}
