import { IsString, IsOptional, IsNotEmpty, IsPostalCode, Length } from 'class-validator';

export class CreateEnderecoDto {
  @IsString()
  @IsNotEmpty()
  rua: string;

  @IsString()
  @IsNotEmpty()
  numero: string;

  @IsString()
  @IsOptional()
  complemento?: string;

  @IsString()
  @IsNotEmpty()
  bairro: string;

  @IsString()
  @IsNotEmpty()
  cidade: string;

  @IsString()
  @Length(2, 2)
  estado: string;

  @IsPostalCode('BR')
  @IsNotEmpty()
  cep: string;

}