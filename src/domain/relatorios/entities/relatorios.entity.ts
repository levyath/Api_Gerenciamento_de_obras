import { Table, Column, Model, DataType, ForeignKey, BelongsTo, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { Fiscalizacoes } from '../../fiscalizacoes/entities/fiscalizacoes.entity';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'relatorios', timestamps: true })
export class Relatorios extends Model<Relatorios> {
  @PrimaryKey
  @AutoIncrement
  @Column
  @ApiProperty({ example: 1, description: 'ID do relatório' })
  declare id: number;

  @Column({ type: DataType.STRING(50), allowNull: false })
  @ApiProperty({ example: 'Relatório Semanal', description: 'Título do relatório' })
  declare titulo: string;

  @Column({ type: DataType.TEXT('long'), allowNull: false })
  @ApiProperty({ example: 'Conteúdo detalhado do relatório...', description: 'Conteúdo do relatório' })
  declare conteudo: string;

  @Column({ type: DataType.DATE, allowNull: false, field: 'data_criacao' })
  @ApiProperty({ example: '2025-06-08T14:30:00Z', description: 'Data de criação do relatório' })
  declare dataCriacao: Date;

  @ForeignKey(() => Fiscalizacoes)
  @Column({ type: DataType.INTEGER, allowNull: false })
  @ApiProperty({ example: 3, description: 'ID da fiscalização associada' })
  declare fiscalizacaoId: number;

  @BelongsTo(() => Fiscalizacoes)
  declare fiscalizacao: Fiscalizacoes;
}