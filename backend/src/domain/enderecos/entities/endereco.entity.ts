import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, HasOne } from 'sequelize-typescript';
import { Obras } from 'src/domain/obras/entities/obras.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Table({ tableName: 'enderecos', timestamps: true })
export class Endereco extends Model<Endereco> {
  @PrimaryKey
  @AutoIncrement
  @Column
  @ApiProperty({ example: 1, description: 'ID do endereço' })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty({ example: 'Rua das Flores', description: 'Nome da rua do endereço' })
  declare rua: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty({ example: '123', description: 'Número do endereço' })
  declare numero: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  @ApiPropertyOptional({ example: 'Apto 101', description: 'Complemento do endereço (opcional)' })
  declare complemento?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty({ example: 'Centro', description: 'Bairro do endereço' })
  declare bairro: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty({ example: 'São Paulo', description: 'Cidade do endereço' })
  declare cidade: string;

  @Column({
    type: DataType.CHAR(2),
    allowNull: false,
  })
  @ApiProperty({ example: 'SP', description: 'Estado do endereço (UF)' })
  declare estado: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty({ example: '01000-000', description: 'CEP do endereço' })
  declare cep: string;

  @HasOne(() => Obras)
  @ApiPropertyOptional({ type: () => Obras, description: 'Obra associada a este endereço (se houver)' })
  declare obra?: Obras;
}