import { useState, useMemo, useEffect } from 'react'
import BudgetInputPanel from './BudgetInputPanel'
import BudgetSummary from './BudgetSummary'
import BudgetChart from './BudgetChart'
import { loadBudget, saveBudget } from '../../utils/storage'

export default function BudgetModule() {
  const [data, setData] = useState(loadBudget)

  useEffect(() => {
    saveBudget(data)
  }, [data])

  const update = (patch) => {
    setData((prev) => ({ ...prev, ...patch }))
  }

  const totalExpenses = useMemo(
    () => Object.values(data.expenses).reduce((s, v) => s + v, 0),
    [data.expenses]
  )
  const surplus = data.income - totalExpenses

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col gap-5 lg:grid lg:grid-cols-[1fr_420px_1fr] lg:gap-6 lg:items-start">
        <div className="order-2 lg:order-1">
          <BudgetSummary
            income={data.income}
            totalExpenses={totalExpenses}
            surplus={surplus}
            projectionYears={data.projectionYears}
            projectionReturn={data.projectionReturn}
            onChange={update}
          />
        </div>
        <div className="order-1 lg:order-2">
          <BudgetInputPanel
            income={data.income}
            expenses={data.expenses}
            onChange={update}
          />
        </div>
        <div className="order-3">
          <BudgetChart expenses={data.expenses} income={data.income} />
        </div>
      </div>
    </div>
  )
}
