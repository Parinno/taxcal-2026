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

// ---- Decimals support (up to 2 decimal places) ----
export function parseNumberFromFormattedWithDecimals(str: string): number {
  const cleaned = String(str || '').replace(/,/g, '')
  const n = parseFloat(cleaned)
  return isNaN(n) ? 0 : n
}

export function formatNumberWithSeparatorsPreserveDecimals(value: string | number): string {
  if(!value) return ''
  const str = String(value ?? '')
  if (!str) return ''
  const negative = str.trim().startsWith('-')
  const cleaned = str.replace(/,/g, '').replace(/[^0-9.\-]/g, '')
  const parts = cleaned.replace('-', '').split('.')
  const intPart = parts[0] || '0'
  const decPart = (parts[1] || '').slice(0, 2)
  const intNum = parseInt(intPart || '0', 10)
  const formattedInt = new Intl.NumberFormat('th-TH', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(isNaN(intNum) ? 0 : intNum)
  const sign = negative && (intNum !== 0 || decPart !== '') ? '-' : ''
  return sign + formattedInt + (decPart !== '' ? `.${decPart}` : '')
}

export function sanitizeAndFormatNumberInputWithDecimals(value: string): string {
  const raw = String(value || '')
  // Keep only digits and dots, then reduce to a single dot
  const allowed = raw.replace(/[^0-9.\-]/g, '')
  const negative = allowed.trim().startsWith('-')
  const withoutSign = allowed.replace('-', '')
  const firstDotIndex = withoutSign.indexOf('.')
  let intPart = ''
  let decPart = ''
  if (firstDotIndex >= 0) {
    intPart = withoutSign.slice(0, firstDotIndex)
    // Remove any additional dots in the decimals
    decPart = withoutSign.slice(firstDotIndex + 1).replace(/\./g, '').slice(0, 2)
  } else {
    intPart = withoutSign
  }
  const formattedInt = new Intl.NumberFormat('th-TH', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(parseInt(intPart || '0', 10) || 0)
  const sign = negative && (intPart !== '' || decPart !== '') ? '-' : ''
  return sign + formattedInt + (firstDotIndex >= 0 ? `.${decPart}` : '')
}

