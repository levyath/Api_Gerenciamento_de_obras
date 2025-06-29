import {
  Table,
  Column,
  Model,
  ForeignKey,
  PrimaryKey,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { Obras } from '../../obras/entities/obras.entity';
import { ResponsavelTecnico } from 'src/domain/responsaveis-tecnicos/entities/responsavel-tecnico.entity';
import { TipoVinculoObra } from '../enums/tipo-vinculo-obra.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Table({ tableName: 'obra_responsavel_tecnico', timestamps: true })
export class ObraResponsavelTecnico extends Model {
  @PrimaryKey
  @ForeignKey(() => Obras)
  @Column({ field: 'obra_id', type: DataType.INTEGER })
  @ApiProperty({ example: 1, description: 'ID da obra vinculada' })
  declare obraId: number;

  @PrimaryKey
  @ForeignKey(() => ResponsavelTecnico)
  @Column({ field: 'responsavel_tecnico_id', type: DataType.INTEGER })
  @ApiProperty({ example: 5, description: 'ID do responsável técnico vinculado' })
  declare responsavelTecnicoId: number;

  @Column({ type: DataType.DATE, allowNull: true, field: 'data_inicio' })
  @ApiPropertyOptional({ example: '2024-01-15T00:00:00.000Z', description: 'Data de início do vínculo (opcional)' })
  declare data_inicio?: Date;

  @Column({ type: DataType.DATE, allowNull: true, field: 'data_fim' })
  @ApiPropertyOptional({ example: '2024-12-20T00:00:00.000Z', description: 'Data de término do vínculo (opcional)' })
  declare data_fim?: Date;

  @Column({ type: DataType.ENUM(...Object.values(TipoVinculoObra)), allowNull: false, defaultValue: TipoVinculoObra.RT_GERAL, field: 'tipo_vinculo' })
  @ApiProperty({ enum: TipoVinculoObra, example: TipoVinculoObra.RT_GERAL, description: 'Tipo do vínculo técnico com a obra' })
  declare tipo_vinculo: TipoVinculoObra;

  @BelongsTo(() => ResponsavelTecnico, 'responsavel_tecnico_id')
  @ApiProperty({ type: () => ResponsavelTecnico, description: 'Detalhes do responsável técnico vinculado' })
  declare responsavel: ResponsavelTecnico;

  @BelongsTo(() => Obras, 'obra_id')
  @ApiProperty({ type: () => Obras, description: 'Detalhes da obra vinculada' })
  declare obra: Obras;
}
