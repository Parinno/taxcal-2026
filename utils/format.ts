export function formatCurrencyTHB(amount: number): string {
  return new Intl.NumberFormat('th-TH', {
    style: 'decimal',
    minimumFractionDigits: 0,
  }).format(amount || 0)
}

export function formatCurrencyTHBWithDecimals(amount: number): string {
  return new Intl.NumberFormat('th-TH', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount || 0)
}

