import { IsString, IsOptional, IsDateString, IsInt } from 'class-validator';

export class CreateFiscalizacoesDto {
    @IsString()
    titulo: string;

    @IsOptional()
    @IsString()
    descricao?: string;

    @IsDateString()
    data: string;

    @IsInt()
    responsavel_id: number;
}
