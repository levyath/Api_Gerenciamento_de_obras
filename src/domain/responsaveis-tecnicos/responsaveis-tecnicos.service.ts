import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { ResponsavelTecnico } from './entities/responsavel-tecnico.entity';
import { ResponsaveisTecnicosRepository } from './responsaveis-tecnicos.repository';
import { CreateResponsavelTecnicoDto } from './dto/create-responsavel-tecnico.dto';
import { CpfValidatorService } from '../cpf-validator.service';
import { UpdateResponsavelTecnicoDto } from './dto/update-responsavel-tecnico.dto';
import { ObraResponsavelTecnicoRepository } from '../obra-responsavel-tecnico/obra-responsavel-tecnico.repository';
import { CreateVinculoObraDto } from '../obra-responsavel-tecnico/dto/create-obra-responsavel-tecnico.dto';
import { ObrasRepository } from '../obras/obras.repository';
import { ObraResponsavelTecnico } from '../obra-responsavel-tecnico/entities/obra-responsavel-tecnico.entity';
import { TipoVinculoObra } from '../obra-responsavel-tecnico/enums/tipo-vinculo-obra.enum';

@Injectable()
export class ResponsaveisTecnicosService 
{
    constructor(
        private readonly responsaveisTecnicosRepository: ResponsaveisTecnicosRepository,
        private readonly obrasRepository: ObrasRepository,
        private readonly obrasResponsavelTecnicoRepository: ObraResponsavelTecnicoRepository,
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

    async update(id: number, input: UpdateResponsavelTecnicoDto): Promise<ResponsavelTecnico | null> 
    {
        this.validarId(id);
        await this.obterResponsavelPorId(id); // Verifica se existe
        
        if (input.cpf) {
            this.validarFormatoCPF(input.cpf);
            this.validarCPF(input.cpf);
            await this.verificarCPFUnico(input.cpf, id);
        }

        return this.responsaveisTecnicosRepository.update(id, input);
    }

    async remove(id: number): Promise<boolean> 
    {
        this.validarId(id);
        await this.obterResponsavelPorId(id); // Verifica se existe
        await this.verificarVinculosAtivos(id);
        
        return await this.responsaveisTecnicosRepository.delete(id);
    }

    async createVinculosObra(responsavelId: number, vinculosDto: CreateVinculoObraDto[] ): Promise<ObraResponsavelTecnico[]> 
    {
        this.validarId(responsavelId);
        await this.obterResponsavelPorId(responsavelId);

        const vinculosAtuais = await this.obrasResponsavelTecnicoRepository.buscarVinculosPorResponsavel(responsavelId);

        // Verifica se algum dos vínculos que o usuário quer adicionar já existe
        const obraIdsAtuais = new Set(vinculosAtuais.map(v => v.obraId));
        const obraIdsNovos = vinculosDto.map(v => v.obraId);

        const vinculosDuplicados = obraIdsNovos.filter(id => obraIdsAtuais.has(id));

        if (vinculosDuplicados.length > 0) {
            throw new ConflictException(
            `Vínculos já existem para as obras com IDs: ${vinculosDuplicados.join(', ')}`,
            );
        }

        // Se chegou aqui, nenhum vínculo é duplicado, pode criar tudo
        const resultados: ObraResponsavelTecnico[] = [];
        for (const dto of vinculosDto) {
            const vinculo = await this.processarCriacaoVinculo(responsavelId, dto, vinculosAtuais);
            resultados.push(vinculo);
        }

        return resultados;
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

    private async verificarVinculosAtivos(idResponsavel: number): Promise<void> {
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        
        const vinculos = await this.obrasResponsavelTecnicoRepository.buscarVinculosPorResponsavel(idResponsavel);
        const vinculosAtivos = vinculos.filter(vinculo => 
            !vinculo.data_fim || new Date(vinculo.data_fim) >= hoje
        );
        
        if (vinculosAtivos.length > 0) {
            throw new ConflictException('Não é possível remover um responsável com vínculos ativos.');
        }
    }

    private async processarCriacaoVinculo(responsavelId: number, dto: CreateVinculoObraDto, vinculosAtuais: ObraResponsavelTecnico[] ): Promise<ObraResponsavelTecnico> 
    {
        // Validação básica do DTO
        if (!dto) {
            throw new BadRequestException('Dados do vínculo não fornecidos.');
        }

        // Verificação da obra
        await this.verificarExistenciaObra(dto.obraId);

        // Processamento e validação das datas
        const { dataInicio, dataFim } = this.processarEValidarDatas(dto.dataInicio, dto.dataFim);


        // Validações de negócio
        const tipoVinculo = this.validarTipoVinculo(dto.tipoVinculo as TipoVinculoObra);
        this.verificarVinculoAtivo(vinculosAtuais, dto.obraId, tipoVinculo);
        this.verificarConflitoDatas(vinculosAtuais, dto.obraId, tipoVinculo, dataInicio, dataFim);

        // Criação do vínculo
        return this.criarNovoVinculo(responsavelId, dto, dataInicio, dataFim);
        }

        private processarEValidarDatas(
        dataInicioStr: string,
        dataFimStr?: string | null
        ): { dataInicio: Date; dataFim: Date | null } {
        const dataInicio = new Date(dataInicioStr);
        if (isNaN(dataInicio.getTime())) {
            throw new BadRequestException('Data de início inválida.');
        }

        let dataFim: Date | null = null;
        if (dataFimStr) {
            dataFim = new Date(dataFimStr);
            if (isNaN(dataFim.getTime())) {
            throw new BadRequestException('Data de fim inválida.');
            }
            
            if (dataInicio > dataFim) {
            throw new BadRequestException('Data fim não pode ser anterior à data início.');
            }
        }

        return { dataInicio, dataFim };
    }

    private async verificarExistenciaObra(obraId: number): Promise<void> 
    {
        const obra = await this.obrasRepository.findById(obraId);
        if (!obra) {
            throw new NotFoundException(`Obra com ID ${obraId} não encontrada.`);
        }
    }

    private validarTipoVinculo(tipoVinculo: string): TipoVinculoObra {
        if (!Object.values(TipoVinculoObra).includes(tipoVinculo as TipoVinculoObra)) {
            throw new BadRequestException(
            `Tipo de vínculo inválido. Valores permitidos: ${Object.values(TipoVinculoObra).join(', ')}`
            );
        }
        return tipoVinculo as TipoVinculoObra
    }
    
    private verificarVinculoAtivo(vinculosAtuais: ObraResponsavelTecnico[], obraId: number, tipoVinculo: TipoVinculoObra ): void {
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        const jaVinculado = vinculosAtuais.some(v =>
            v.obra.id === obraId &&
            v.tipo_vinculo === tipoVinculo &&
            (!v.data_fim || new Date(v.data_fim) >= hoje)
        );

        if (jaVinculado) {
            throw new BadRequestException(
            `Já existe um vínculo ativo do tipo ${tipoVinculo} com a obra ${obraId}.`
            );
        }
    }

    private verificarConflitoDatas(vinculosAtuais: ObraResponsavelTecnico[], obraId: number, tipoVinculo: TipoVinculoObra, novaDataInicio: Date, novaDataFim: Date | null ): void 
    {
        const conflito = vinculosAtuais.some(v => {
            const inicioExistente = v.data_inicio ? new Date(v.data_inicio) : null;
            const fimExistente = v.data_fim ? new Date(v.data_fim) : null;

            return (
            v.obra.id === obraId &&
            v.tipo_vinculo === tipoVinculo &&
            this.datasSobrepostas(novaDataInicio, novaDataFim, inicioExistente, fimExistente)
            );
        });

        if (conflito) {
            throw new BadRequestException(`Existe sobreposição de datas com outro vínculo do tipo ${tipoVinculo} na obra ${obraId}.`);
        }
    }

    private datasSobrepostas(inicioA: Date, fimA: Date | null, inicioB: Date | null, fimB: Date | null ): boolean 
    {
        if (!inicioB) return false;
        
        const aInicio = inicioA.getTime();
        const aFim = fimA ? fimA.getTime() : Infinity;
        const bInicio = inicioB.getTime();
        const bFim = fimB ? fimB.getTime() : Infinity;

        return (
            (aInicio >= bInicio && aInicio <= bFim) ||
            (aFim >= bInicio && aFim <= bFim) ||
            (aInicio <= bInicio && aFim >= bFim)
        );
    }

    private async criarNovoVinculo(responsavelId: number, dto: CreateVinculoObraDto, dataInicio: Date, dataFim: Date | null ): Promise<ObraResponsavelTecnico> 
    {
        const dadosCriacao = {
            ...dto,
            data_inicio: dataInicio.toISOString().split('T')[0],
            data_fim: dataFim ? dataFim.toISOString().split('T')[0] : undefined
        };
        
        return this.obrasResponsavelTecnicoRepository.criarVinculo(responsavelId, dadosCriacao);
    }
}