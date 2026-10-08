import type {
  IncomeData,
  DeductionsData,
  CalculationResult
} from '../types/tax-calculator'

export function useTaxCalculator() {
  const toNumber = (v: string | number | undefined | null): number => {
    const n = typeof v === 'string' ? parseFloat(v) : (v as number) || 0
    return isNaN(n) ? 0 : n
  }

  // Helper function for tax calculation by brackets
  const calculateTaxByBrackets = (taxableIncome: number): number => {
    if (taxableIncome <= 0) return 0
    if (taxableIncome <= 150000) return 0
    else if (taxableIncome <= 300000) return (taxableIncome - 150000) * 0.05
    else if (taxableIncome <= 500000) return 7500 + (taxableIncome - 300000) * 0.1
    else if (taxableIncome <= 750000) return 27500 + (taxableIncome - 500000) * 0.15
    else if (taxableIncome <= 1000000) return 65000 + (taxableIncome - 750000) * 0.2
    else if (taxableIncome <= 2000000) return 115000 + (taxableIncome - 1000000) * 0.25
    else if (taxableIncome <= 5000000) return 365000 + (taxableIncome - 2000000) * 0.3
    else return 1265000 + (taxableIncome - 5000000) * 0.35
  }

  // Helper function to get investment recommendations
  const getInvestmentRecommendations = (totalIncome: number) => {
    const rmfMax = Math.min(totalIncome * 0.3, 500000)
    const thaiEsgMax = Math.min(totalIncome * 0.3, 300000)
    return { rmfMax, thaiEsgMax }
  }

  // Helper function to compute tax savings from investments
  const computeTaxSavingsFromInvestments = (totalInvestmentAmount: number, taxableIncome: number, baseTax: number) => {
    // Apply limits to investment amount
    // Maximum possible investment: RMF(500k) + ThaiESG(300k) = 800k
    const maxAllowedInvestment = 800000
    const limitedInvestmentAmount = Math.min(totalInvestmentAmount, maxAllowedInvestment)
    
    // Calculate tax on reduced taxable income
    const newTaxableIncome = Math.max(0, taxableIncome - limitedInvestmentAmount)
    
    // Calculate new tax amount
    const newTaxAmount = calculateTaxByBrackets(newTaxableIncome)
    
    // Tax savings = original tax - new tax
    // If negative, it means no tax savings
    return Math.max(0, baseTax - newTaxAmount)
  }

  // Helper function to compute maximum tax savings from investments
  const computeMaxTaxSavingsFromInvestments = (calculationData: CalculationResult) => {
    // Calculate maximum possible investment with proper limits - ONLY RMF and TESG
    const recommendations = getInvestmentRecommendations(calculationData.totalIncome)
    
    // RMF: 30% of total income, max 500k, but limited by remaining retirement cap
    // Adjust RMF Max by subtracting existing provident fund contributions
    const rmfMax = Math.min(recommendations.rmfMax - (calculationData.providentFund || 0), 500000)
    
    // ThaiESG: 30% of total income, max 300k, separate from retirement funds
    const thaiEsgMax = Math.min(recommendations.thaiEsgMax, 300000)
    
    // Only use RMF and TESG for maximum tax savings calculation
    const maxInvestment = rmfMax + thaiEsgMax
    
    // Calculate tax savings from maximum investment
    return computeTaxSavingsFromInvestments(maxInvestment, calculationData.taxableIncome, calculationData.taxAmount)
  }

  // Helper function to get investment limits
  const getInvestmentLimits = (totalIncome: number) => {
    const recommendations = getInvestmentRecommendations(totalIncome)
    return {
      rmfMax: recommendations.rmfMax,
      thaiEsgMax: recommendations.thaiEsgMax
    }
  }

  // Helper function to get maximum tax rate based on taxable income
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

  // Helper function to compute final tax amount
  const computeFinalTaxAmount = (baseTax: number, taxableIncome: number, totalInvestmentAmount: number, donationDeduction: number) => {
    // Calculate final taxable income after investments and donations
    const finalTaxableIncome = Math.max(0, taxableIncome - totalInvestmentAmount - donationDeduction)
    
    // Calculate final tax amount
    const finalTaxAmount = calculateTaxByBrackets(finalTaxableIncome)
    
    // If negative, it means tax refund
    return finalTaxAmount
  }

  // Family deductions for tax year 2569, from the facts the user enters
  const getFamilyDeductions = (deductionsData: DeductionsData) => {
    const hasSpouse = Boolean(deductionsData.hasSpouseWithoutIncome)
    const bornBefore2561 = Math.max(0, Math.floor(toNumber(deductionsData.childrenBornBefore2561Count)))
    const bornFrom2561 = Math.max(0, Math.floor(toNumber(deductionsData.childrenBornFrom2561Count)))
    const ownParents = Math.min(Math.max(0, Math.floor(toNumber(deductionsData.ownParentsCount))), 2)
    // The spouse's parents count only when the spouse has no income
    const spouseParents = hasSpouse
      ? Math.min(Math.max(0, Math.floor(toNumber(deductionsData.spouseParentsCount))), 2)
      : 0
    const disabledDependents = Math.max(0, Math.floor(toNumber(deductionsData.disabledDependentsCount)))

    const spouse = hasSpouse ? 60000 : 0
    // 30,000 per child, 60,000 for child no. 2 onward born in 2561 or later.
    // Older children come first, so a child born before 2561 is always the first one
    const firstChildBornFrom2561 = bornBefore2561 === 0 && bornFrom2561 > 0 ? 1 : 0
    const children = bornBefore2561 * 30000
      + firstChildBornFrom2561 * 30000
      + (bornFrom2561 - firstChildBornFrom2561) * 60000
    const parents = (ownParents + spouseParents) * 30000
    const disabled = disabledDependents * 60000

    return { spouse, children, parents, disabled, total: spouse + children + parents + disabled }
  }

  // ThaiESGX switched from LTF, tax years 2569-2572: the part above 300,000 (of at most 500,000)
  // is spread over four years, so at most 50,000 a year
  const getThaiESGXFromLtfDeduction = (switchedAmount: string | number | undefined) => {
    const switched = Math.min(toNumber(switchedAmount), 500000)
    return Math.max(0, switched - 300000) / 4
  }

  // Main calculation function that works with actual form fields
  const calculateTaxFromForms = (
    incomeData: IncomeData,
    deductionsData: DeductionsData
  ): CalculationResult => {
    // Annualize salary and compute total income
    const monthlySalary = toNumber(incomeData.salary)
    const annualSalary = monthlySalary // available for adjust salary logic
    const bonus = toNumber(incomeData.bonus)
    const otherIncome = toNumber(incomeData.otherIncome)
    const totalIncome = annualSalary + bonus + otherIncome

    // Withholding tax from income data
    const withholdingTax = toNumber(incomeData.withholdingTax)

    // Standard expense deduction (50% of employment income capped at 100,000)
    const employmentIncome = totalIncome
    const employmentExpense = Math.min(employmentIncome * 0.5, 100000)

    // Personal and family: the user enters facts (who they support), the rules turn them into baht
    const personalDeduction = toNumber(deductionsData.personalDeduction) || 60000
    const family = getFamilyDeductions(deductionsData)
    const maternityExpense = Math.min(toNumber(deductionsData.maternityExpense), 60000)

    // Savings and investment
    const socialSecurity = Math.min(toNumber(deductionsData.socialSecurity), 10500)
    const providentFund = Math.min(toNumber(deductionsData.providentFund), 500000)
    const thaiESGXFromLtf = getThaiESGXFromLtfDeduction(deductionsData.ltfSwitchedAmount)

    // Other deductions (no specific limits, but should be reasonable)
    const otherDeduction = toNumber(deductionsData.otherDeduction)

    // Insurance: health max 25,000, life + health combined max 100,000
    const healthInsurance = Math.min(toNumber(deductionsData.healthInsurance), 25000)
    const lifeInsurance = Math.min(toNumber(deductionsData.lifeInsurance), 100000 - healthInsurance)
    const parentHealthInsurance = Math.min(toNumber(deductionsData.parentHealthInsurance), 15000)
    const spouseLifeInsurance = deductionsData.hasSpouseWithoutIncome
      ? Math.min(toNumber(deductionsData.spouseLifeInsurance), 10000)
      : 0

    // Home and government measures
    const homeLoanInterest = Math.min(toNumber(deductionsData.homeLoanInterest), 100000)
    const solarRooftop = Math.min(toNumber(deductionsData.solarRooftop), 200000)
    const artwork = Math.min(toNumber(deductionsData.artwork), 100000)
    const socialEnterprise = Math.min(toNumber(deductionsData.socialEnterprise), 100000)
    const partyDonation = Math.min(toNumber(deductionsData.partyDonation), 10000)

    // Calculate expenses and deductions separately
    const totalExpenses = employmentExpense
    const deductionsBeforeDonation = personalDeduction + family.total + maternityExpense
      + socialSecurity + providentFund + thaiESGXFromLtf + otherDeduction
      + lifeInsurance + healthInsurance + parentHealthInsurance + spouseLifeInsurance
      + homeLoanInterest + solarRooftop + artwork + socialEnterprise + partyDonation

    // Donations: the 2x kind comes off first, capped at 10% of income after expenses and deductions,
    // then general donations, capped at 10% of what is left
    const incomeBeforeDonation = Math.max(0, totalIncome - totalExpenses - deductionsBeforeDonation)
    const doubleDonation = Math.min(toNumber(deductionsData.doubleDonation) * 2, incomeBeforeDonation * 0.1)
    const donation = Math.min(toNumber(deductionsData.donation), (incomeBeforeDonation - doubleDonation) * 0.1)

    const totalDeductions = deductionsBeforeDonation + doubleDonation + donation
    const totalDeductionsAndExpenses = totalExpenses + totalDeductions

    const taxableIncome = Math.max(0, totalIncome - totalDeductionsAndExpenses)

    // Tax calculation by brackets
    const taxAmount = calculateTaxByBrackets(taxableIncome)

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
      retirementUsed: providentFund,
      providentFund,
      withholdingTax,
      netTaxPayable,
      // What each step 3 field actually takes off, after its cap; shown when the entry is above it
      deductedByField: {
        lifeInsurance,
        healthInsurance,
        parentHealthInsurance,
        spouseLifeInsurance,
        homeLoanInterest,
        solarRooftop,
        artwork,
        socialEnterprise,
        doubleDonation,
        donation,
        partyDonation,
      },
    }
  }

  // Max deductible amount for the step 2 "ใช้สิทธิ์สูงสุด" button (same caps as calculateTaxFromForms)
  const getDeductionMaxes = () => ({
    socialSecurity: 10500,
    providentFund: 500000
  })

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
    const maxTaxSavings = computeMaxTaxSavingsFromInvestments(calculationData)
    
    // Get investment limits
    const investmentLimits = getInvestmentLimits(calculationData.totalIncome)
    // Adjust RMF Max by subtracting existing provident fund contributions
    const adjustedRmfMax = Math.max(0, investmentLimits.rmfMax - (calculationData.providentFund || 0))
    
    // Calculate tax rates for before/after scenarios
    const beforeTaxRate = getMaxTaxRate(calculationData.taxableIncome)
    const afterTaxableIncome = Math.max(0, calculationData.taxableIncome - totalInvestment)
    const maxAfterTaxableIncome = Math.max(0, calculationData.taxableIncome - adjustedRmfMax - investmentLimits.thaiEsgMax)
    const afterTaxRate = getMaxTaxRate(afterTaxableIncome)
    const maxAfterTaxRate = getMaxTaxRate(maxAfterTaxableIncome)
    
    return {
      totalInvestment,
      taxSavings,
      beforeTaxAmount,
      afterTaxAmount,
      maxTaxSavings,
      investmentLimits: { rmfMax: adjustedRmfMax, thaiEsgMax: investmentLimits.thaiEsgMax },
      beforeTaxRate,
      afterTaxRate,
      maxAfterTaxRate,
      rmfMaxValue: adjustedRmfMax,
      thaiEsgMaxValue: investmentLimits.thaiEsgMax
    }
  }

  // Helper function to calculate tax breakdown by brackets
  const calculateTaxBreakdownByBrackets = (taxableIncome: number) => {
    const brackets = [
      { rate: 0, min: 0, max: 150000, label: 'ยกเว้นภาษี' },
      { rate: 5, min: 150001, max: 300000, label: 'อัตราภาษี 5%' },
      { rate: 10, min: 300001, max: 500000, label: 'อัตราภาษี 10%' },
      { rate: 15, min: 500001, max: 750000, label: 'อัตราภาษี 15%' },
      { rate: 20, min: 750001, max: 1000000, label: 'อัตราภาษี 20%' },
      { rate: 25, min: 1000001, max: 2000000, label: 'อัตราภาษี 25%' },
      { rate: 30, min: 2000001, max: 5000000, label: 'อัตราภาษี 30%' },
      { rate: 35, min: 5000001, max: Infinity, label: 'อัตราภาษี 35%' }
    ]

    const breakdown = []
    
    for (const bracket of brackets) {
      // Skip if taxable income is below this bracket
      if (taxableIncome < bracket.min) break
      
      // Calculate the lower bound of this bracket (0 for first bracket, otherwise previous bracket max + 1)
      const bracketStart = bracket.min === 0 ? 0 : bracket.min - 1
      
      // Calculate how much of the income falls into this bracket
      const incomeInBracket = Math.min(taxableIncome, bracket.max) - bracketStart
      
      // Calculate tax for this bracket
      const taxInThisBracket = incomeInBracket * (bracket.rate / 100)
      
      breakdown.push({
        rate: bracket.rate,
        label: bracket.label,
        range: bracket.max === Infinity 
          ? `${bracket.min.toLocaleString()} ขึ้นไป` 
          : `${bracket.min.toLocaleString()} - ${bracket.max.toLocaleString()}`,
        taxableAmount: incomeInBracket,
        taxAmount: taxInThisBracket
      })
    }
    
    return breakdown
  }

  // Tax summary calculations
  const calculateTaxSummary = (
    calculationData: CalculationResult,
    taxPlanning: any,
    rmfInvestment: number,
    thaiEsgInvestment: number
  ) => {
    const maxTaxRate = getMaxTaxRate(calculationData.taxableIncome)
    const taxBreakdown = calculateTaxBreakdownByBrackets(calculationData.taxableIncome)
    
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
      thaiEsgInvestment,
      taxBreakdown
    }
  }

  // Prototype (NEXT-6741 emoji): how much of the tax the user could cut by buying deductions they have
  // actually cut. Counts only deductions a person can buy more of (insurance, PVD/RMF, ThaiESG), not family
  // facts. Each person is measured against their own ceiling, so every bracket is judged the same way.
  // otherInvestment: RMF/ThaiESG already counted inside calculationData (the floating panel on the result page)
  const getDeductionUsage = (calculationData: CalculationResult, otherInvestment = 0) => {
    const totalIncome = calculationData.totalIncome || 0
    const byField = calculationData.deductedByField || {}
    const insurance = (byField.lifeInsurance || 0) + (byField.healthInsurance || 0)
    const providentFund = calculationData.providentFund || 0
    const usedDeductions = insurance + providentFund + otherInvestment

    const maxDeductions = 100000
      + Math.min(totalIncome * 0.3, 500000)
      + Math.min(totalIncome * 0.3, 300000)

    // Net income as if none of the buyable deductions were used
    const taxableWithoutThem = calculationData.taxableIncome + usedDeductions
    const taxWithoutThem = calculateTaxByBrackets(taxableWithoutThem)
    const savedTax = Math.max(0, taxWithoutThem - calculationData.taxAmount)
    const maxSavedTax = Math.max(0, taxWithoutThem - calculateTaxByBrackets(Math.max(0, taxableWithoutThem - maxDeductions)))

    const score = maxSavedTax <= 0 ? 1 : Math.min(1, savedTax / maxSavedTax)
    const level = score >= 0.8 ? 'high' : score >= 0.4 ? 'mid' : 'low'
    return { score, level, savedTax, maxSavedTax, remainingTax: Math.max(0, maxSavedTax - savedTax) }
  }

  return {
    calculateTaxFromForms,
    getDeductionUsage,
    getDeductionMaxes,
    getFamilyDeductions,
    getThaiESGXFromLtfDeduction,
    calculateTaxPlanning,
    calculateTaxPlanningResult,
    calculateTaxSummary,
  }
}
