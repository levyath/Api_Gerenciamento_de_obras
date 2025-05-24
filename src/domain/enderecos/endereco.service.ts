import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { EnderecoRepository } from './endereco.repository';
import { ObrasRepository } from '../obras/obras.repository';

@Injectable()
export class EnderecoService {
  constructor(
      private readonly enderecoRepository: EnderecoRepository,
      private readonly obrasRepository: ObrasRepository,
    ) {}


    async create(id: number, endereco: any) {
    const obra = await this.obrasRepository.findOne(id);

    if (!obra) {
        throw new NotFoundException('A obra informada não existe!');
    }

    if (obra.endereco) {
        throw new BadRequestException('Esta obra já possui um endereço cadastrado!');
    }

    return this.enderecoRepository.create(id, endereco);
    }


    async findOne(id: number) {
        const obra = await this.obrasRepository.findOne(id);
        
        if (!obra) {
            throw new NotFoundException('A obra informada não existe!');
        }    
    
        return this.enderecoRepository.findOne(id);
    }
    

    async update(id: number, enderecoInput: any) {
        const obra = await this.obrasRepository.findOne(id);
        
        if (!obra) {
            throw new NotFoundException('A obra informada não existe!');
        }    
    
        return this.enderecoRepository.update(id, enderecoInput);
    }
    
}