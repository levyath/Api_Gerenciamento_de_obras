import { Injectable } from '@nestjs/common';
import { CreateObraDto } from './dto/create-obra.dto';
import { UpdateObraDto } from './dto/update-obra.dto';

@Injectable()
export class ObrasService {
  create(createObraDto: CreateObraDto) {
    return 'This action adds a new obra';
  }

  findAll() {
    return `This action returns all obras`;
  }

  findOne(id: number) {
    return `This action returns a #${id} obra`;
  }

  update(id: number, updateObraDto: UpdateObraDto) {
    return `This action updates a #${id} obra`;
  }

  remove(id: number) {
    return `This action removes a #${id} obra`;
  }
}
