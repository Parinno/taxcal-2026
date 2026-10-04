export interface IncomeData {
  salary: string | number
  bonus: string | number
  otherIncome: string | number
  withholdingTax: string | number
}

export interface DeductionsData {
  personalDeduction: string | number
  socialSecurity: string | number
  providentFund: string | number
  thaiESGX: string | number
  thaiESGXTransferred: string | number
  otherDeduction: string | number
  lifeInsurance?: string | number
  healthInsurance?: string | number
  homeLoanInterest?: string | number
  donation?: string | number
}

export interface CalculationResult {
  totalIncome: number
  totalExpenses: number
  totalDeductions: number
  totalDeductionsAndExpenses: number
  taxableIncome: number
  taxAmount: number
  retirementUsed: number
  providentFund?: number
  withholdingTax: number
  netTaxPayable: number
}
