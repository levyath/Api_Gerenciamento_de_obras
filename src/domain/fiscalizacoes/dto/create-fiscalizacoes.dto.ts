import { IsString, IsOptional, IsDateString, IsInt, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFiscalizacoesDto {
    @ApiProperty({ description: 'Título da fiscalização', example: 'Controles de Segurança' })
    @IsString()
    titulo: string;

    @ApiProperty({ description: 'Descrição da fiscalização', example: 'Fiscalização para validar e garantir controles de segurança de acordo com ISO 12345' })
    @IsString()
    descricao: string;

    @ApiProperty({ description: 'Data de início da fiscalização (YYYY-MM-DD)', example: '2025-06-01' })
    @IsDateString()
    data_inicio: string;

    @ApiProperty({ description: 'Data de fim da fiscalização (YYYY-MM-DD)', example: '2025-06-10', required: false })
    @IsOptional()
    @IsDateString()
    data_fim?: string;

    @ApiProperty({ description: 'Status da fiscalização', example: 'Pendente' })
    @IsString()
    status: string;

    @ApiProperty({ description: 'IDs das obras associadas', example: '[1, 2, 3, 4]' })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Number)
    obra_ids: number[];

    // // pendente levy
    // @IsInt()
    // responsavel_id?: number;

}
