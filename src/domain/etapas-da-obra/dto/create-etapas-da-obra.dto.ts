import {
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDateString,
  IsString,
  IsInt,
} from 'class-validator';
import { EtapaStatus } from '../entities/etapas-da-obra.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEtapasDaObraDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Fundação',
    description: 'Nome da etapa da obra',
  })
  nome: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'Etapa de fundação da obra',
    description: 'Descrição detalhada da etapa (opcional)',
  })
  descricao?: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    example: '2024-01-01',
    description: 'Data prevista para início da etapa',
  })
  dataInicioPrevista: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    example: '2024-01-31',
    description: 'Data prevista para término da etapa',
  })
  dataFimPrevista: string;

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional({
    example: '2024-01-15',
    description: 'Data real de início da etapa (opcional)',
  })
  dataInicioReal?: string;

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional({
    example: '2024-01-31',
    description: 'Data real de término da etapa (opcional)',
  })
  dataFimReal?: string;

  @IsOptional()
  @IsEnum(EtapaStatus)
  @ApiPropertyOptional({
    example: EtapaStatus.EM_ANDAMENTO,
    enum: EtapaStatus,
    description: 'Status atual da etapa da obra (opcional)',
  })
  status?: EtapaStatus;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({
    example: 1,
    description: 'ID da obra associada à etapa',
  })
  obraId: number;
}