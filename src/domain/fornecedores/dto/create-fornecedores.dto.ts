import { Type } from "class-transformer";
import { IsArray, IsOptional, ValidateNested } from "class-validator";


export class CreateFornecedoresDto {
  nome: string;

  cnpj?: string;

  email?: string;

  telefone?: string;

  endereco?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Number)
  obrasId?: number[];
}