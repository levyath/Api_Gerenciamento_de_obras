import {
  IsString,
  IsOptional,
  IsEnum,
  IsDateString,
  IsNumber,
  IsArray,
  ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateObraDto {
  @IsString()
  @ApiProperty({ example: 'Construção da Escola Municipal A' })
  nome: string;

  @IsString()
  @ApiProperty({ example: 'Obra de construção da nova escola municipal no bairro X.' })
  descricao: string;

  @IsEnum(['Planejada', 'Em andamento', 'Concluída', 'Paralisada'])
  @ApiProperty({ enum: ['Planejada', 'Em andamento', 'Concluída', 'Paralisada'] })
  status: string;

  @IsDateString()
  @ApiProperty({ example: '2024-01-01' })
  data_inicio: Date;

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional({ example: '2024-12-31' })
  data_conclusao?: Date;

  @IsNumber()
  @ApiProperty({ example: 500000.0 })
  orcamento_total: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ example: 200000.0 })
  gastos_atualizados?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ example: 40 })
  percentual_concluido?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ example: -23.55052 })
  latitude?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ example: -46.633308 })
  longitude?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Number)
  @ApiPropertyOptional({ example: [1, 2], description: 'IDs dos fornecedores associados à obra', type: [Number] })
  fornecedoresId?: number[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Number)
  @ApiPropertyOptional({ example: [1, 2], description: 'IDs dos equipamentos associados à obra', type: [Number] })
  equipamentosId?: number[];

}