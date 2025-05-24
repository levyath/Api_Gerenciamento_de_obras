import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Obra } from '../../obras/entities/obra.entity';
import { Fiscalizacoes } from '../../fiscalizacoes/entities/fiscalizacoes.entity';

@Entity('obra_fiscalizacoes')
export class ObraFiscalizacoes {
    @PrimaryColumn()
    obra_id: number;

    @PrimaryColumn()
    fiscalizacoes_id: number;

    @ManyToOne(() => Obra, { eager: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'obra_id' })
    obra: Obra;

    @ManyToOne(() => Fiscalizacoes, { eager: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'fiscalizacoes_id' })
    fiscalizacao: Fiscalizacoes; 
}