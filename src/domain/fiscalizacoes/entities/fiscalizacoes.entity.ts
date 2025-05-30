import { Table, Column, Model, DataType, BelongsToMany, CreatedAt, UpdatedAt, PrimaryKey } from 'sequelize-typescript';
import { Obra } from '../../obras/entities/obra.entity';
import { ObraFiscalizacoes } from '../../obra-fiscalizacoes/entities/obra-fiscalizacoes.entity';
import { InferAttributes, InferCreationAttributes } from 'sequelize';
//import { Relatorio } from 'src/domain/relatorios/entities/relatorio.entity'; todo
//import { ResponsavelTecnico } from 'src/domain/responsaveis-tecnicos/entities/responsavel.entity'; pendente Levy

@Table({ timestamps: false, tableName: 'fiscalizacoes' })
export class Fiscalizacoes extends Model<
    InferAttributes<Fiscalizacoes>,
    InferCreationAttributes<Fiscalizacoes>
> {
    @PrimaryKey
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    declare id?: number;

    @Column({ type: DataType.STRING(50), allowNull: false })
    titulo: string;

    @Column({ type: DataType.STRING(255), allowNull: false })
    descricao: string;

    @Column({ type: DataType.DATE, allowNull: false })
    data: Date;

    @BelongsToMany(() => Obra, () => ObraFiscalizacoes)
    obras: Obra[];

    //pendente Levy
    //@ManyToOne(() => ResponsavelTecnico, { nullable: true })
    //responsavel: ResponsavelTecnico;

    //pendente Eu
    //@OneToMany(() => Relatorio, relatorio => relatorio.fiscalizacao, { cascade: true })
    //relatorios: Relatorio[];
}
