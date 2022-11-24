const FIRST_DIGIT_FACTOR = 10;
const SECOND_DIGIT_FACTOR = 11;

function removeNonDigits(value: string) {
  return value.replace(/\D+/g, "");
}

function hasTheSameDigit(value: string) {
  const [firstDigit] = value;
  return [...value].every((c) => c === firstDigit);
}

function hasValidLength(value: string) {
  return value.length === 11 || value.length === 14;
}

function extractCheckDigit(value: string) {
  return value.slice(-2);
}

function calculateDigit(cpf: string, factor: number) {
  let total: number = 0;
  for (const digit of cpf) {
    if (factor > 1) {
      total += parseInt(digit) * factor--;
    }
  }
  const rest = total % 11;
  return rest < 2 ? 0 : 11 - rest;
}

export function validate(cpf: string) {
  if (!cpf || !hasValidLength(cpf)) return false;
  cpf = removeNonDigits(cpf);
  if (hasTheSameDigit(cpf)) return false;
  const firstDigit = calculateDigit(cpf, FIRST_DIGIT_FACTOR);
  const secondDigit = calculateDigit(cpf, SECOND_DIGIT_FACTOR);
  let checkDigit = extractCheckDigit(cpf);
  let checkDigitCalculated = `${firstDigit}${secondDigit}`;
  return checkDigit === checkDigitCalculated;
}
