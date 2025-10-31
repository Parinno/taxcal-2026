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

  // Main calculation function that works with actual form fields
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
    const providentFund = Math.min(toNumber(deductionsData.providentFund), 500000)
    
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
      retirementUsed: providentFund + thaiESGX + thaiESGXTransferred,
      providentFund,
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

  return {
    calculateTaxFromForms,
    calculateTaxPlanning,
    calculateTaxPlanningResult,
    calculateTaxSummary,
  }
}
