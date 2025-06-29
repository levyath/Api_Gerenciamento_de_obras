import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  BelongsToMany,
} from 'sequelize-typescript';
import { ApiProperty, ApiPropertyOptional  } from '@nestjs/swagger';
import { DiarioDeObra } from 'src/domain/diario-de-obra/entities/diario-de-obra.entity';
import { DiarioMaterial } from 'src/domain/diario-materiais/diario-material.entity';

@Table({ 
  tableName: 'materiais',
  timestamps: true,
})
export class Material extends Model<Material> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  @ApiProperty({ example: 1, description: 'ID do material' })
  declare readonly id: number;

  @Column({ type: DataType.STRING(100), allowNull: false, unique: true })
  @ApiProperty({ example: 'MAT-001', description: 'Código único do material' })
  declare codigo: string;

  @Column({ type: DataType.STRING(200), allowNull: false })
  @ApiProperty({ example: 'Cimento CP II', description: 'Nome do material' })
  declare nome: string;

  @Column({ type: DataType.STRING(50), allowNull: true })
  @ApiPropertyOptional({ example: 'Saco 50kg', description: 'Unidade de medida do material' })
  declare unidadeMedida?: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  @ApiPropertyOptional({ example: 'Cimento Portland Composto',  description: 'Descrição detalhada do material' })
  declare descricao?: string;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false, defaultValue: 0.00 })
  @ApiProperty({ example: 25.99, description: 'Preço unitário do material' })
  declare precoUnitario: number;

  @Column({ type: DataType.STRING(100), allowNull: true })
  @ApiPropertyOptional({ example: 'Votorantim', description: 'Fabricante/Marca do material' })
  declare fabricante?: string;

  @Column({ type: DataType.STRING(100), allowNull: true })
  @ApiPropertyOptional({ example: 'CPB-40', description: 'Modelo/Referência do fabricante' })
  declare modelo?: string;

  @BelongsToMany(() => DiarioDeObra, () => DiarioMaterial)
  diarios: DiarioDeObra[];
}