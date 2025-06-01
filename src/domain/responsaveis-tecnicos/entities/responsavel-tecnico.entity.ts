import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
  HasMany,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { ObraResponsavelTecnico } from '../../obra-responsavel-tecnico/entities/obra-responsavel-tecnico.entity';
import { ApiProperty, ApiPropertyOptional  } from '@nestjs/swagger';
import { Obras } from 'src/domain/obras/entities/obras.entity';

@Table({
  tableName: 'responsaveis_tecnicos',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class ResponsavelTecnico extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  @ApiProperty({ example: 1, description: 'ID do responsável técnico' })
  declare readonly id: number;

  @Column({ type: DataType.STRING(255), allowNull: false })
  @ApiProperty({ example: 'João da Silva', description: 'Nome completo do responsável técnico' })
  declare nome: string;

  @Column({ type: DataType.STRING(14), allowNull: false })
  @ApiProperty({ example: '123.456.789-01', description: 'CPF do responsável técnico' })
  declare cpf: string;

  @Column({ type: DataType.STRING(50), allowNull: false })
  @ApiProperty({ example: 'CREA-123456', description: 'Número do registro profissional' })
  declare registro_profissional: string;

  @Column({ type: DataType.STRING(100), allowNull: false })
  @ApiProperty({ example: 'Engenharia Civil', description: 'Especialidade do responsável técnico' })
  declare especialidade: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  @ApiProperty({ example: false, description: 'Indicador se o responsável técnico está ativo' })
  declare ativo: boolean;

  @BelongsToMany(() => Obras, () => ObraResponsavelTecnico)
  @ApiPropertyOptional({ type: () => [Obras], description: 'Lista de obras vinculadas ao responsável técnico' })
  declare obras?: Obras[];
}