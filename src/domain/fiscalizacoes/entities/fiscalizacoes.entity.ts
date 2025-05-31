import { Table, Column, Model, DataType, BelongsToMany, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement, HasMany } from 'sequelize-typescript';
import { Obras } from '../../obras/entities/obras.entity';
import { ObrasFiscalizacoes } from 'src/domain/obra-fiscalizacoes/entities/obras-fiscalizacoes.entity';
//import { Relatorio } from 'src/domain/relatorios/entities/relatorio.entity'; todo
//import { ResponsavelTecnico } from 'src/domain/responsaveis-tecnicos/entities/responsavel.entity'; pendente Levy

@Table({ tableName: 'fiscalizacoes', timestamps: false })
export class Fiscalizacoes extends Model<Fiscalizacoes> {
    @PrimaryKey
    @AutoIncrement
    @Column
    declare id: number;

    @Column({ type: DataType.STRING(50), allowNull: false })
    titulo: string;

    @Column({ type: DataType.STRING(255), allowNull: false })
    descricao: string;

    @Column({ type: DataType.DATE, allowNull: false })
    data: Date;

    @Column({ type: DataType.STRING(20), allowNull: false})
    status: string;

    @BelongsToMany(() => Obras, () => ObrasFiscalizacoes)
    obras: Obras[];

    //pendente Levy
    //@ManyToOne(() => ResponsavelTecnico, { nullable: true })
    //responsavel: ResponsavelTecnico;

    //pendente Eu
    //@OneToMany(() => Relatorio, relatorio => relatorio.fiscalizacao, { cascade: true })
    //relatorios: Relatorio[];
}
