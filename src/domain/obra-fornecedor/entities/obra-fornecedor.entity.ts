import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Obra } from '../../obras/entities/obra.entity';
import { Fornecedores } from '../../fornecedores/entities/fornecedores.entity';

@Entity('obra_fornecedor')
export class ObraFornecedor {
  @PrimaryColumn()
  obra_id: number;

  @PrimaryColumn()
  fornecedor_id: number;

  @ManyToOne(() => Obra, { eager: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'obra_id' })
  obra: Obra;

  @ManyToOne(() => Fornecedores, { eager: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'fornecedor_id' })
  fornecedor: Fornecedores;
}