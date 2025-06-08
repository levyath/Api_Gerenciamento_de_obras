import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
} from 'class-validator';

export class CreateDiarioDeObraDto {
  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ example: '2023-03-15' })
  data: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'Ensolarado' })
  clima?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'Atividade 1, Atividade 2' })
  atividadesExecutadas?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'Observação 1' })
  observacoes?: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @ApiPropertyOptional({
    example: [1, 2],
    description: 'IDs dos Materiais associados à obra',
    type: [Number],
  })
  materiaisId?: number[];

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({
    example: 1,
    description: 'ID da obra associada',
    type: Number,
  })
  obraId: number;
}
