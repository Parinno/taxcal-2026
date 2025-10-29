import type {
  IncomeData,
  DeductionsData,
  FamilyData,
  ProvidentFundData,
  InsuranceData,
  OtherFundsData,
  CalculationResult
} from '../types/tax-calculator'

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
      totalExpenses: employmentExpense,
      totalDeductions: familyDeductions + retirementUsed + socialSecurity + housingInterest + lifeInsurance + healthInsurance + parentsHealthInsurance,
      totalDeductionsAndExpenses: employmentExpense + familyDeductions + retirementUsed + socialSecurity + housingInterest + lifeInsurance + healthInsurance + parentsHealthInsurance,
      taxableIncome,
      taxAmount,
      retirementUsed,
      withholdingTax: 0,
      netTaxPayable: taxAmount,
    }
  }

  // Helpers used in result screen - ONLY RMF and TESG
  const getInvestmentRecommendations = (totalIncome: number) => {
    const rmfMax = Math.min(totalIncome * 0.3, 500000)
    const thaiEsgMax = Math.min(totalIncome * 0.3, 300000)
    return { rmfMax, thaiEsgMax }
  }

  // Get ThaiESGX limits for forms
  const getThaiESGXLimits = (totalIncome: number) => {
    const thaiESGXLimit = Math.min(totalIncome * 0.3, 300000)
    return {
      thaiESGXLimit,
      thaiESGXTransferredLimit: thaiESGXLimit // Same limit for transferred
    }
  }

  const computeTotalInvestment = (rmf: number, thaiEsg: number, thaiEsgx: number, ltf: number) => {
    return (toNumber(rmf) + toNumber(thaiEsg) + toNumber(thaiEsgx) + toNumber(ltf))
  }

  const computeTaxSavingsFromInvestments = (totalInvestmentAmount: number, taxableIncome: number, baseTax: number) => {
    // Apply limits to investment amount
    // Maximum possible investment: RMF(500k) + ThaiESG(300k) = 800k
    const maxAllowedInvestment = 800000
    const limitedInvestmentAmount = Math.min(totalInvestmentAmount, maxAllowedInvestment)
    
    // Calculate tax on reduced taxable income
    const newTaxableIncome = Math.max(0, taxableIncome - limitedInvestmentAmount)
    
    // Calculate new tax amount
    let newTaxAmount = 0
    if (newTaxableIncome > 0) {
      if (newTaxableIncome <= 150000) newTaxAmount = 0
      else if (newTaxableIncome <= 300000) newTaxAmount = (newTaxableIncome - 150000) * 0.05
      else if (newTaxableIncome <= 500000) newTaxAmount = 7500 + (newTaxableIncome - 300000) * 0.1
      else if (newTaxableIncome <= 750000) newTaxAmount = 27500 + (newTaxableIncome - 500000) * 0.15
      else if (newTaxableIncome <= 1000000) newTaxAmount = 65000 + (newTaxableIncome - 750000) * 0.2
      else if (newTaxableIncome <= 2000000) newTaxAmount = 115000 + (newTaxableIncome - 1000000) * 0.25
      else if (newTaxableIncome <= 5000000) newTaxAmount = 365000 + (newTaxableIncome - 2000000) * 0.3
      else newTaxAmount = 1265000 + (newTaxableIncome - 5000000) * 0.35
    }
    
    // Tax savings = original tax - new tax
    // If negative, it means no tax savings
    return Math.max(0, baseTax - newTaxAmount)
  }

  const computeMaxTaxSavingsFromInvestments = (totalIncome: number, taxableIncome: number, baseTax: number) => {
    // Calculate maximum possible investment with proper limits - ONLY RMF and TESG
    const recommendations = getInvestmentRecommendations(totalIncome)
    
    // RMF: 30% of total income, max 500k, but limited by remaining retirement cap
    const rmfMax = Math.min(recommendations.rmfMax, 500000)
    
    // ThaiESG: 30% of total income, max 300k, separate from retirement funds
    const thaiEsgMax = Math.min(recommendations.thaiEsgMax, 300000)
    
    // Only use RMF and TESG for maximum tax savings calculation
    const maxInvestment = rmfMax + thaiEsgMax
    
    // Calculate tax savings from maximum investment
    return computeTaxSavingsFromInvestments(maxInvestment, taxableIncome, baseTax)
  }

  const computeDonationDeductions = (educationDonation: number, generalDonation: number, taxableIncome: number) => {
    const incomeBase = Math.max(taxableIncome, 0)
    const educationDeduction = Math.min(toNumber(educationDonation) * 2, incomeBase * 0.1)
    const generalDeduction = Math.min(toNumber(generalDonation), incomeBase * 0.1)
    return educationDeduction + generalDeduction
  }

  const computeFinalTaxAmount = (baseTax: number, taxableIncome: number, totalInvestmentAmount: number, donationDeduction: number) => {
    // Calculate final taxable income after investments and donations
    const finalTaxableIncome = Math.max(0, taxableIncome - totalInvestmentAmount - donationDeduction)
    
    // Calculate final tax amount
    let finalTaxAmount = 0
    if (finalTaxableIncome > 0) {
      if (finalTaxableIncome <= 150000) finalTaxAmount = 0
      else if (finalTaxableIncome <= 300000) finalTaxAmount = (finalTaxableIncome - 150000) * 0.05
      else if (finalTaxableIncome <= 500000) finalTaxAmount = 7500 + (finalTaxableIncome - 300000) * 0.1
      else if (finalTaxableIncome <= 750000) finalTaxAmount = 27500 + (finalTaxableIncome - 500000) * 0.15
      else if (finalTaxableIncome <= 1000000) finalTaxAmount = 65000 + (finalTaxableIncome - 750000) * 0.2
      else if (finalTaxableIncome <= 2000000) finalTaxAmount = 115000 + (finalTaxableIncome - 1000000) * 0.25
      else if (finalTaxableIncome <= 5000000) finalTaxAmount = 365000 + (finalTaxableIncome - 2000000) * 0.3
      else finalTaxAmount = 1265000 + (finalTaxableIncome - 5000000) * 0.35
    }
    
    // If negative, it means tax refund
    return finalTaxAmount
  }

  const computeTaxAmountAfterMaxInvestment = (baseTax: number, taxableIncome: number, totalIncome: number) => {
    // Calculate maximum possible investment with proper limits - ONLY RMF and TESG
    const recommendations = getInvestmentRecommendations(totalIncome)
    const maxInvestment = recommendations.rmfMax + recommendations.thaiEsgMax
    
    // Calculate tax amount after maximum investment (no donation deductions)
    return computeFinalTaxAmount(baseTax, taxableIncome, maxInvestment, 0)
  }

  // New simplified calculation function that works with actual form fields
  const calculateTaxFromForms = (
    incomeData: IncomeData,
    deductionsData: DeductionsData
  ): CalculationResult => {
    // Annualize salary and compute total income
    const monthlySalary = toNumber(incomeData.salary)
    const annualSalary = monthlySalary * 12
    const bonus = toNumber(incomeData.bonus)
    const otherIncome = toNumber(incomeData.otherIncome)
    const totalIncome = annualSalary + bonus + otherIncome

    // Withholding tax from income data
    const withholdingTax = toNumber(incomeData.withholdingTax)

    // Standard expense deduction (50% of employment income capped at 100,000)
    const employmentIncome = annualSalary + bonus
    const employmentExpense = Math.min(employmentIncome * 0.5, 100000)

    // Basic deductions from form
    const personalDeduction = toNumber(deductionsData.personalDeduction) || 60000
    const socialSecurity = Math.min(toNumber(deductionsData.socialSecurity), 9000)
    const providentFund = Math.min(toNumber(deductionsData.providentFund), Math.min(annualSalary * 0.15, 500000))
    
    // ThaiESGX limits: 30% of total income, max 300,000 baht
    const thaiESGXLimit = Math.min(totalIncome * 0.3, 300000)
    const thaiESGX = Math.min(toNumber(deductionsData.thaiESGX), thaiESGXLimit)
    
    // ThaiESGX Transferred from LTF: same limits as ThaiESGX
    const thaiESGXTransferredLimit = Math.min(totalIncome * 0.3, 300000)
    const thaiESGXTransferred = Math.min(toNumber(deductionsData.thaiESGXTransferred), thaiESGXTransferredLimit)

    // Other deductions (no specific limits, but should be reasonable)
    const otherDeduction = toNumber(deductionsData.otherDeduction)

    // Calculate expenses and deductions separately
    const totalExpenses = employmentExpense
    const totalDeductions = personalDeduction + socialSecurity + providentFund + thaiESGX + thaiESGXTransferred + otherDeduction
    const totalDeductionsAndExpenses = totalExpenses + totalDeductions

    const taxableIncome = Math.max(0, totalIncome - totalDeductionsAndExpenses)

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

    // Calculate net tax payable (tax amount - withholding tax)
    // If negative, it means tax refund
    const netTaxPayable = taxAmount - withholdingTax

    return {
      totalIncome,
      totalExpenses,
      totalDeductions,
      totalDeductionsAndExpenses,
      taxableIncome,
      taxAmount,
      retirementUsed: providentFund + thaiESGX + thaiESGXTransferred,
      withholdingTax,
      netTaxPayable,
    }
  }

  // Tax planning calculations
  const calculateTaxPlanning = (
    calculationData: CalculationResult,
    rmfInvestment: number,
    thaiEsgInvestment: number
  ) => {
    const totalInvestment = rmfInvestment + thaiEsgInvestment
    
    // Calculate tax savings from investments
    const taxSavings = computeTaxSavingsFromInvestments(
      totalInvestment,
      calculationData.taxableIncome,
      calculationData.taxAmount
    )
    
    // Calculate before and after tax amounts
    const beforeTaxAmount = calculationData.netTaxPayable || (calculationData.taxAmount - calculationData.withholdingTax)
    // If negative, it means tax refund
    const afterTaxAmount = beforeTaxAmount - taxSavings
    
    // Calculate final tax amount after investments
    const finalTaxAmount = computeFinalTaxAmount(
      calculationData.taxAmount,
      calculationData.taxableIncome,
      totalInvestment,
      0 // No donation deduction
    )
    // If negative, it means tax refund
    const finalNetTaxPayable = finalTaxAmount - calculationData.withholdingTax
    
    return {
      totalInvestment,
      taxSavings,
      beforeTaxAmount,
      afterTaxAmount,
      finalTaxAmount,
      finalNetTaxPayable,
      taxReduction: -taxSavings
    }
  }

  // Get investment limits for forms - ONLY RMF and TESG
  const getInvestmentLimits = (totalIncome: number) => {
    const recommendations = getInvestmentRecommendations(totalIncome)
    return {
      rmfMax: recommendations.rmfMax,
      thaiEsgMax: recommendations.thaiEsgMax
    }
  }

  // Get maximum tax rate based on taxable income
  const getMaxTaxRate = (taxableIncome: number): number => {
    if (taxableIncome <= 150000) return 0
    else if (taxableIncome <= 300000) return 5
    else if (taxableIncome <= 500000) return 10
    else if (taxableIncome <= 750000) return 15
    else if (taxableIncome <= 1000000) return 20
    else if (taxableIncome <= 2000000) return 25
    else if (taxableIncome <= 5000000) return 30
    else return 35
  }

  // Tax planning result calculations
  const calculateTaxPlanningResult = (
    calculationData: CalculationResult,
    rmfInvestment: number,
    thaiEsgInvestment: number
  ) => {
    const totalInvestment = rmfInvestment + thaiEsgInvestment
    
    // Calculate tax savings from investments
    const taxSavings = computeTaxSavingsFromInvestments(
      totalInvestment,
      calculationData.taxableIncome,
      calculationData.taxAmount
    )
    
    // Calculate before and after tax amounts
    const beforeTaxAmount = calculationData.netTaxPayable || (calculationData.taxAmount - calculationData.withholdingTax)
    const afterTaxAmount = beforeTaxAmount - taxSavings
    
    // Calculate maximum possible tax savings
    const maxTaxSavings = computeMaxTaxSavingsFromInvestments(
      calculationData.totalIncome,
      calculationData.taxableIncome,
      calculationData.taxAmount
    )
    
    // Get investment limits
    const investmentLimits = getInvestmentLimits(calculationData.totalIncome)
    
    // Calculate tax rates for before/after scenarios
    const beforeTaxRate = getMaxTaxRate(calculationData.taxableIncome)
    const afterTaxableIncome = Math.max(0, calculationData.taxableIncome - investmentLimits.rmfMax - investmentLimits.thaiEsgMax)
    const afterTaxRate = getMaxTaxRate(afterTaxableIncome)
    
    return {
      totalInvestment,
      taxSavings,
      beforeTaxAmount,
      afterTaxAmount,
      maxTaxSavings,
      investmentLimits,
      beforeTaxRate,
      afterTaxRate,
      rmfMaxValue: investmentLimits.rmfMax,
      thaiEsgMaxValue: investmentLimits.thaiEsgMax
    }
  }

  // Tax summary calculations
  const calculateTaxSummary = (
    calculationData: CalculationResult,
    taxPlanning: any,
    rmfInvestment: number,
    thaiEsgInvestment: number
  ) => {
    const maxTaxRate = getMaxTaxRate(calculationData.taxableIncome)
    
    return {
      maxTaxRate,
      netTaxPayable: calculationData.netTaxPayable,
      totalIncome: calculationData.totalIncome,
      totalExpenses: calculationData.totalExpenses,
      totalDeductions: calculationData.totalDeductions,
      taxableIncome: calculationData.taxableIncome,
      taxAmount: calculationData.taxAmount,
      withholdingTax: calculationData.withholdingTax,
      totalInvestment: taxPlanning.totalInvestment,
      taxSavings: taxPlanning.taxSavings,
      rmfInvestment,
      thaiEsgInvestment
    }
  }

  return {
    calculateTax,
    calculateTaxFromForms,
    calculateTaxPlanning,
    calculateTaxPlanningResult,
    calculateTaxSummary,
    getInvestmentRecommendations,
    getInvestmentLimits,
    getThaiESGXLimits,
    computeTotalInvestment,
    computeTaxSavingsFromInvestments,
    computeMaxTaxSavingsFromInvestments,
    computeDonationDeductions,
    computeFinalTaxAmount,
    computeTaxAmountAfterMaxInvestment,
    getMaxTaxRate,
  }
}


