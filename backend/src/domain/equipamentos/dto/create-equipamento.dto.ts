import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEquipamentoDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Furadeira Bosch',
    description: 'Nome do equipamento',
  })
  nome: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Furadeira',
    description: 'Tipo do equipamento',
  })
  tipo: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'Bosch',
    description: 'Marca do equipamento (opcional)',
  })
  marca?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'GSR 1000',
    description: 'Modelo do equipamento (opcional)',
  })
  modelo?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'SN123456789',
    description: 'Número de série do equipamento',
  })
  numeroDeSerie: string;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    example: 1,
    description: 'ID do fornecedor associado (opcional)',
  })
  fornecedorId?: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'novo',
    description: 'Estado do equipamento (opcional)',
  })
  estado?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Number)
  @ApiPropertyOptional({
    example: [1, 2],
    description: 'Lista de IDs das obras associadas ao equipamento (opcional)',
    type: [Number],
  })
  obrasId?: number[];
}