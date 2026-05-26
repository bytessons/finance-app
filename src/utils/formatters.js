const currencyFormatter = new Intl.NumberFormat('sv-SE', {
  style: 'currency',
  currency: 'SEK',
  maximumFractionDigits: 0,
})

const numberFormatter = new Intl.NumberFormat('sv-SE', {
  maximumFractionDigits: 0,
})

export function formatCurrency(value) {
  return currencyFormatter.format(value)
}

export function formatNumber(value) {
  return numberFormatter.format(value)
}

export function formatPercent(value) {
  return value.toLocaleString('sv-SE', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + '%'
}

export function formatCurrencyShort(value) {
  if (value >= 1_000_000) {
    return (value / 1_000_000).toLocaleString('sv-SE', { maximumFractionDigits: 1 }) + ' mnkr'
  }
  if (value >= 1_000) {
    return (value / 1_000).toLocaleString('sv-SE', { maximumFractionDigits: 0 }) + ' tkr'
  }
  return formatCurrency(value)
}
