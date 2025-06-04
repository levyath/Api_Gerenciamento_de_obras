import { BadRequestException } from "@nestjs/common";

export class CpfValidatorService{
    validarAlgoritmo = (cpf: string): boolean => 
    {
        // Remove pontos e traço
        const cleaned = cpf.replace(/[^\d]/g, '');

        // Verifica se tem 11 dígitos
        if (cleaned.length !== 11) return false;

        // Rejeita CPFs com todos os dígitos iguais (ex: 111.111.111-11)
        if (/^(\d)\1+$/.test(cleaned)) return false;

        const cpfArray = cleaned.split('').map(d => parseInt(d));

        // Valida primeiro dígito verificador
        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += cpfArray[i] * (10 - i);
        }
        let primeiroDigito = 11 - (soma % 11);
        if (primeiroDigito >= 10) primeiroDigito = 0;
        if (cpfArray[9] !== primeiroDigito) return false;

        // Valida segundo dígito verificador
        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += cpfArray[i] * (11 - i);
        }
        let segundoDigito = 11 - (soma % 11);
        if (segundoDigito >= 10) segundoDigito = 0;
        if (cpfArray[10] !== segundoDigito) return false;

        return true;
    } 

    validarRegex = (cpf: string): boolean => {
        return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf);
    }
}