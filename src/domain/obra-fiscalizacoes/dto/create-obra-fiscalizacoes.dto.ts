import { IsString, IsOptional, IsDateString, IsInt } from 'class-validator';

export class CreateFiscalizacaoDto {
    @IsInt()
    obra_id: number;

    @IsInt()
    fiscalizacoes_id: number;
}
