import { Table, Column, Model, DataType, BelongsToMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Fornecedores } from '../../fornecedores/entities/fornecedores.entity';
import { Equipamentos } from '../../equipamentos/entities/equipamento.entity';
import { Endereco } from '../../enderecos/entities/endereco.entity';
import { Fiscalizacoes } from '../../fiscalizacoes/entities/fiscalizacoes.entity';
import { ObraFiscalizacoes } from '../../obra-fiscalizacoes/entities/obra-fiscalizacoes.entity';

@Table({ tableName: 'obras' })
export class Obra extends Model {
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    declare id: number;

    @Column({ type: DataType.STRING(255), allowNull: false })
    nome: string;

    @Column({ type: DataType.TEXT, allowNull: false })
    descricao: string;

    @Column({
        type: DataType.ENUM('Planejada', 'Em andamento', 'Concluída', 'Paralisada'),
        defaultValue: 'Planejada'
    })
    status: string;

    @Column({ type: DataType.DATE, allowNull: false })
    data_inicio: Date;

    @Column({ type: DataType.DATE, allowNull: true })
    data_conclusao: Date;

    @Column({ type: DataType.STRING(255), allowNull: false })
    responsavel: string;

    @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
    orcamento_total: number;

    @Column({ type: DataType.DECIMAL(10, 2), defaultValue: 0 })
    gastos_atualizados: number;

    @Column({ type: DataType.FLOAT, defaultValue: 0 })
    percentual_concluido: number;

    @Column({ type: DataType.DECIMAL(10, 6), allowNull: true })
    latitude: number;

    @Column({ type: DataType.DECIMAL(10, 6), allowNull: true })
    longitude: number;

    // @BelongsToMany(() => Fornecedores, { through: 'obra_fornecedor' })
    // fornecedores: Fornecedores[];

    // @BelongsToMany(() => Equipamentos, { through: 'obra_equipamentos' })
    // equipamentos: Equipamentos[];

    // @ForeignKey(() => Endereco)
    // @Column({ type: DataType.INTEGER, allowNull: true })
    // enderecoId: number;

    // @BelongsTo(() => Endereco)
    // endereco: Endereco;

    @BelongsToMany(() => Fiscalizacoes, { through: () => ObraFiscalizacoes })
    fiscalizacoes: Fiscalizacoes[];
}
