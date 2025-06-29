import { IsString, IsOptional, IsNotEmpty, IsPostalCode, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEnderecoDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Rua das Flores',
    description: 'Nome da rua do endereço',
  })
  rua: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '123',
    description: 'Número do endereço',
  })
  numero: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'Casa',
    description: 'Complemento do endereço (opcional)',
  })
  complemento?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Costa Barros',
    description: 'Bairro do endereço',
  })
  bairro: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Rio de Janeiro',
    description: 'Cidade do endereço',
  })
  cidade: string;

  @IsString()
  @Length(2, 2)
  @ApiProperty({
    example: 'RJ',
    description: 'Estado do endereço (UF)',
  })
  estado: string;

  @IsPostalCode('BR')
  @IsNotEmpty()
  @ApiProperty({
    example: '01000-000',
    description: 'CEP do endereço',
  })
  cep: string;
}
