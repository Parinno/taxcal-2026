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

export function formatNumberWithSeparators(num: number): string {
  if(!num) return ''
  return new Intl.NumberFormat('th-TH').format(num)
}

export function parseNumberFromFormatted(str: string): number {
  return parseInt(str.replace(/,/g, '')) || 0
}

// Sanitize arbitrary input and return a nicely formatted numeric string
export function sanitizeAndFormatNumberInput(value: string): string {
  const raw = String(value || '')
  const digitsOnly = raw.replace(/[^0-9]/g, '')
  return formatNumberWithSeparators(parseNumberFromFormatted(digitsOnly))
}

