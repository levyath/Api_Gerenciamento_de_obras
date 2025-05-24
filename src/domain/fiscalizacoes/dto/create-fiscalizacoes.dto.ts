import { IsString, IsOptional, IsDateString, IsInt } from 'class-validator';

export class CreateFiscalizacaoDto {
  @IsString()
  titulo: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsDateString()
  data: string;

  @IsInt()
  responsavelId: number;
}
