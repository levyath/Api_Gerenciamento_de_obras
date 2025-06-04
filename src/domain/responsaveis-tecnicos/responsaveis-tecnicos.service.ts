import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { ResponsavelTecnico } from './entities/responsavel-tecnico.entity';
import { ResponsaveisTecnicosRepository } from './responsaveis-tecnicos.repository';
import { CreateResponsavelTecnicoDto } from './dto/create-responsavel-tecnico.dto';
import { DocumentValidatorService } from '../shared/document-validator.service';
import { UpdateResponsavelTecnicoDto } from './dto/update-responsavel-tecnico.dto';
import { ObraResponsavelTecnicoRepository } from '../obra-responsavel-tecnico/obra-responsavel-tecnico.repository';
import { CreateVinculoObraDto } from '../obra-responsavel-tecnico/dto/create-obra-responsavel-tecnico.dto';
import { ObrasRepository } from '../obras/obras.repository';
import { ObraResponsavelTecnico } from '../obra-responsavel-tecnico/entities/obra-responsavel-tecnico.entity';
import { TipoVinculoObra } from '../obra-responsavel-tecnico/enums/tipo-vinculo-obra.enum';
import { UpdateVinculoObraDto } from '../obra-responsavel-tecnico/dto/update-obra-responsavel-tecnico.dto';

@Injectable()
export class ResponsaveisTecnicosService 
{
    constructor(
        private readonly responsaveisTecnicosRepository: ResponsaveisTecnicosRepository,
        private readonly obrasRepository: ObrasRepository,
        private readonly obrasResponsavelTecnicoRepository: ObraResponsavelTecnicoRepository,
        private readonly documentValidatorService: DocumentValidatorService 
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

    async update(id: number, input: UpdateResponsavelTecnicoDto): Promise<ResponsavelTecnico | null> {
        // Validação básica do ID
        this.validarId(id);
        
        // Verifica se há dados para atualizar
        if (Object.keys(input).length === 0) {
            throw new BadRequestException('Nenhum dado fornecido para atualização');
        }

        // Valida propriedades permitidas
        const allowedProperties = ['nome', 'cpf', 'registro_profissional', 'especialidade', 'ativo'];
        const invalidProperties = Object.keys(input).filter(
            prop => !allowedProperties.includes(prop)
        );

        if (invalidProperties.length > 0) {
            throw new BadRequestException(
                `Propriedades inválidas para atualização: ${invalidProperties.join(', ')}. ` +
                `Apenas estas propriedades podem ser atualizadas: ${allowedProperties.join(', ')}`
            );
        }

        // Obtém o responsável existente
        const responsavelExistente = await this.obterResponsavelPorId(id);
        if (!responsavelExistente) {
            throw new NotFoundException('Responsável técnico não encontrado');
        }

        // Verifica alterações válidas
        const hasChanges = Object.keys(input).some(key => {
            const inputValue = input[key];
            const currentValue = responsavelExistente[key];
            return inputValue !== undefined && inputValue !== currentValue;
        });

        if (!hasChanges) {
            throw new BadRequestException('Nenhuma alteração fornecida em relação aos dados atuais');
        }

        // Validações específicas para cada campo
        if (input.nome !== undefined) {
            if (input.nome === responsavelExistente.nome) {
                throw new BadRequestException('O nome fornecido é igual ao atual');
            }
            if (!input.nome.trim()) {
                throw new BadRequestException('Nome não pode ser vazio');
            }
        }

        if (input.cpf !== undefined) {
            if (input.cpf === responsavelExistente.cpf) {
                throw new BadRequestException('O CPF fornecido é igual ao atual');
            }
            this.validarFormatoCPF(input.cpf);
            this.validarCPF(input.cpf);
            await this.verificarCPFUnico(input.cpf, id);
        }

        if (input.registro_profissional !== undefined) {
            if (input.registro_profissional === responsavelExistente.registro_profissional) {
                throw new BadRequestException('O registro profissional fornecido é igual ao atual');
            }
            if (!input.registro_profissional.trim()) {
                throw new BadRequestException('Registro profissional não pode ser vazio');
            }
        }

        if (input.especialidade !== undefined) {
            if (input.especialidade === responsavelExistente.especialidade) {
                throw new BadRequestException('A especialidade fornecida é igual à atual');
            }
            if (!input.especialidade.trim()) {
                throw new BadRequestException('Especialidade não pode ser vazia');
            }
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
        const responsavelExistente = await this.obterResponsavelPorId(responsavelId);

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
        
        // Update responsavelTecnico to active if not already
        if (!responsavelExistente.ativo) {
            await this.responsaveisTecnicosRepository.update(responsavelId, { ativo: true });
        }

        return resultados;
    }

    async updateVinculoObra(responsavelId: number, obraId: number, updateDto: UpdateVinculoObraDto ): Promise<ObraResponsavelTecnico> 
    {
        // Validações básicas
        this.validarId(responsavelId);
        this.validarId(obraId);
        await this.obterResponsavelPorId(responsavelId);
        await this.verificarExistenciaObra(obraId);

        // Verifica se há dados para atualização
        if (Object.keys(updateDto).length === 0) {
            throw new BadRequestException('Nenhum dado fornecido para atualização');
        }

        // Valida propriedades permitidas
        const allowedProperties = ['dataInicio', 'dataFim', 'tipoVinculo'];
        const invalidProperties = Object.keys(updateDto).filter(
            prop => !allowedProperties.includes(prop)
        );

        if (invalidProperties.length > 0) {
            throw new BadRequestException(
                `Propriedades inválidas para atualização: ${invalidProperties.join(', ')}. ` +
                `Apenas estas propriedades podem ser atualizadas: ${allowedProperties.join(', ')}`
            );
        }

        // Obtém e valida vínculo existente
        const vinculoExistente = await this.obterVinculoExistente(responsavelId, obraId);

        // Verifica se há alterações nos valores
        const hasChanges = Object.keys(updateDto).some(key => {
            const dtoValue = updateDto[key];
            const existingValue = vinculoExistente[key === 'tipoVinculo' ? 'tipo_vinculo' : key];
            return dtoValue !== undefined && dtoValue !== existingValue;
        });

        if (!hasChanges) {
            throw new BadRequestException('Nenhuma alteração fornecida em relação aos dados atuais');
        }

        // Processa atualização
        const { novaDataInicio, novaDataFim } = this.processarDatasAtualizacao(
            updateDto.dataInicio,
            updateDto.dataFim,
            vinculoExistente
        );

        const tipoVinculoFinal = this.validarTipoVinculo(
            updateDto.tipoVinculo ?? vinculoExistente.tipo_vinculo
        );

        // Verifica conflitos
        await this.verificarConflitosAtualizacao(
            responsavelId,
            obraId,
            novaDataInicio,
            novaDataFim,
            tipoVinculoFinal,
            vinculoExistente.id
        );

        // Executa atualização
        return this.executarAtualizacao(
            responsavelId,
            obraId,
            novaDataInicio,
            novaDataFim,
            tipoVinculoFinal
        );
    }

    async findAllVinculosObra(responsavelId: number ): Promise<ObraResponsavelTecnico[]> 
    {
        // Validação do ID do responsável
        this.validarId(responsavelId);

        // Verifica se o responsável existe
        await this.obterResponsavelPorId(responsavelId);

        // Busca todos os vínculos usando o método específico do repositório
        const vinculos = await this.obrasResponsavelTecnicoRepository.buscarVinculosPorResponsavel(responsavelId);
        
        if (!vinculos || vinculos.length === 0) {
            throw new NotFoundException(`Nenhum vínculo encontrado para o responsável técnico com ID ${responsavelId}.`);
        }

        return vinculos;
    }

    async findVinculoObra(responsavelId: number, obraId: number ): Promise<ObraResponsavelTecnico> 
    {
        this.validarId(responsavelId);
        this.validarId(obraId);
        await this.obterResponsavelPorId(responsavelId);
        await this.verificarExistenciaObra(obraId);

        const vinculo = await this.obrasResponsavelTecnicoRepository.buscarVinculo(responsavelId, obraId);
        if (!vinculo) {
            throw new NotFoundException(`Vínculo entre responsável ${responsavelId} e obra ${obraId} não encontrado.`);
        }

        return vinculo;
    }

    async deleteVinculoObra(responsavelId: number, obraId: number ): Promise<void>
    {
        this.validarId(responsavelId);
        this.validarId(obraId);
        await this.obterResponsavelPorId(responsavelId);
        await this.verificarExistenciaObra(obraId);

        await this.obterVinculoExistente(responsavelId, obraId);

        try {
            await this.obrasResponsavelTecnicoRepository.removerVinculo(responsavelId, obraId);

            // Check remaining links
            const vinculosRestantes = await this.obrasResponsavelTecnicoRepository.buscarVinculosPorResponsavel(responsavelId);
        
            // If no links left, set responsavel to inactive
            if (vinculosRestantes.length === 0) {
                await this.responsaveisTecnicosRepository.update(responsavelId, { ativo: false });
            }
        } catch (error) {
            throw new InternalServerErrorException('Erro ao remover o vínculo. Por favor, tente novamente.');
        }
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
        if (!this.documentValidatorService.validarCpfFormatado(cpf)) {
            throw new BadRequestException('CPF inválido. Formato esperado: xxx.xxx.xxx-xx');
        }
    }

    private validarCPF(cpf: string): void {
        if (!this.documentValidatorService.validarCpf(cpf)) {
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

    private processarDatasAtualizacao(dataInicioDto: string | undefined, dataFimDto: string | null | undefined, vinculoExistente: ObraResponsavelTecnico): { novaDataInicio: Date; novaDataFim: Date | null } 
    {
        const dataInicioStr = dataInicioDto ?? vinculoExistente.data_inicio;
        if (!dataInicioStr) {
            throw new BadRequestException('Data de início é obrigatória.');
        }

        const novaDataInicio = new Date(dataInicioStr);
        if (isNaN(novaDataInicio.getTime())) {
            throw new BadRequestException('Data de início inválida.');
        }

        let novaDataFim: Date | null = null;
        if (dataFimDto !== undefined) {
            novaDataFim = dataFimDto ? new Date(dataFimDto) : null;
        } else if (vinculoExistente.data_fim) {
            novaDataFim = new Date(vinculoExistente.data_fim);
        }

        if (novaDataFim && isNaN(novaDataFim.getTime())) {
            throw new BadRequestException('Data de fim inválida.');
        }

        if (novaDataFim && novaDataInicio > novaDataFim) {
            throw new BadRequestException('Data fim não pode ser anterior à data início.');
        }

        return { novaDataInicio, novaDataFim };
    }    

    private async obterVinculoExistente(responsavelId: number, obraId: number ): Promise<ObraResponsavelTecnico> 
    {
        const vinculo = await this.obrasResponsavelTecnicoRepository.buscarVinculo(responsavelId, obraId);
        if (!vinculo) {
            throw new NotFoundException(`Vínculo entre responsável ${responsavelId} e obra ${obraId} não encontrado.`);
        }
        return vinculo; 
    }

    private async verificarConflitosAtualizacao(responsavelId: number, obraId: number, novaDataInicio: Date, novaDataFim: Date | null, tipoVinculo: TipoVinculoObra, vinculoIdAtual: number ): Promise<void> 
    {
        const vinculosAtuais = await this.obrasResponsavelTecnicoRepository.buscarVinculosPorResponsavel(responsavelId);

        const conflito = vinculosAtuais.some(v => {
            if (v.id === vinculoIdAtual) return false;
            
            const inicioExistente = v.data_inicio ? new Date(v.data_inicio) : null;
            const fimExistente = v.data_fim ? new Date(v.data_fim) : null;

            return (
            v.obra.id === obraId &&
            v.tipo_vinculo === tipoVinculo &&
            this.datasSobrepostas(novaDataInicio, novaDataFim, inicioExistente, fimExistente)
            );
        });

        if (conflito) {
            throw new BadRequestException('Existe sobreposição de datas com outro vínculo do mesmo tipo para esta obra.');
        }
    }

    private async executarAtualizacao(responsavelId: number, obraId: number, dataInicio: Date, dataFim: Date | null, tipoVinculo: TipoVinculoObra ): Promise<ObraResponsavelTecnico> 
    {
        const dadosAtualizacao: UpdateVinculoObraDto = {
            dataInicio: dataInicio.toISOString().split('T')[0],
            dataFim: dataFim ? dataFim.toISOString().split('T')[0] : undefined,
            tipoVinculo: tipoVinculo
        };

        const resultado = await this.obrasResponsavelTecnicoRepository.atualizarVinculo(responsavelId, obraId, dadosAtualizacao);

        if (!resultado) {
            throw new Error('Falha ao atualizar vínculo');
        }

        return resultado;
    }
    
}