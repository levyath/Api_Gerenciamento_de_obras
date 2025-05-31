import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEquipamentoDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Furadeira Bosch' })
  nome: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Furadeira' })
  tipo: string;

  @IsString()
  @IsOptional()  
  @ApiPropertyOptional({ example: 'Bosch' })
  marca?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'GSR 1000' })
  modelo?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'SN123456789' })
  numeroDeSerie?: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiPropertyOptional({ example: 1, description: 'ID do fornecedor associado' })
  fornecedorId?: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'novo' })
  estado?: string; 

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Number)
  @ApiPropertyOptional({ example: [1, 2], description: 'IDs das obras associadas ao equipamento', type: [Number] })
  obrasId?: number[];
}