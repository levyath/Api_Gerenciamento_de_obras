import {
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDateString,
  IsString,
  IsInt,
} from 'class-validator';
import { EtapaStatus } from '../entities/etapas-da-obra.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEtapasDaObraDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Etapa de fundação da obra' })
  nome: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ example: '2024-01-01' })
  dataInicioPrevista: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ example: '2024-01-31' })
  dataFimPrevista: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ example: '2024-01-15' })
  dataInicioReal?: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ example: '2024-01-31' })
  dataFimReal?: string;

  @IsOptional()
  @IsEnum(EtapaStatus)
  @ApiProperty({ enum: EtapaStatus })
  status?: EtapaStatus;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({
    example: 1,
    description: 'ID da obra associada',
    type: Number,
  })
  obraId: number;
}
