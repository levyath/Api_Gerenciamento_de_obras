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
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nome: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  descricao: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  dataInicioPrevista: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  dataFimPrevista: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  dataInicioReal: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  dataFimReal: Date;

  @Column({
    type: DataType.ENUM(...Object.values(EtapaStatus)),
    defaultValue: EtapaStatus.NAO_INICIADA,
  })
  status: EtapaStatus;

  @ForeignKey(() => Obras)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  obraId: number;

  @BelongsTo(() => Obras)
  obra: Obras;
}
