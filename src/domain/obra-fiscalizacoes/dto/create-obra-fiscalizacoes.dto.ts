import { IsInt } from 'class-validator';

export class CreateObraFiscalizacaoDto {
    @IsInt()
    obra_id: number;

    @IsInt()
    fiscalizacoes_id: number;
}
