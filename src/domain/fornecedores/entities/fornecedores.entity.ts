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

@Table({
  tableName: 'fornecedores',
  timestamps: true,
})
export class Fornecedores extends Model<Fornecedores> {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  declare nome: string;

  @Unique
  @AllowNull
  @Column({
    type: DataType.STRING(20),
  })
  declare cnpj: string | null;

  @Unique
  @AllowNull
  @Column({
    type: DataType.STRING(100),
  })
  declare email: string | null;

  @Unique
  @AllowNull
  @Column({
    type: DataType.STRING(20),
  })
  declare telefone: string | null;

  @AllowNull
  @Column({
    type: DataType.STRING(255),
  })
  declare endereco: string | null;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
  })
  declare ativo: boolean;

  @BelongsToMany(() => Obras, () => ObrasFornecedores)
  declare obrasId: Obras[];
}
