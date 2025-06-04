import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class DocumentValidatorService {
  validarCpf(cpf: string): boolean {
    const cleaned = cpf.replace(/[^\d]/g, '');

    if (cleaned.length !== 11) return false;

    // Rejeita CPFs com todos os dígitos iguais
    if (/^(\d)\1+$/.test(cleaned)) return false;

    const cpfArray = cleaned.split('').map(d => parseInt(d, 10));

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

  validarCnpj(cnpj: string): boolean {
    const cleaned = cnpj.replace(/[^\d]/g, '');

    if (cleaned.length !== 14) return false;

    // Rejeita CNPJs com todos os dígitos iguais
    if (/^(\d)\1+$/.test(cleaned)) return false;

    const cnpjArray = cleaned.split('').map(d => parseInt(d, 10));

    const validarDigito = (posicoes: number[], digitoIndex: number): boolean => {
      let soma = 0;
      let peso = posicoes.length - 7;

      for (let i = 0; i < posicoes.length; i++) {
        soma += cnpjArray[i] * peso;
        peso--;
        if (peso < 2) peso = 9;
      }

      let digitoCalculado = 11 - (soma % 11);
      if (digitoCalculado >= 10) digitoCalculado = 0;

      return cnpjArray[digitoIndex] === digitoCalculado;
    };

    // Valida primeiro dígito verificador
    if (!validarDigito(cnpjArray.slice(0, 12), 12)) return false;

    // Valida segundo dígito verificador
    if (!validarDigito(cnpjArray.slice(0, 13), 13)) return false;

    return true;
  }

  validarCpfFormatado(cpf: string): boolean {
    return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf);
  }

  validarCnpjFormatado(cnpj: string): boolean {
    return /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(cnpj);
  }
}
