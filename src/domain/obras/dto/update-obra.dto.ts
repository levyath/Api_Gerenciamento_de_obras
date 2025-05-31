import { PartialType } from '@nestjs/mapped-types';
import { CreateObraDto } from './create-obra.dto';
import { IsOptional, IsArray, IsNumber } from 'class-validator';

export class UpdateObraDto extends PartialType(CreateObraDto) {}
