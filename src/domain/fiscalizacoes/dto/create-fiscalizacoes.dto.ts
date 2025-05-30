import { IsString, IsOptional, IsDateString, IsInt, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFiscalizacoesDto {
    @IsString()
    titulo: string;

    @IsString()
    descricao: string;

    @IsDateString()
    data: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Number)
    obra_ids: number[];

    // // pendente levy
    // @IsInt()
    // responsavel_id?: number;

    // // pendente eu
    // @IsArray()
    // @ValidateNested({ each: true })
    // @Type(() => Number)
    // relatorio_ids?: number[];
}
