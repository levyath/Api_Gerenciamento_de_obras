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
import { ResponsavelTecnico } from 'src/domain/responsaveis-tecnicos/entities/responsavel-tecnico.entity';
import { ObraResponsavelTecnico } from 'src/domain/obra-responsavel-tecnico/entities/obra-responsavel-tecnico.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Table({
  tableName: 'obras',
  timestamps: true,
})
export class Obras extends Model<Obras> {
  @PrimaryKey
  @AutoIncrement
  @Column
  @ApiProperty({ example: 1, description: 'ID da obra' })
  declare id: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  @ApiProperty({ example: 'Construção Residencial XYZ', description: 'Nome da obra' })
  declare nome: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  @ApiProperty({ example: 'Construção de um condomínio residencial de 10 unidades', description: 'Descrição detalhada da obra' })
  declare descricao: string;

  @Default('Planejada')
  @Column({
    type: DataType.ENUM('Planejada', 'Em andamento', 'Concluída', 'Paralisada'),
  })
  @ApiProperty({ example: 'Planejada', description: 'Status atual da obra' })
  declare status: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  @ApiProperty({ example: '2025-06-01', description: 'Data de início da obra' })
  declare data_inicio: Date;

  @AllowNull
  @Column({
    type: DataType.DATEONLY,
  })
  @ApiPropertyOptional({ example: '2025-12-31', description: 'Data de conclusão da obra' })
  declare data_conclusao: Date | null;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  @ApiProperty({ example: 500000.00, description: 'Orçamento total da obra' })
  declare orcamento_total: number;

  @Default(0)
  @Column({
    type: DataType.DECIMAL(10, 2),
  })
  @ApiProperty({ example: 120000.00, description: 'Gastos atualizados da obra' })
  declare gastos_atualizados: number;

  @Default(0)
  @Column({
    type: DataType.FLOAT,
  })
  @ApiProperty({ example: 24.5, description: 'Percentual concluído da obra' })
  declare percentual_concluido: number;

  @AllowNull
  @Column({
    type: DataType.DECIMAL(10, 6),
  })
  @ApiPropertyOptional({ example: -23.55052, description: 'Latitude da localização da obra' })
  declare latitude: number | null;

  @AllowNull
  @Column({
    type: DataType.DECIMAL(10, 6),
  })
  @ApiPropertyOptional({ example: -46.633308, description: 'Longitude da localização da obra' })
  declare longitude: number | null;

  @ForeignKey(() => Endereco)
  @AllowNull
  @Column({ type: DataType.INTEGER })
  @ApiPropertyOptional({ example: 10, description: 'ID do endereço associado à obra' })
  declare enderecoId: number | null;

  @BelongsTo(() => Endereco)
  @ApiProperty({ type: () => Endereco, description: 'Endereço associado à obra' })
  declare endereco: Endereco;

  @BelongsToMany(() => Fornecedores, () => ObrasFornecedores)
  @ApiProperty({ type: () => [Fornecedores], description: 'Lista de fornecedores associados à obra' })
  declare fornecedores: Fornecedores[];

  @BelongsToMany(() => Equipamentos, () => ObrasEquipamentos)
  @ApiProperty({ type: () => [Equipamentos], description: 'Lista de equipamentos associados à obra' })
  declare equipamentos: Equipamentos[];

  @BelongsToMany(() => ResponsavelTecnico, () => ObraResponsavelTecnico)
  @ApiProperty({ type: () => [ResponsavelTecnico], description: 'Lista de responsáveis técnicos pela obra' })
  declare responsaveisTecnicos: ResponsavelTecnico[];

  @BelongsToMany(() => Fiscalizacoes, () => ObrasFiscalizacoes)
  @ApiProperty({ type: () => [Fiscalizacoes], description: 'Lista de fiscalizações relacionadas à obra' })
  declare fiscalizacoes: Fiscalizacoes[];
}
