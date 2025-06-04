import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FiscalizacaoStatus } from '../enums/fiscalizacoes-status.enum';

export class UpdateFiscalizacaoStatusDto {
    @ApiProperty({ enum: FiscalizacaoStatus, description: 'Novo status da fiscalização' })
    @IsNotEmpty({ message: 'O status não pode ser vazio.' })
    @IsEnum(FiscalizacaoStatus, { message: 'Status inválido. Valores permitidos: Em Andamento, Concluída, Planejada.' })
    status: FiscalizacaoStatus;
}