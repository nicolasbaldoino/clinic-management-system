export const validCPF = (cpf: string | undefined) => {
    if (!cpf) return true
  
    cpf = cpf.replace(/[^\d]/g, '')
    if (cpf.length !== 11) return false
  
    if (/^(\d)\1+$/.test(cpf)) return false
  
    let sum = 0
    let remainder
  
    for (let i = 1; i <= 9; i++) {
      sum = sum + parseInt(cpf[i - 1]) * (11 - i)
    }
  
    remainder = (sum * 10) % 11
  
    if (remainder === 10 || remainder === 11) {
      remainder = 0
    }
  
    if (remainder !== parseInt(cpf[9])) return false
  
    sum = 0
    for (let i = 1; i <= 10; i++) {
      sum = sum + parseInt(cpf[i - 1]) * (12 - i)
    }
  
    remainder = (sum * 10) % 11
  
    if (remainder === 10 || remainder === 11) {
      remainder = 0
    }
  
    if (remainder !== parseInt(cpf[10])) return false
  
    return true
  }
  