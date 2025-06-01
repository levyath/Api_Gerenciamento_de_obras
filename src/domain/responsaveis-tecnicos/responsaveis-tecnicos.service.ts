import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { ResponsavelTecnico } from './entities/responsavel-tecnico.entity';
import { ResponsaveisTecnicosRepository } from './responsaveis-tecnicos.repository';
import { CreateResponsavelTecnicoDto } from './dto/create-responsavel-tecnico.dto';
import { CpfValidatorService } from '../cpf-validator.service';

@Injectable()
export class ResponsaveisTecnicosService 
{
    constructor(
        private readonly responsaveisTecnicosRepository: ResponsaveisTecnicosRepository,
        private readonly cpfValidator: CpfValidatorService 
    ) {}

    async findAll(): Promise<ResponsavelTecnico[]> 
    {
        return this.responsaveisTecnicosRepository.findAll();
    }

    async findOne(id: number): Promise<ResponsavelTecnico> 
    {
        this.validarId(id);
        const responsavel = await this.obterResponsavelPorId(id);
        return responsavel;
    }

    async create(input: CreateResponsavelTecnicoDto): Promise<ResponsavelTecnico> 
    {
        this.validarDadosObrigatoriosParaCriacaoRT(input);
        this.validarFormatoCPF(input.cpf);
        this.validarCPF(input.cpf);
        await this.verificarCPFUnico(input.cpf);
        
        return this.responsaveisTecnicosRepository.create(input);
    }

    // ============ MÉTODOS AUXILIARES PRIVADOS ============

    private validarId(id: number): void {
        if (!id || id <= 0) {
            throw new BadRequestException('ID inválido.');
        }
    }

    private async obterResponsavelPorId(id: number): Promise<ResponsavelTecnico> {
        const responsavel = await this.responsaveisTecnicosRepository.findById(id);
        if (!responsavel) {
            throw new NotFoundException(`Responsável técnico com id ${id} não encontrado.`);
        }
        return responsavel;
    }

    private validarDadosObrigatoriosParaCriacaoRT(input: CreateResponsavelTecnicoDto): void {
        const camposObrigatorios: Array<keyof CreateResponsavelTecnicoDto> = [
        'nome', 'cpf', 'registro_profissional', 'especialidade'
        ];
        
        const camposFaltantes = camposObrigatorios.filter(campo => !input[campo]);
        
        if (camposFaltantes.length > 0) {
            throw new BadRequestException(
                `Campos obrigatórios faltando: ${camposFaltantes.join(', ')}`
            );
        }
    }
    private validarFormatoCPF(cpf: string): void {
        if (!this.cpfValidator.validarRegex(cpf)) {
            throw new BadRequestException('CPF inválido. Formato esperado: xxx.xxx.xxx-xx');
        }
    }

    private validarCPF(cpf: string): void {
        if (!this.cpfValidator.validarAlgoritmo(cpf)) {
            throw new BadRequestException('CPF inválido.');
        }
    }

    private async verificarCPFUnico(cpf: string, idExcluir?: number): Promise<void> {
        const responsavelExistente = await this.responsaveisTecnicosRepository.findByCPF(cpf);
        
        if (responsavelExistente && responsavelExistente.id !== idExcluir) {
            throw new ConflictException('Já existe um responsável técnico cadastrado com este CPF.');
        }
    }
}