import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Obra } from '../../obras/entities/obra.entity';

@Entity('fornecedores')
export class Fornecedores {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  nome: string;

  @Column({ length: 20, nullable: true, unique: true })
  cnpj: string;

  @Column({ length: 100, nullable: true, unique: true })
  email: string;

  @Column({ length: 20, nullable: true, unique: true })
  telefone: string;

  @Column({ length: 255, nullable: true })
  endereco: string;

  @Column({ default: true })
  ativo: boolean;

  @ManyToMany(() => Obra, obra => obra.fornecedores)
  obras: Obra[];
}
