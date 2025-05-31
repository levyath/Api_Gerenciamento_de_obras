import { Type } from "class-transformer";
import { IsArray, IsOptional, ValidateNested, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateFornecedoresDto {
  @IsString()
  @ApiProperty({ example: 'Construtora ABC Ltda.' })
  nome: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: '12.345.678/0001-90' })
  cnpj?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'contato@abc.com.br' })
  email?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: '(11) 91234-5678' })
  telefone?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'Rua das Flores, 123 - São Paulo/SP' })
  endereco?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Number)
  @ApiPropertyOptional({ type: [Number], description: 'Lista de IDs de obras associadas a este fornecedor', example: [1, 2, 3] })
  obrasId?: number[];
}