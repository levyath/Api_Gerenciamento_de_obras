import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateEquipamentoDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  tipo: string;

  @IsString()
  @IsOptional()
  marca?: string;

  @IsString()
  @IsOptional()
  modelo?: string;

  @IsString()
 @IsNotEmpty()
  numeroDeSerie?: string;

  @IsNumber()
  @IsNotEmpty()
  fornecedor?: number;

  @IsString()
  @IsOptional()
  estado?: string; 

  @IsNumber()
  @IsNotEmpty()
  obras?: number[];
}