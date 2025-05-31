import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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

  // @IsNumber()
  // @IsNotEmpty()
  // fornecedor?: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'novo' })
  estado?: string; 

  // @IsNumber()
  // @IsNotEmpty()
  // obras?: number[];
}