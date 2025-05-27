import {Entity, PrimaryGeneratedColumn,Column,ManyToOne,JoinColumn, ManyToMany, JoinTable,} from 'typeorm';
import { Fornecedores } from '../../fornecedores/entities/fornecedores.entity';
import { Equipamentos } from '../../equipamentos/entities/equipamento.entity';
import { Endereco } from '../../enderecos/entities/endereco.entity';
import { Fiscalizacoes } from 'src/domain/fiscalizacoes/entities/fiscalizacoes.entity';

@Entity('obras')
export class Obra {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  nome: string;

  @Column({ type: 'text' })
  descricao: string;

  @Column({
    type: 'enum',
    enum: ['Planejada', 'Em andamento', 'Concluída', 'Paralisada'],
    default: 'Planejada',
  })
  status: string;

  @Column({ type: 'date' })
  data_inicio: Date;

  @Column({ type: 'date', nullable: true })
  data_conclusao: Date;

  @Column({ length: 255 })
  responsavel: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  orcamento_total: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  gastos_atualizados: number;

  @Column({ type: 'float', default: 0 })
  percentual_concluido: number;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  longitude: number;

  @ManyToMany(() => Fornecedores, fornecedor => fornecedor.obras)
  @JoinTable({
    name: 'obra_fornecedor',
    joinColumn: { name: 'obra_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'fornecedor_id', referencedColumnName: 'id' },
  })
  fornecedores: Fornecedores[];

 @ManyToMany(() => Equipamentos, equipamento => equipamento.obras)
  equipamentos: Equipamentos[];

  @ManyToOne(() => Endereco, { eager: true, nullable: true })
  @JoinColumn({ name: 'endereco' })  
  endereco: Endereco;

  @ManyToMany(() => Fiscalizacoes, fiscalizacao => fiscalizacao.obras)
  fiscalizacoes: Fiscalizacoes[];
} 