import { Table, Column, Model, DataType, BelongsToMany, PrimaryKey, AutoIncrement, HasMany, AllowNull } from 'sequelize-typescript';
import { Obras } from '../../obras/entities/obras.entity';
import { ObrasFiscalizacoes } from 'src/domain/obra-fiscalizacoes/entities/obras-fiscalizacoes.entity';
import { Relatorios } from 'src/domain/relatorios/entities/relatorios.entity';
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
    data_inicio: Date;

    @AllowNull
    @Column({ type: DataType.DATE })
    data_fim: Date;

    @Column({ type: DataType.STRING(20), allowNull: false})
    status: string;

    @BelongsToMany(() => Obras, () => ObrasFiscalizacoes)
    obras: Obras[];

    @HasMany(() => Relatorios)
    relatorios: Relatorios[];

    //pendente Levy
    //@ManyToOne(() => ResponsavelTecnico, { nullable: true })
    //responsavel: ResponsavelTecnico;

}
