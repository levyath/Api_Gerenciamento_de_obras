import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript';
import { DiarioMaterial } from 'src/domain/diario-materiais/diario-material.entity';
import { Material } from 'src/domain/materiais/entities/material.entity';
import { Obras } from 'src/domain/obras/entities/obras.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Table({ tableName: 'diarios_obra', timestamps: true })
export class DiarioDeObra extends Model<DiarioDeObra> {
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  @ApiProperty({ example: '2025-06-08', description: 'Data do registro no diário de obra' })
  declare data: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  @ApiPropertyOptional({ example: 'Ensolarado com poucas nuvens', description: 'Descrição do clima no dia' })
  declare clima?: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  @ApiPropertyOptional({ example: 'Fundação concluída, início da alvenaria', description: 'Atividades executadas no dia' })
  declare atividadesExecutadas?: string;

  @BelongsToMany(() => Material, () => DiarioMaterial)
  @ApiPropertyOptional({ example: 'Cimento, areia, blocos de concreto', description: 'Materiais utilizados na obra' })
  declare materiaisUtilizados: Material[];

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  @ApiPropertyOptional({ example: 'Equipe reduzida devido a feriado', description: 'Observações adicionais do dia' })
  declare observacoes?: string;

  @ForeignKey(() => Obras)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ApiProperty({ example: 42, description: 'ID da obra relacionada a este diário' })
  declare obraId: number;

  @BelongsTo(() => Obras)
  @ApiProperty({ type: () => Obras, description: 'Obra associada a este diário de obra' })
  declare obra: Obras;
}