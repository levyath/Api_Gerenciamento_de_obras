import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { Obras } from '../../obras/entities/obras.entity';
import { Fiscalizacoes } from '../../fiscalizacoes/entities/fiscalizacoes.entity';

@Table({ tableName: 'obras_fiscalizacoes' })
export class ObrasFiscalizacoes extends Model {
    @ForeignKey(() => Obras)
    @Column({ type: DataType.INTEGER, allowNull: false })
    obraId: number;

    @BelongsTo(() => Obras)
    obra: Obras;

    @ForeignKey(() => Fiscalizacoes)
    @Column({ type: DataType.INTEGER, allowNull: false })
    fiscalizacaoId: number;

    @BelongsTo(() => Fiscalizacoes)
    fiscalizacao: Fiscalizacoes;
}