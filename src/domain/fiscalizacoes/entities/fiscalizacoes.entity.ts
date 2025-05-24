import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    JoinTable,
} from 'typeorm';
//import { Obra } from 'src/domain/obras/entities/obra.entity'; todo
//import { Relatorio } from 'src/domain/relatorios/entities/relatorio.entity'; todo
//import { ResponsavelTecnico } from 'src/domain/responsaveis-tecnicos/entities/responsavel.entity'; pendente Levy
  
@Entity('fiscalizacoes')
export class Fiscalizacao {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;

    @Column({ nullable: true })
    descricao: string;

    @Column({ type: 'date' })
    data: Date;

    // to-do
    // @ManyToMany(() => Obra, obra => obra.fiscalizacoes)
    // @JoinTable({
    //     name: 'obra_fiscalizacoes',
    //     joinColumn: {
    //         name: 'fiscalizacoes_id',
    //         referencedColumnName: 'id',
    //     },
    //     inverseJoinColumn: {
    //         name: 'obra_id',
    //         referencedColumnName: 'id',
    //     }
    // })
    // obra: Obra[];

    //pendente Levy
    //@ManyToOne(() => ResponsavelTecnico, { nullable: true })
    //responsavel: ResponsavelTecnico;

    //pendente Eu
    //@OneToMany(() => Relatorio, relatorio => relatorio.fiscalizacao, { cascade: true })
    //relatorios: Relatorio[];
  
    @CreateDateColumn()
    criadoEm: Date;
  
    @UpdateDateColumn()
    atualizadoEm: Date;
}
  