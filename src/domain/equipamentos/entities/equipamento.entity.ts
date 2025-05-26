import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Fornecedores } from '../../fornecedores/entities/fornecedores.entity';
import { Obra } from '../../obras/entities/obra.entity';

@Entity('equipamentos')
export class Equipamentos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nome: string;

  @Column({ type: 'varchar', length: 100 })
  tipo: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  marca: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  modelo: string;

  @Column({ type: 'varchar', length: 100 })
  numeroDeSerie: string;

  @ManyToOne(() => Fornecedores, { nullable: true })
  @JoinColumn({ name: 'fornecedorId' })
  fornecedor: Fornecedores;

  @Column({ type: 'varchar', length: 50, nullable: true })
  estado: string;

  @ManyToMany(() => Obra, obra => obra.equipamentos)
  @JoinTable({
    name: 'obra_equipamentos',
    joinColumn: {
      name: 'equipamento_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'obra_id',
      referencedColumnName: 'id',
    },
  })
  obras: Obra[];
}
