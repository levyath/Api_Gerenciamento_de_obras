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

@Table({ tableName: 'diarios_obra', timestamps: true })
export class DiarioDeObra extends Model<DiarioDeObra> {
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  data: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  clima: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  atividadesExecutadas: string;

 @BelongsToMany(() => Material, () => DiarioMaterial)
  materiaisUtilizados: Material[];

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  observacoes: string;

  @ForeignKey(() => Obras)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  obraId: number;

  @BelongsTo(() => Obras)
  obra: Obras;
}
