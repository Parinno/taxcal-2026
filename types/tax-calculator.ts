export interface IncomeData {
  salary: string | number
  bonus: string | number
  otherIncome: string | number
  withholdingTax: string | number
}

export interface DeductionsData {
  personalDeduction: string | number
  // Family: facts the user knows, turned into baht by the rules
  hasSpouseWithoutIncome?: boolean
  childrenBornBefore2561Count?: string | number
  childrenBornFrom2561Count?: string | number
  maternityExpense?: string | number
  ownParentsCount?: string | number
  spouseParentsCount?: string | number
  disabledDependentsCount?: string | number
  socialSecurity: string | number
  providentFund: string | number
  // Amount of LTF switched into ThaiESGX, not the deduction itself
  ltfSwitchedAmount?: string | number
  otherDeduction: string | number
  lifeInsurance?: string | number
  healthInsurance?: string | number
  parentHealthInsurance?: string | number
  spouseLifeInsurance?: string | number
  homeLoanInterest?: string | number
  solarRooftop?: string | number
  artwork?: string | number
  socialEnterprise?: string | number
  // Amount actually paid; the deduction is twice this
  doubleDonation?: string | number
  donation?: string | number
  partyDonation?: string | number
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
  deductedByField?: Record<string, number>
}
