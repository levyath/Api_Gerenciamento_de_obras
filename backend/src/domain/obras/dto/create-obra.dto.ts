import {
  IsString,
  IsOptional,
  IsEnum,
  IsDateString,
  IsNumber,
  IsArray,
  IsPositive,
  ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateObraDto {
  @IsString()
  @ApiProperty({ example: 'Construção da Escola Municipal A', description: 'Nome da obra' })
  nome: string;

  @IsString()
  @ApiProperty({ example: 'Obra de construção da nova escola municipal no bairro X.', description: 'Descrição detalhada da obra' })
  descricao: string;

  @IsEnum(['Planejada', 'Em andamento', 'Concluída', 'Paralisada'])
  @ApiProperty({ enum: ['Planejada', 'Em andamento', 'Concluída', 'Paralisada'], description: 'Status da obra' })
  status: string;

  @IsDateString()
  @ApiProperty({ example: '2024-01-01', description: 'Data de início da obra' })
  data_inicio: Date;

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional({ example: '2024-12-31', description: 'Data de conclusão da obra' })
  data_conclusao?: Date;

  @IsNumber()
  @IsPositive()
  @ApiProperty({ example: 500000.0, description: 'Orçamento total da obra' })
  orcamento_total: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @ApiPropertyOptional({ example: 200000.0, description: 'Gastos atualizados da obra' })
  gastos_atualizados?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ example: 40, description: 'Percentual concluído da obra' })
  percentual_concluido?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ example: -23.55052, description: 'Latitude da obra' })
  latitude?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ example: -46.633308, description: 'Longitude da obra' })
  longitude?: number;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  @ApiPropertyOptional({ example: [1, 2], description: 'IDs dos fornecedores associados à obra', type: [Number] })
  fornecedoresId?: number[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  @ApiPropertyOptional({ example: [1, 2], description: 'IDs dos equipamentos associados à obra', type: [Number] })
  equipamentosId?: number[];
}