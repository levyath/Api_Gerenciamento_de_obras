import { IsString, IsOptional, IsDateString, IsInt, IsArray, ValidateNested, IsDate, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { FiscalizacaoStatus } from '../enums/fiscalizacoes-status.enum';

export class CreateFiscalizacoesDto {
    @ApiProperty({ description: 'Título da fiscalização', example: 'Controles de Segurança' })
    @IsString()
    titulo: string;

    @ApiProperty({ description: 'Descrição da fiscalização', example: 'Fiscalização para validar e garantir controles de segurança de acordo com ISO 12345' })
    @IsString()
    descricao: string;

    @ApiProperty({ description: 'Data de início da fiscalização (YYYY-MM-DD)', example: '2025-06-01' })
    @IsDate({ message: 'data_inicio deve ser um objeto Date válido.' })
    @Type(() => Date)
    data_inicio: Date;

    @ApiProperty({ description: 'Data de fim da fiscalização (YYYY-MM-DD)', example: '2025-06-10', required: false })
    @IsOptional()
    @IsDate({ message: 'data_fim deve ser um objeto Date válido.' })
    @Type(() => Date)
    data_fim?: Date;

    @ApiProperty({ description: 'Status da fiscalização', example: 'Pendente' })
    @IsEnum(FiscalizacaoStatus, { message: 'Status inválido. Valores permitidos: Em Andamento, Concluída, Planejada.' })
    status: string;

    @ApiProperty({ description: 'ID do responsável técnico', example: 1 })
    @IsInt()
    responsavelTecnicoId: number;

    @ApiProperty({ description: 'Lista de IDs das obras associadas', example: '[1, 2, 3]' })
    @IsArray()
    @IsInt({ each: true, message: 'Cada ID de obra deve ser um número inteiro.' })
    @Type(() => Number)
    obraIds: number[];
}
