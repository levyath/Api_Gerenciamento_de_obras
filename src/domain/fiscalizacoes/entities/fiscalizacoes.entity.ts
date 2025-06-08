import { Table, Column, Model, DataType, BelongsToMany, PrimaryKey, AutoIncrement, HasMany, AllowNull, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Obras } from '../../obras/entities/obras.entity';
import { ObrasFiscalizacoes } from 'src/domain/obra-fiscalizacoes/entities/obras-fiscalizacoes.entity';
import { Relatorios } from 'src/domain/relatorios/entities/relatorios.entity';
import { ResponsavelTecnico } from 'src/domain/responsaveis-tecnicos/entities/responsavel-tecnico.entity';

@Table({ tableName: 'fiscalizacoes', timestamps: true })
export class Fiscalizacoes extends Model<Fiscalizacoes> {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @Column({ type: DataType.STRING(50), allowNull: false })
  declare titulo: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare descricao: string;

  @Column({ type: DataType.DATE, allowNull: false })
  declare data_inicio: Date;

  @AllowNull
  @Column({ type: DataType.DATE })
  declare data_fim: Date;

  @Column({ type: DataType.STRING(20), allowNull: false })
  declare status: string;

  @BelongsToMany(() => Obras, () => ObrasFiscalizacoes)
  declare obras: Obras[];

  @HasMany(() => Relatorios)
  declare relatorios: Relatorios[];

  @ForeignKey(() => ResponsavelTecnico)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare responsavelTecnicoId: number;

  @BelongsTo(() => ResponsavelTecnico)
  declare responsavelTecnico: ResponsavelTecnico;
}
