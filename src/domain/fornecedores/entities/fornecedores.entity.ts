import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  Unique,
  AllowNull,
  Default,
  BelongsToMany,
} from 'sequelize-typescript';
import { ObrasFornecedores } from 'src/domain/obra-fornecedor/entities/obras-fornecedores.entity';
import { Obras } from 'src/domain/obras/entities/obras.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Table({
  tableName: 'fornecedores',
  timestamps: true,
})
export class Fornecedores extends Model<Fornecedores> {
  @PrimaryKey
  @AutoIncrement
  @Column
  @ApiProperty({ example: 1, description: 'ID do fornecedor' })
  declare id: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  @ApiProperty({ example: 'Construtora ABC Ltda', description: 'Nome do fornecedor' })
  declare nome: string;

  @Unique
  @AllowNull
  @Column({
    type: DataType.STRING(20),
  })
  @ApiPropertyOptional({ example: '12.345.678/0001-99', description: 'CNPJ do fornecedor (formato: 00.000.000/0000-00)' })
  declare cnpj: string | null;

  @Unique
  @AllowNull
  @Column({
    type: DataType.STRING(100),
  })
  @ApiPropertyOptional({ example: 'contato@fornecedor.com', description: 'Email do fornecedor' })
  declare email: string | null;

  @Unique
  @AllowNull
  @Column({
    type: DataType.STRING(20),
  })
  @ApiPropertyOptional({ example: '(21) 98765-4321', description: 'Telefone de contato do fornecedor' })
  declare telefone: string | null;

  @AllowNull
  @Column({
    type: DataType.STRING(255),
  })
  @ApiPropertyOptional({ example: 'Rua das Indústrias, 1000, Bairro Industrial', description: 'Endereço do fornecedor' })
  declare endereco: string | null;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
  })
  @ApiProperty({ example: true, description: 'Indica se o fornecedor está ativo' })
  declare ativo: boolean;

  @BelongsToMany(() => Obras, () => ObrasFornecedores)
  @ApiProperty({ type: () => [Obras], description: 'Lista de obras associadas ao fornecedor' })
  declare obrasId: Obras[];
}