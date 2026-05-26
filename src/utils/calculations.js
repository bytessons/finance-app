export function calculateSavings({ startCapital, monthlyAmount, annualReturn, years }) {
  const monthlyRate = annualReturn / 12 / 100
  const months = years * 12
  const data = []

  let capital = startCapital
  let totalDeposited = startCapital

  data.push({
    month: 0,
    year: 0,
    capital: Math.round(capital),
    deposited: Math.round(totalDeposited),
    interest: 0,
  })

  for (let m = 1; m <= months; m++) {
    capital = capital * (1 + monthlyRate) + monthlyAmount
    totalDeposited += monthlyAmount

    if (m % 12 === 0 || m === months) {
      const interest = capital - totalDeposited
      data.push({
        month: m,
        year: m / 12,
        capital: Math.round(capital),
        deposited: Math.round(totalDeposited),
        interest: Math.round(Math.max(0, interest)),
      })
    }
  }

  const finalCapital = Math.round(capital)
  const finalDeposited = Math.round(totalDeposited)
  const finalInterest = Math.round(Math.max(0, capital - totalDeposited))
  const returnPercent = finalDeposited > 0
    ? ((finalInterest / finalDeposited) * 100)
    : 0

  return {
    finalCapital,
    totalDeposited: finalDeposited,
    totalInterest: finalInterest,
    returnPercent,
    chartData: data,
  }
}
