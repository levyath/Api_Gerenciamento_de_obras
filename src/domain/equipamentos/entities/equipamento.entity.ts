import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

@Table({ tableName: 'equipamentos', timestamps: false })
export class Equipamentos extends Model<Equipamentos> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  nome: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  tipo: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  marca: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  modelo: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    field: 'numeroDeSerie',
  })
  numeroDeSerie: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  estado: string;
}
