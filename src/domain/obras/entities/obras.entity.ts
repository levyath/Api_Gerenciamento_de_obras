import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  Default,
  AllowNull,
} from 'sequelize-typescript';

@Table({
  tableName: 'obras',
  timestamps: false,
})
export class Obras extends Model<Obras> {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  nome: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  descricao: string;

  @Default('Planejada')
  @Column({
    type: DataType.ENUM('Planejada', 'Em andamento', 'Concluída', 'Paralisada'),
  })
  status: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  data_inicio: Date;

  @AllowNull
  @Column({
    type: DataType.DATEONLY,
  })
  data_conclusao: Date;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  responsavel: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  orcamento_total: number;

  @Default(0)
  @Column({
    type: DataType.DECIMAL(10, 2),
  })
  gastos_atualizados: number;

  @Default(0)
  @Column({
    type: DataType.FLOAT,
  })
  percentual_concluido: number;

  @AllowNull
  @Column({
    type: DataType.DECIMAL(10, 6),
  })
  latitude: number;

  @AllowNull
  @Column({
    type: DataType.DECIMAL(10, 6),
  })
  longitude: number;
}
