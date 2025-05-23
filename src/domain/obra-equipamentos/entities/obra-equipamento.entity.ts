import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Obra } from '../../obras/entities/obra.entity';
import { Equipamentos } from '../../equipamentos/entities/equipamento.entity';

@Entity('obra_equipamentos')
export class ObraEquipamento {
  @PrimaryColumn()
  obra_id: number;

  @PrimaryColumn()
  equipamento_id: number;  

  @ManyToOne(() => Obra, { eager: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'obra_id' })
  obra: Obra;

  @ManyToOne(() => Equipamentos, { eager: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'equipamento_id' })
  equipamento: Equipamentos; 
}