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
}

// Legacy interfaces for backward compatibility
export interface FamilyData {
  maritalStatus: string
  spouseIncomeStatus: string
  spouseNoIncome: boolean
  personalDeduction: number
  parentsSelf: { father: boolean; mother: boolean }
  parentsSpouse: { father: boolean; mother: boolean }
  hasChild: boolean
  disabledNoIncome: { father: boolean; mother: boolean; relative: boolean }
  disabledSpouseNoIncome: { spouse: boolean; father: boolean; mother: boolean }
}

export interface ProvidentFundData {
  providentFund: string | number
  socialSecurity: string | number
  housingInterest: string | number
}

export interface InsuranceData {
  lifeInsurance: string | number
  healthInsurance: string | number
  parentsHealthInsurance: string | number
  pensionLifeInsurance: string | number
}

export interface OtherFundsData {
  governmentPensionFund: string | number
  nationalSavingsFund: string | number
  privateTeachersFund: string | number
}

export interface CalculationResult {
  totalIncome: number
  totalExpenses: number
  totalDeductions: number
  totalDeductionsAndExpenses: number
  taxableIncome: number
  taxAmount: number
  retirementUsed: number
  withholdingTax: number
  netTaxPayable: number
}
