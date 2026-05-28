const BUDGET_KEY = 'finance-app:budget'

export const BUDGET_DEFAULT = {
  income: 35000,
  expenses: {
    boende: 8000,
    mat: 4000,
    transport: 2000,
    noje: 2000,
    ovrigt: 2000,
  },
  projectionYears: 20,
  projectionReturn: 7,
}

export function loadBudget() {
  try {
    const raw = localStorage.getItem(BUDGET_KEY)
    if (!raw) return BUDGET_DEFAULT
    const parsed = JSON.parse(raw)
    return {
      ...BUDGET_DEFAULT,
      ...parsed,
      expenses: { ...BUDGET_DEFAULT.expenses, ...parsed.expenses },
    }
  } catch {
    return BUDGET_DEFAULT
  }
}

export function saveBudget(data) {
  try {
    localStorage.setItem(BUDGET_KEY, JSON.stringify(data))
  } catch {}
}
