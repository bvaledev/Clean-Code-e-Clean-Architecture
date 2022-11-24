// @ts-nocheck
/**
 * CODE SMELLS
 * 1 - Linha em branco
 * 2 - Erro de identação
 * 3 - Comentários
 * 4 - Condições confusas
 * 5 - Tratamento inadequado de exception
 * 6 - Declaração da variável longe da utilização
 * 7 - Algorítimo confuso
 * 8 - Nomes estranhos
 * 9 - Número mágico
 */

const FIRST_DIGIT_FACTOR = 10;
const SECOND_DIGIT_FACTOR = 11;

export function validateCPF(rawCpf) {
  if (!rawCpf) return false
  const cpf = cleanCPF(rawCpf)
  if (isInvalidLength(cpf)) return false
  if (allDigitsIsTheSame(cpf)) return false
  const firstDigit = calculateDigits(cpf, FIRST_DIGIT_FACTOR)
  const secondDigit = calculateDigits(cpf, SECOND_DIGIT_FACTOR)
  const validatedDigit = `${firstDigit}${secondDigit}`;
  return extractDigit(cpf) === validatedDigit;
}

function calculateDigits(cpf: string, factor: number) {
  let total = 0
  for (const digit of cpf) {
    if (factor > 1) total += digit * factor--;
  }
  const rest = total % 11
  return (rest < 2) ? 0 : 11 - rest
}

const cleanCPF = (rawCpf: string) => rawCpf.replace(/\D+/g, "")

const isInvalidLength = (cpf: string) => cpf.length !== 11

const allDigitsIsTheSame = (cpf: string) => {
  const [firstDigit] = cpf
  return [...cpf].every((digit) => digit === firstDigit)
}

const extractDigit = (cpf: string) => cpf.slice(9)
