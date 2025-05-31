import { PartialType } from '@nestjs/mapped-types';
import { CreateObraDto } from './create-obra.dto';

export class UpdateObraDto extends PartialType(CreateObraDto) {}