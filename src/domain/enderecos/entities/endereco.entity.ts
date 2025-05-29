import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({ tableName: 'enderecos' })
export class Endereco extends Model<Endereco> {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  rua: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  numero: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  complemento?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  bairro: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  cidade: string;

  @Column({
    type: DataType.CHAR(2),
    allowNull: false,
  })
  estado: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  cep: string;
}
