import { IsString, IsOptional, IsDateString, IsInt } from 'class-validator';

export class CreateFiscalizacaoDto {

    @IsInt()
    obraId: number;

    @IsInt()
    fiscalizacoesId: number;
}
