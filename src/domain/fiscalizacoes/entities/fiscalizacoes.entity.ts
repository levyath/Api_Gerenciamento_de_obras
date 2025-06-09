import { Table, Column, Model, DataType, BelongsToMany, PrimaryKey, AutoIncrement, HasMany, AllowNull, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Obras } from '../../obras/entities/obras.entity';
import { ObrasFiscalizacoes } from 'src/domain/obra-fiscalizacoes/entities/obras-fiscalizacoes.entity';
import { Relatorios } from 'src/domain/relatorios/entities/relatorios.entity';
import { ResponsavelTecnico } from 'src/domain/responsaveis-tecnicos/entities/responsavel-tecnico.entity';
import { FiscalizacaoStatus } from '../enums/fiscalizacoes-status.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Table({ tableName: 'fiscalizacoes', timestamps: true })
export class Fiscalizacoes extends Model<Fiscalizacoes> {
  @PrimaryKey
  @AutoIncrement
  @Column
  @ApiProperty({ example: 1, description: 'ID único da fiscalização' })
  declare id: number;

  @Column({ type: DataType.STRING(50), allowNull: false })
  @ApiProperty({ example: 'Visita técnica inicial', description: 'Título da fiscalização' })
  declare titulo: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  @ApiProperty({ example: 'Inspeção para verificação da fundação', description: 'Descrição detalhada da fiscalização' })
  declare descricao: string;

  @Column({ type: DataType.DATE, allowNull: false })
  @ApiProperty({ example: '2025-06-01', description: 'Data de início da fiscalização' })
  declare data_inicio: Date;

  @AllowNull
  @Column({ type: DataType.DATE })
  @ApiPropertyOptional({ example: '2025-06-08', description: 'Data de término da fiscalização (se aplicável)' })
  declare data_fim?: Date;

  @Column({ type: DataType.STRING(20), allowNull: false })
  @ApiProperty({ example: 'Em andamento', description: 'Status atual da fiscalização' })
  declare status: FiscalizacaoStatus;

  @BelongsToMany(() => Obras, () => ObrasFiscalizacoes)
  @ApiPropertyOptional({ type: () => [Obras], description: 'Lista de obras associadas a esta fiscalização' })
  declare obras: Obras[];

  @HasMany(() => Relatorios)
  @ApiPropertyOptional({ type: () => [Relatorios], description: 'Relatórios gerados durante a fiscalização' })
  declare relatorios: Relatorios[];

  @ForeignKey(() => ResponsavelTecnico)
  @Column({ type: DataType.INTEGER, allowNull: false })
  @ApiProperty({ example: 3, description: 'ID do responsável técnico pela fiscalização' })
  declare responsavelTecnicoId: number;

  @BelongsTo(() => ResponsavelTecnico)
  @ApiProperty({ type: () => ResponsavelTecnico, description: 'Responsável técnico vinculado à fiscalização' })
  declare responsavelTecnico: ResponsavelTecnico;
}