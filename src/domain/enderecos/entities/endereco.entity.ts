import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Obra } from '../../obras/entities/obra.entity';

@Entity('enderecos')
export class Endereco {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  rua: string;

  @Column({ type: 'varchar', nullable: false })
  numero: string;

  @Column({ type: 'varchar', nullable: true })
  complemento?: string;

  @Column({ type: 'varchar', nullable: false })
  bairro: string;

  @Column({ type: 'varchar', nullable: false })
  cidade: string;

  @Column({ type: 'char', length: 2, nullable: false })
  estado: string;

  @Column({ type: 'varchar', nullable: false })
  cep: string;

}