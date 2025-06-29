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
  @ApiProperty({
    example: '2023-03-15',
    description: 'Data do registro no diário de obra (formato ISO 8601)',
  })
  data: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'Ensolarado',
    description: 'Condições climáticas no dia',
  })
  clima?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'Execução de fundação, montagem de formas',
    description: 'Atividades executadas no dia',
  })
  atividadesExecutadas?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'Início da concretagem atrasado por logística',
    description: 'Observações gerais do dia',
  })

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
    description: 'ID da obra associada ao diário',
    type: Number,
  })
  obraId: number;
}