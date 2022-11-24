import { validate } from "../../src/cpf/cpf";

describe("Validar cpf", () => {
  it("should return false if cpf is null", () => {
    const result = validate(null as unknown as string);
    expect(result).toBe(false);
  });

  it("should return false if cpf is undefined", () => {
    const result = validate(undefined as unknown as string);
    expect(result).toBe(false);
  });

  it("should return false if cpf does not have the correct length", () => {
    const result = validate("111.111");
    expect(result).toBe(false);
  });

  it("should return false if cpf has only the first digit repeated", () => {
    const result = validate("111.111.111-11");
    expect(result).toBe(false);
  });

  it("should return true if cpf is invalid", () => {
    const result = validate("111.444.778-35");
    expect(result).toBe(false);
  });

  it("should return true if cpf is valid", () => {
    const result = validate("111.444.777-35");
    expect(result).toBe(true);
  });

  it("should return true if the last cpf digit is zero", () => {
    const result = validate("47308766870");
    expect(result).toBe(true);
  });

  it("should return true if the second last cpf digit is zero", () => {
    const result = validate("05192346002");
    expect(result).toBe(true);
  });
});
