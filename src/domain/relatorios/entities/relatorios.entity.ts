import { Table, Column, Model, DataType, ForeignKey, BelongsTo, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { Fiscalizacoes } from '../../fiscalizacoes/entities/fiscalizacoes.entity';

@Table({ tableName: 'relatorios' })
export class Relatorios extends Model<Relatorios> {

    @PrimaryKey
    @AutoIncrement
    @Column
    declare id: number;

    @Column({ type: DataType.STRING(50), allowNull: false })
    titulo: string;

    @Column({ type: DataType.TEXT('long'), allowNull: false })
    conteudo: string;

    @Column({ type: DataType.DATE, allowNull: false })
    data_criacao: Date;

    @ForeignKey(() => Fiscalizacoes)
    @Column({ type: DataType.INTEGER, allowNull: false })
    fiscalizacaoId: number;

    @BelongsTo(() => Fiscalizacoes)
    fiscalizacao: Fiscalizacoes;
}
