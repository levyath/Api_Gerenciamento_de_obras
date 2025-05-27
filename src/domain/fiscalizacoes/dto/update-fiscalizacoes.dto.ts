import { IsString, IsOptional, IsDateString, IsInt, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateFiscalizacoesDto {
    @IsOptional()
    @IsString()
    titulo?: string;

    @IsOptional()
    @IsString()
    descricao?: string;

    @IsOptional()
    @IsDateString()
    data?: string;

    // pendente levy
    @IsOptional()
    @IsInt()
    responsavel_id?: number;

    // pendente eu
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Number)
    relatorio_ids?: number[];
}