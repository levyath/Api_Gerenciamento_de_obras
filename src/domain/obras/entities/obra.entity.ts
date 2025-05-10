import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('obras')
export class Obra {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  nome: string;

  @Column({ type: 'text' })
  descricao: string;

  @Column({ type: 'enum', enum: ['Planejada', 'Em andamento', 'Concluída', 'Paralisada'], default: 'Planejada' })
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

  @Column({ length: 255 })
  endereco: string;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  longitude: number;
}