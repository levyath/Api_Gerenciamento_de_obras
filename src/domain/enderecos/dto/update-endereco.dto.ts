import { PartialType } from '@nestjs/mapped-types';
import { CreateEnderecoDto } from './create-endereco.dto';

export class UpdateEnderecoDto extends PartialType(CreateEnderecoDto) {}
