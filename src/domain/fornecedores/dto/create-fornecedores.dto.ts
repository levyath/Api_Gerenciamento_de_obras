import { Type } from "class-transformer";
import { IsArray, IsOptional, ValidateNested, IsString, IsInt, IsEmail, IsNotEmpty, IsBoolean } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export class CreateFornecedoresDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Construtora ABC Ltda.', description: 'Nome do fornecedor' })
  nome: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: '12.345.678/0001-90', description: 'CNPJ do fornecedor' })
  cnpj?: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional({ example: 'contato@abc.com.br', description: 'Email do fornecedor' })
  email?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: '(11) 91234-5678', description: 'Telefone de contato do fornecedor' })
  telefone?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'Rua das Flores, 123 - São Paulo/SP', description: 'Endereço do fornecedor' })
  endereco?: string;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({ example: true, description: 'Indica se o fornecedor está ativo' })
  ativo?: boolean;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true, message: 'Cada ID da obra deve ser um número inteiro.' })
  @Type(() => Number)
  @ApiPropertyOptional({ 
    type: [Number], 
    description: 'Lista de IDs das obras associadas a este fornecedor', 
    example: [1, 2, 3] 
  })
  obrasId?: number[];
}