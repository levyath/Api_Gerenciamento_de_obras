import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
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

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  materiaisUtilizados: string;

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
