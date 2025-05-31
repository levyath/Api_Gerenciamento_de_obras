import { Injectable } from '@nestjs/common';
import { ObrasRepository } from './obras.repository';
import { Obras } from './entities/obras.entity';
import { CreateObraDto } from './dto/create-obra.dto';
import { UpdateObraDto } from './dto/update-obra.dto';

@Injectable()
export class ObrasService {
  constructor(private readonly obrasRepo: ObrasRepository) {}

  findAll(): Promise<Obras[]> {
    return this.obrasRepo.findAll();
  }

  findOne(id: number): Promise<Obras | null> {
    return this.obrasRepo.findById(id);
  }

  create(data: CreateObraDto): Promise<Obras> {
    return this.obrasRepo.create(data);
  }

  update(id: number, data: UpdateObraDto): Promise<Obras | null> {
    return this.obrasRepo.update(id, data);
  }

  remove(id: number): Promise<boolean> {
    return this.obrasRepo.delete(id);
  }
}
