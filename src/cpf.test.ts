import {validateCPF} from './validateCPF'
test("Should validate corretly CPF", function() {
    expect(validateCPF("000.000.000-00")).toBe(false)
    expect(validateCPF("111.111.111-11")).toBe(false)
    expect(validateCPF("783.511.060-11")).toBe(true)
    expect(validateCPF("085.528.560-50")).toBe(true)
    expect(validateCPF("085.528.560-50")).toBe(true)
    expect(validateCPF("08552856050")).toBe(true)
})
