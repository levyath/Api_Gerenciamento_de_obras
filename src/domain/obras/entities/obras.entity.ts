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
import { Fiscalizacoes } from 'src/domain/fiscalizacoes/entities/fiscalizacoes.entity';
import { ObrasFiscalizacoes } from 'src/domain/obra-fiscalizacoes/entities/obras-fiscalizacoes.entity';

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

 @ForeignKey(() => Endereco)
  @Column({ type: DataType.INTEGER, allowNull: true })
  enderecoId: number;

  @BelongsTo(() => Endereco)
  endereco: Endereco;
  
  @BelongsToMany(() => Fornecedores, () => ObrasFornecedores)
  fornecedores: Fornecedores[];

  @BelongsToMany(() => Equipamentos, () => ObrasEquipamentos)
  equipamentos: Equipamentos[];

  @BelongsToMany(() => Fiscalizacoes, () => ObrasFiscalizacoes)
  fiscalizacoes: Fiscalizacoes[];
}
