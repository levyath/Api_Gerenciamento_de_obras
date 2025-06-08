import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateObraFiscalizacaoDto {
  @IsInt()
  @ApiProperty({ example: 1, description: 'ID da obra associada' })
  obraId: number;

  @IsInt()
  @ApiProperty({ example: 10, description: 'ID da fiscalização associada' })
  fiscalizacaoId: number;
}