import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateResponsavelTecnicoDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'João da Silva', description: 'Nome completo do responsável técnico' })
  nome: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '123.456.789-00', description: 'CPF do responsável técnico' })
  cpf: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'CREA-12345', description: 'Número do registro profissional' })
  registro_profissional: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Engenharia Civil', description: 'Especialidade do responsável' })
  especialidade: string;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  @ApiPropertyOptional({ example: false, description: 'Indica se o responsável está ativo' })
  ativo?: boolean;
}