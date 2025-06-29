import { IsInt, IsDateString, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TipoVinculoObra } from '../enums/tipo-vinculo-obra.enum';
import { Type } from 'class-transformer';

export class CreateVinculoObraDto {
  @IsInt()
  @ApiProperty({ example: 1, description: 'ID da obra' })
  obraId: number;

  @IsDateString()
  @ApiProperty({ example: '2024-01-01T00:00:00.000Z', description: 'Data de início da responsabilidade' })
  @Type(() => Date)
  dataInicio: string;

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional({ example: '2024-12-31T23:59:59.999Z', description: 'Data fim da responsabilidade' })
  @Type(() => Date)
  dataFim?: string;

  @IsOptional()
  @IsEnum(TipoVinculoObra)
  @ApiPropertyOptional({ enum: TipoVinculoObra, example: TipoVinculoObra.RT_EXECUCAO, description: 'Tipo de vínculo' })
  tipoVinculo?: TipoVinculoObra;
}
