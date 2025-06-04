import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  BelongsToMany,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { ObrasEquipamentos } from 'src/domain/obra-equipamento/entities/obras-equipamentos.entity';
import { Fornecedores } from '../../fornecedores/entities/fornecedores.entity';
import { Obras } from 'src/domain/obras/entities/obras.entity';

@Table({ tableName: 'equipamentos', timestamps: true })
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
  

  @ForeignKey(() => Fornecedores)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  fornecedorId?: number;

  @BelongsTo(() => Fornecedores)
  fornecedor: Fornecedores;


  @BelongsToMany(() => Obras, () => ObrasEquipamentos)
    obras: Obras[];
}
