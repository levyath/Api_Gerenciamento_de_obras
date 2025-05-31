import { 
  IsString, 
  IsNotEmpty, 
  IsOptional, 
  IsArray, 
  IsBoolean,
  ValidateNested 
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFornecedoresDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  cnpj: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  telefone?: string;

  @IsString()
  @IsOptional()
  enderecoId?: string;

  @IsBoolean()
  @IsOptional()
  ativo?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Number)
  obrasId?: number[];
}