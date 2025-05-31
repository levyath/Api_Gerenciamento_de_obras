import { PartialType } from '@nestjs/mapped-types';
import { CreateFornecedoresDto } from './create-fornecedores.dto';

export class UpdateFornecedoresDto extends PartialType(CreateFornecedoresDto) {}
