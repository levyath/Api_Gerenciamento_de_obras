import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
//import { Obra } from '../../obras/entities/obra.entity';
import { Fiscalizacao } from '../../fiscalizacoes/entities/fiscalizacoes.entity';

@Entity('obra_equipamentos')
export class ObraEquipamento {
    @PrimaryColumn()
    obra_id: number;

    @PrimaryColumn()
    fiscalizacoes_id: number;  

    // @ManyToOne(() => Obra, { eager: false, onDelete: 'CASCADE' })
    // @JoinColumn({ name: 'obra_id' })
    // obra: Obra;

    @ManyToOne(() => Fiscalizacao, { eager: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'equipamento_id' })
    fiscalizacao: Fiscalizacao; 
}