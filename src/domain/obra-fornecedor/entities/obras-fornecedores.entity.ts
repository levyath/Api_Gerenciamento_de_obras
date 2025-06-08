import { Table, Column, Model, ForeignKey, DataType } from 'sequelize-typescript';
import { Obras } from '../../obras/entities/obras.entity';
import { Fornecedores } from '../../fornecedores/entities/fornecedores.entity';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'obras_fornecedores', timestamps: true })
export class ObrasFornecedores extends Model<ObrasFornecedores> {
  @ForeignKey(() => Obras)
  @Column({ type: DataType.INTEGER, allowNull: false })
  @ApiProperty({ example: 1, description: 'ID da obra associada' })
  obraId: number;

  @ForeignKey(() => Fornecedores)
  @Column({ type: DataType.INTEGER, allowNull: false })
  @ApiProperty({ example: 2, description: 'ID do fornecedor associado' })
  fornecedorId: number;
}