import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
  AllowNull,
  BelongsTo,
  ForeignKey,
  BelongsToMany,
} from 'sequelize-typescript';
import { Fornecedores } from '../../fornecedores/entities/fornecedores.model';
import { Equipamentos } from '../../equipamentos/entities/equipamento.model';

import { Endereco } from '../../enderecos/entities/endereco.model';
import { ObraFornecedor } from 'src/domain/obra-fornecedor/entities/obra-fornecedor.model';
import { ObraEquipamento } from 'src/domain/obra-equipamentos/entities/obra-equipamento.model';

@Table({
  tableName: 'obras',
})
export class Obra extends Model<Obra> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  declare id: number;

  @Column({ type: DataType.STRING(255) })
  nome: string;

  @Column(DataType.TEXT)
  descricao: string;

  @Column({
    type: DataType.ENUM('Planejada', 'Em andamento', 'Concluída', 'Paralisada'),
    defaultValue: 'Planejada',
  })
  status: string;

  @Column(DataType.DATE)
  data_inicio: Date;

  @AllowNull
  @Column(DataType.DATE)
  data_conclusao: Date;

  @Column({ type: DataType.STRING(255) })
  responsavel: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
  })
  orcamento_total: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    defaultValue: 0,
  })
  gastos_atualizados: number;

  @Column({
    type: DataType.FLOAT,
    defaultValue: 0,
  })
  percentual_concluido: number;

  @AllowNull
  @Column(DataType.DECIMAL(10, 6))
  latitude: number;

  @AllowNull
  @Column(DataType.DECIMAL(10, 6))
  longitude: number;

  // Relação ManyToMany com Fornecedores
  @BelongsToMany(() => Fornecedores, () => ObraFornecedor)
  fornecedores: Fornecedores[];

  // Relação ManyToMany com Equipamentos
  @BelongsToMany(() => Equipamentos, () => ObraEquipamento)
  declare equipamentos: Equipamentos[];

  // FK para Endereco - corrigido para nome claro e tipo explícito
  @ForeignKey(() => Endereco)
  @Column({ type: DataType.BIGINT, allowNull: true }) // ou allowNull: false, conforme regra
  enderecoId: number;

  @BelongsTo(() => Endereco)
  endereco: Endereco;
}
