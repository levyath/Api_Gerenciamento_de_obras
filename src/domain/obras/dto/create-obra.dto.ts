import {
  IsString,
  IsOptional,
  IsEnum,
  IsDateString,
  IsNumber,
  IsArray,
  ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateObraDto {
  @IsString()
  nome: string;

  @IsString()
  descricao: string;

  @IsEnum(['Planejada', 'Em andamento', 'Concluída', 'Paralisada'])
  status: string;

  @IsDateString()
  data_inicio: Date;

  @IsOptional()
  @IsDateString()
  data_conclusao?: Date;

  @IsString()
  responsavel: string;

  @IsNumber()
  orcamento_total: number;

  @IsOptional()
  @IsNumber()
  gastos_atualizados?: number;

  @IsOptional()
  @IsNumber()
  percentual_concluido?: number;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Number)
  fornecedoresId?: number[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Number)
  equipamentosId?: number[];

  @IsNumber()
  @IsOptional()
  enderecoId?: number;
}