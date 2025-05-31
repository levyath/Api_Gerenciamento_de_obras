import { IsString, IsOptional, IsNotEmpty, IsPostalCode, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEnderecoDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Rua das Flores' })
  rua: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '123' })
  numero: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Casa' })
  complemento?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Costa Barros' })
  bairro: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Rio de Janeiro' })
  cidade: string;

  @IsString()
  @Length(2, 2)
  @ApiProperty({ example: 'RJ' })
  estado: string;

  @IsPostalCode('BR')
  @IsNotEmpty()
  @ApiProperty({ example: '01000-000' })
  cep: string;
}