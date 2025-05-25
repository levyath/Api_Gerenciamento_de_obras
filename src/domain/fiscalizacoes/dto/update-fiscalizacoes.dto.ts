import { IsString, IsOptional, IsDateString, IsInt } from 'class-validator';

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

    @IsOptional()
    @IsInt()
    responsavel_id?: number;
}