import { IsString, IsDateString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRelatoriosDto {
  @ApiProperty({ description: 'Título do relatório', example: 'Inspeção estrutural' })
  @IsString()
  titulo: string;

  @ApiProperty({ description: 'Conteúdo do relatório', example: 'Relatório detalhado sobre a inspeção realizada.' })
  @IsString()
  conteudo: string;

  @ApiProperty({ description: 'Data de criação do relatório (YYYY-MM-DD)', example: '2025-06-01' })
  @IsDateString()
  dataCriacao: string;

  @ApiProperty({ description: 'ID da fiscalização associada', example: 1 })
  @IsInt()
  fiscalizacaoId: number;
}
