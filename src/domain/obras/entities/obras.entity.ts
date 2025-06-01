import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  Default,
  AllowNull,
  BelongsTo,
  ForeignKey,
  BelongsToMany,
} from 'sequelize-typescript';
import { Endereco } from 'src/domain/enderecos/entities/endereco.entity';
import { Fornecedores } from 'src/domain/fornecedores/entities/fornecedores.entity';
import { Equipamentos } from 'src/domain/equipamentos/entities/equipamento.entity';
import { ObrasFornecedores } from 'src/domain/obra-fornecedor/entities/obras-fornecedores.entity';
import { ObrasEquipamentos } from 'src/domain/obra-equipamento/entities/obras-equipamentos.entity';

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
  declare nome: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare descricao: string;

  @Default('Planejada')
  @Column({
    type: DataType.ENUM('Planejada', 'Em andamento', 'Concluída', 'Paralisada'),
  })
  declare status: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  declare data_inicio: Date;

  @AllowNull
  @Column({
    type: DataType.DATEONLY,
  })
  declare data_conclusao: Date;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  declare responsavel: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  declare orcamento_total: number;

  @Default(0)
  @Column({
    type: DataType.DECIMAL(10, 2),
  })
  declare gastos_atualizados: number;

  @Default(0)
  @Column({
    type: DataType.FLOAT,
  })
  declare percentual_concluido: number;

  @AllowNull
  @Column({
    type: DataType.DECIMAL(10, 6),
  })
  declare latitude: number;

  @AllowNull
  @Column({
    type: DataType.DECIMAL(10, 6),
  })
  declare longitude: number;

  @ForeignKey(() => Endereco)
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare enderecoId: number | null;

  @BelongsTo(() => Endereco)
  declare endereco: Endereco;
  
  @BelongsToMany(() => Fornecedores, () => ObrasFornecedores)
  declare fornecedores: Fornecedores[];

  @BelongsToMany(() => Equipamentos, () => ObrasEquipamentos)
  declare equipamentos: Equipamentos[];
}