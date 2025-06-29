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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Table({ tableName: 'equipamentos', timestamps: true })
export class Equipamentos extends Model<Equipamentos> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  @ApiProperty({ example: 1, description: 'ID do equipamento' })
  declare id: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  @ApiProperty({ example: 'Betoneira 400L', description: 'Nome do equipamento' })
  declare nome: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  @ApiProperty({ example: 'Máquina', description: 'Tipo do equipamento' })
  declare tipo: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  @ApiPropertyOptional({ example: 'Makita', description: 'Marca do equipamento (opcional)' })
  declare marca?: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  @ApiPropertyOptional({ example: 'MX400', description: 'Modelo do equipamento (opcional)' })
  declare modelo?: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    field: 'numeroDeSerie',
  })
  @ApiProperty({ example: 'SN-ABC123456', description: 'Número de série do equipamento' })
  declare numeroDeSerie: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  @ApiPropertyOptional({ example: 'Em uso', description: 'Estado atual do equipamento (opcional)' })
  declare estado?: string;

  @ForeignKey(() => Fornecedores)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  @ApiPropertyOptional({ example: 5, description: 'ID do fornecedor do equipamento (opcional)' })
  declare fornecedorId?: number;

  @BelongsTo(() => Fornecedores)
  @ApiPropertyOptional({ type: () => Fornecedores, description: 'Fornecedor associado ao equipamento' })
  declare fornecedor?: Fornecedores;

  @BelongsToMany(() => Obras, () => ObrasEquipamentos)
  @ApiPropertyOptional({ type: () => [Obras], description: 'Obras nas quais o equipamento está sendo utilizado' })
  declare obras?: Obras[];
}