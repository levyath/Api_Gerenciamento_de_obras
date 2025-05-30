import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { Obra } from '../../obras/entities/obra.entity';
import { Fiscalizacoes } from '../../fiscalizacoes/entities/fiscalizacoes.entity';

@Table({ tableName: 'obra_fiscalizacoes' })
export class ObraFiscalizacoes extends Model {
    @ForeignKey(() => Obra)
    @Column({ type: DataType.INTEGER, allowNull: false })
    obraId: number;

    @BelongsTo(() => Obra)
    obra: Obra;

    @ForeignKey(() => Fiscalizacoes)
    @Column({ type: DataType.INTEGER, allowNull: false })
    fiscalizacaoId: number;

    @BelongsTo(() => Fiscalizacoes)
    fiscalizacao: Fiscalizacoes;
}
