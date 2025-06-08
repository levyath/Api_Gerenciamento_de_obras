import { Table, Column, Model, ForeignKey, BelongsTo, DataType, PrimaryKey } from 'sequelize-typescript';
import { Obras } from '../../obras/entities/obras.entity';
import { Fiscalizacoes } from '../../fiscalizacoes/entities/fiscalizacoes.entity';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'obras_fiscalizacoes', timestamps: true })
export class ObrasFiscalizacoes extends Model<ObrasFiscalizacoes> {
  @PrimaryKey
  @ForeignKey(() => Obras)
  @Column({ type: DataType.INTEGER, allowNull: false })
  @ApiProperty({ example: 1, description: 'ID da obra' })
  obraId: number;

  @BelongsTo(() => Obras)
  @ApiProperty({ type: () => Obras, description: 'Obra associada' })
  obra: Obras;

  @PrimaryKey
  @ForeignKey(() => Fiscalizacoes)
  @Column({ type: DataType.INTEGER, allowNull: false })
  @ApiProperty({ example: 10, description: 'ID da fiscalização' })
  fiscalizacaoId: number;

  @BelongsTo(() => Fiscalizacoes)
  @ApiProperty({ type: () => Fiscalizacoes, description: 'Fiscalização associada' })
  fiscalizacao: Fiscalizacoes;
}
