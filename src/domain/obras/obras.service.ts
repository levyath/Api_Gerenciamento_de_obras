import { Injectable } from '@nestjs/common';
import { ObrasRepository } from './obras.repository';

@Injectable()
export class ObrasService {
  constructor(private readonly obraRepository: ObrasRepository) {}

  findAll() {
    return this.obraRepository.findAll();
  }

  findOne(id: string) {
    return this.obraRepository.findOne(id);
  }

  create(obra) {
    return this.obraRepository.create(obra);
  }

  update(id: string, obra) {
    return this.obraRepository.update(id, obra);
  }

  remove(id: string) {
    return this.obraRepository.remove(id);
  }
}