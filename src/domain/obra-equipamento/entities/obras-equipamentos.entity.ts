import { Table, Column, Model, ForeignKey, DataType, PrimaryKey } from 'sequelize-typescript';
import { Obras } from '../../obras/entities/obras.entity';
import { Equipamentos } from '../../equipamentos/entities/equipamento.entity';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'obras_equipamentos', timestamps: true })
export class ObrasEquipamentos extends Model {
  @PrimaryKey
  @ForeignKey(() => Obras)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ApiProperty({ example: 1, description: 'ID da obra associada' })
  obraId: number;

  @PrimaryKey
  @ForeignKey(() => Equipamentos)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ApiProperty({ example: 5, description: 'ID do equipamento associado' })
  equipamentoId: number;
}
