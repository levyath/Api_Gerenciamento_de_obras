/* eslint-disable prettier/prettier */
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { Obras } from 'src/domain/obras/entities/obras.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum EtapaStatus {
  NAO_INICIADA = 'Nao iniciada',
  EM_ANDAMENTO = 'Em andamento',
  CONCLUIDA = 'Concluída',
  ATRASADA = 'Atrasada',
}

@Table({ tableName: 'etapas_obra', timestamps: true })
export class EtapasDaObra extends Model<EtapasDaObra> {
  @PrimaryKey
  @AutoIncrement
  @Column
  @ApiProperty({ example: 1, description: 'ID da etapa da obra' })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty({ example: 'Fundação', description: 'Nome da etapa da obra' })
  declare nome: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  @ApiPropertyOptional({ example: 'Escavação e concretagem das sapatas.', description: 'Descrição detalhada da etapa (opcional)' })
  declare descricao?: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  @ApiProperty({ example: '2025-07-01', description: 'Data de início prevista da etapa' })
  declare dataInicioPrevista: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  @ApiProperty({ example: '2025-07-15', description: 'Data de término prevista da etapa' })
  declare dataFimPrevista: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  @ApiPropertyOptional({ example: '2025-07-02', description: 'Data de início real da etapa (opcional)' })
  declare dataInicioReal?: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  @ApiPropertyOptional({ example: '2025-07-16', description: 'Data de término real da etapa (opcional)' })
  declare dataFimReal?: Date;

  @Column({
    type: DataType.ENUM(...Object.values(EtapaStatus)),
    defaultValue: EtapaStatus.NAO_INICIADA,
  })
  @ApiProperty({
    example: EtapaStatus.NAO_INICIADA,
    description: 'Status atual da etapa da obra',
    enum: EtapaStatus,
  })
  declare status: EtapaStatus;

  @ForeignKey(() => Obras)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ApiProperty({ example: 3, description: 'ID da obra relacionada à etapa' })
  declare obraId: number;

  @BelongsTo(() => Obras)
  @ApiPropertyOptional({ type: () => Obras, description: 'Obra à qual a etapa está relacionada' })
  declare obra?: Obras;
}