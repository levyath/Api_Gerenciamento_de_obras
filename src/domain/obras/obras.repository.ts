import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Obra } from './entities/obra.entity';

@Injectable()
export class ObrasRepository {
  constructor(
    @InjectRepository(Obra)
    private readonly obraRepository: Repository<Obra>,
  ) {}

  async findAll(): Promise<Obra[]> {
    return this.obraRepository.find();
  }

  async findOne(id: string): Promise<Obra> {
    const obra = await this.obraRepository.findOneBy({ id });
    if (!obra) {
      throw new Error(`Obra with id ${id} not found`);
    }
    return obra;
  }

  async create(obra: Partial<Obra>): Promise<Obra> {
    return this.obraRepository.save(obra);
  }

  async update(id: string, obra: Partial<Obra>): Promise<Obra> {
    await this.obraRepository.update(id, obra);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.obraRepository.delete(id);
  }
}