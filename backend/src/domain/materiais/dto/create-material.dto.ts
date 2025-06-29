import { IsString, IsNotEmpty, IsNumber, IsPositive, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMaterialDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'MAT-001', description: 'Código único do material' })
  codigo: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Cimento CP II', description: 'Nome do material' })
  nome: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'Saco 50kg', description: 'Unidade de medida do material' })
  unidadeMedida?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'Cimento Portland Composto', description: 'Descrição detalhada do material' })
  descricao?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @ApiProperty({ example: 25.99, description: 'Preço unitário do material' })
  precoUnitario: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'Votorantim', description: 'Fabricante/Marca do material' })
  fabricante?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'CPB-40', description: 'Modelo/Referência do fabricante' })
  modelo?: string;
}