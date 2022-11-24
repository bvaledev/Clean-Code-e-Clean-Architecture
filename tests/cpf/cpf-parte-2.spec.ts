import { validateCPF } from '../../src/cpf/cpf-parte-2'

describe('CPF PARTE 2', () => {
  const validCPFs = [
    "987.654.321-00",
    "98765432100",
    "714.602.380-01",
    "71460238001",
    "313.030.210-72",
    "31303021072",
    "144.796.170-60",
    "14479617060"
  ]

  const invalidCPFs = [
    "111.111.111-11",
    "222.222.222-22",
    "333.333.333-33",
    "44444444444",
  ]

  it.each(validCPFs)('should test a valid cpf %s', (validCPF: string) => {
    const validationResult = validateCPF(validCPF)

    expect(validationResult).toBe(true)
  })

  it.each(invalidCPFs)('should test a invalid cpf %s', (invalidCPF: string) => {
    const validationResult = validateCPF(invalidCPF)

    expect(validationResult).toBe(false)
  })

  it('should test a invalid cpf null', () => {
    const validationResult = validateCPF(null)

    expect(validationResult).toBe(false)
  })

  it('should test a invalid cpf undefined', () => {
    const validationResult = validateCPF(undefined)

    expect(validationResult).toBe(false)
  })

  it('should test a invalid cpf with invalid length', () => {
    const validationResult = validateCPF('1231211122233355')

    expect(validationResult).toBe(false)
  })

})
