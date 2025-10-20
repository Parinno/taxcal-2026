export interface IncomeData {
  salary: string | number
  bonus: string | number
  otherIncome: string | number
}

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
  totalDeductions: number
  taxableIncome: number
  taxAmount: number
  retirementUsed: number
}

export function useTaxCalculator() {
  const toNumber = (v: string | number | undefined | null): number => {
    const n = typeof v === 'string' ? parseFloat(v) : (v as number) || 0
    return isNaN(n) ? 0 : n
  }

  const calculateTax = (
    incomeData: IncomeData,
    familyData: FamilyData,
    providentFundData: ProvidentFundData,
    insuranceData: InsuranceData,
    otherFundsData: OtherFundsData
  ): CalculationResult => {
    // Annualize salary and compute total income
    const monthlySalary = toNumber(incomeData.salary)
    const annualSalary = monthlySalary * 12
    const bonus = toNumber(incomeData.bonus)
    const otherIncome = toNumber(incomeData.otherIncome)
    const totalIncome = annualSalary + bonus + otherIncome

    // Standard expense deduction (50% of employment income capped at 100,000)
    const employmentIncome = annualSalary + bonus
    const employmentExpense = Math.min(employmentIncome * 0.5, 100000)

    // Family deductions
    let familyDeductions = 0
    familyDeductions += 60000 // personal
    if (
      familyData.maritalStatus === 'married_joint' ||
      (familyData.maritalStatus === 'married_separate' && familyData.spouseNoIncome)
    ) {
      familyDeductions += 60000
    }
    if (familyData.parentsSelf.father) familyDeductions += 30000
    if (familyData.parentsSelf.mother) familyDeductions += 30000
    if (familyData.parentsSpouse.father) familyDeductions += 30000
    if (familyData.parentsSpouse.mother) familyDeductions += 30000
    if (familyData.maritalStatus !== 'single' && familyData.hasChild) familyDeductions += 30000
    if (familyData.disabledNoIncome.father) familyDeductions += 60000
    if (familyData.disabledNoIncome.mother) familyDeductions += 60000
    if (familyData.disabledNoIncome.relative) familyDeductions += 60000
    if (familyData.disabledSpouseNoIncome.spouse) familyDeductions += 60000
    if (familyData.disabledSpouseNoIncome.father) familyDeductions += 60000
    if (familyData.disabledSpouseNoIncome.mother) familyDeductions += 60000

    // Funds and social security with limits
    const providentFundInput = toNumber(providentFundData.providentFund)
    const providentFundLimit = Math.min(annualSalary * 0.15, 500000)
    const providentFund = Math.min(providentFundInput, providentFundLimit)

    const socialSecurityInput = toNumber(providentFundData.socialSecurity)
    const socialSecurity = Math.min(socialSecurityInput, 9000)

    const housingInterestInput = toNumber(providentFundData.housingInterest)
    const housingInterest = Math.min(housingInterestInput, 100000)

    // Insurance with limits
    const lifeInsuranceInput = toNumber(insuranceData.lifeInsurance)
    const healthInsuranceInput = toNumber(insuranceData.healthInsurance)
    let healthInsurance = Math.min(healthInsuranceInput, 25000)
    let lifeInsurance = Math.min(lifeInsuranceInput, 100000)
    if (lifeInsurance + healthInsurance > 100000) {
      lifeInsurance = Math.max(0, 100000 - healthInsurance)
    }

    const parentsHealthInsuranceInput = toNumber(insuranceData.parentsHealthInsurance)
    const parentsHealthInsurance = Math.min(parentsHealthInsuranceInput, 15000)

    const pensionLifeInsuranceInput = toNumber(insuranceData.pensionLifeInsurance)
    const pensionLifeInsuranceLimit = Math.min(totalIncome * 0.15, 200000)
    const pensionLifeInsurance = Math.min(pensionLifeInsuranceInput, pensionLifeInsuranceLimit)

    // Other retirement funds with limits
    const governmentPensionFundInput = toNumber(otherFundsData.governmentPensionFund)
    const governmentPensionFundLimit = Math.min(totalIncome * 0.15, 500000)
    const governmentPensionFund = Math.min(
      governmentPensionFundInput,
      governmentPensionFundLimit
    )

    const nationalSavingsFundInput = toNumber(otherFundsData.nationalSavingsFund)
    const nationalSavingsFund = Math.min(nationalSavingsFundInput, 13200)

    const privateTeachersFundInput = toNumber(otherFundsData.privateTeachersFund)
    const privateTeachersFundLimit = Math.min(totalIncome * 0.15, 500000)
    const privateTeachersFund = Math.min(privateTeachersFundInput, privateTeachersFundLimit)

    const retirementFundsTotal =
      providentFund +
      pensionLifeInsurance +
      governmentPensionFund +
      nationalSavingsFund +
      privateTeachersFund
    const retirementUsed = Math.min(retirementFundsTotal, 500000)

    // All deductions
    const totalDeductions =
      employmentExpense +
      familyDeductions +
      retirementUsed +
      socialSecurity +
      housingInterest +
      lifeInsurance +
      healthInsurance +
      parentsHealthInsurance

    const taxableIncome = Math.max(0, totalIncome - totalDeductions)

    // Tax calculation by brackets
    let taxAmount = 0
    if (taxableIncome > 0) {
      if (taxableIncome <= 150000) taxAmount = 0
      else if (taxableIncome <= 300000) taxAmount = (taxableIncome - 150000) * 0.05
      else if (taxableIncome <= 500000) taxAmount = 7500 + (taxableIncome - 300000) * 0.1
      else if (taxableIncome <= 750000) taxAmount = 27500 + (taxableIncome - 500000) * 0.15
      else if (taxableIncome <= 1000000) taxAmount = 65000 + (taxableIncome - 750000) * 0.2
      else if (taxableIncome <= 2000000) taxAmount = 115000 + (taxableIncome - 1000000) * 0.25
      else if (taxableIncome <= 5000000) taxAmount = 365000 + (taxableIncome - 2000000) * 0.3
      else taxAmount = 1265000 + (taxableIncome - 5000000) * 0.35
    }

    return {
      totalIncome,
      totalDeductions,
      taxableIncome,
      taxAmount,
      retirementUsed,
    }
  }

  // Helpers used in result screen
  const getInvestmentRecommendations = (totalIncome: number) => {
    const rmfMax = Math.min(totalIncome * 0.3, 500000)
    const thaiEsgMax = Math.min(totalIncome * 0.3, 300000)
    const thaiEsgxMax = Math.min(totalIncome * 0.3, 300000)
    const ltfMax = 300000
    return { rmfMax, thaiEsgMax, thaiEsgxMax, ltfMax }
  }

  const computeTotalInvestment = (rmf: number, thaiEsg: number, thaiEsgx: number, ltf: number) => {
    return (toNumber(rmf) + toNumber(thaiEsg) + toNumber(thaiEsgx) + toNumber(ltf))
  }

  const computeTaxSavingsFromInvestments = (totalInvestmentAmount: number, taxableIncome: number, baseTax: number) => {
    const effectiveRate = baseTax / Math.max(taxableIncome, 1)
    return totalInvestmentAmount * effectiveRate
  }

  const computeDonationDeductions = (educationDonation: number, generalDonation: number, taxableIncome: number) => {
    const incomeBase = Math.max(taxableIncome, 0)
    const educationDeduction = Math.min(toNumber(educationDonation) * 2, incomeBase * 0.1)
    const generalDeduction = Math.min(toNumber(generalDonation), incomeBase * 0.1)
    return educationDeduction + generalDeduction
  }

  const computeFinalTaxAmount = (baseTax: number, taxableIncome: number, totalInvestmentAmount: number, donationDeduction: number) => {
    const investmentSavings = computeTaxSavingsFromInvestments(totalInvestmentAmount, taxableIncome, baseTax)
    const donationSavings = computeTaxSavingsFromInvestments(donationDeduction, taxableIncome, baseTax)
    return Math.max(0, baseTax - investmentSavings - donationSavings)
  }

  return {
    calculateTax,
    getInvestmentRecommendations,
    computeTotalInvestment,
    computeTaxSavingsFromInvestments,
    computeDonationDeductions,
    computeFinalTaxAmount,
  }
}


