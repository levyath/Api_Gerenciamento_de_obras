import { Type } from "class-transformer";
import { IsArray, IsOptional, ValidateNested, IsString, IsNotEmpty, IsBoolean } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export class CreateFornecedoresDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Construtora ABC Ltda.' })
  nome: string;

  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional({ example: '12.345.678/0001-90' })
  cnpj: string;

  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional({ example: 'contato@abc.com.br' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional({ example: '(11) 91234-5678' })
  telefone: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'Rua das Flores, 123 - São Paulo/SP' })
  endereco?: string;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({ example: 'false' })
  ativo?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Number)
  @ApiPropertyOptional({ type: [Number], description: 'Lista de IDs de obras associadas a este fornecedor', example: [1, 2, 3] })
  obrasId?: number[];
}