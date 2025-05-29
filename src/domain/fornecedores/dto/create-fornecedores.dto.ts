import { Obra } from 'src/domain/obras/entities/obra.model';

export class CreateFornecedorDto {
  nome: string;
  cnpj?: string;
  email?: string;
  telefone?: string;
  endereco?: string;
  ativo?: boolean;
  obras?: Obra[];
}