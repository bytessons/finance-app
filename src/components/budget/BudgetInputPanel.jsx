import SliderInput from '../calculator/SliderInput'
import { formatCurrency } from '../../utils/formatters'

const EXPENSE_CATEGORIES = [
  { key: 'boende',    label: 'Boende',        min: 0, max: 25000, step: 500 },
  { key: 'mat',       label: 'Mat & Hushåll', min: 0, max: 10000, step: 100 },
  { key: 'transport', label: 'Transport',      min: 0, max: 8000,  step: 100 },
  { key: 'noje',      label: 'Nöje & Fritid', min: 0, max: 10000, step: 100 },
  { key: 'ovrigt',    label: 'Övrigt',         min: 0, max: 10000, step: 100 },
]

export default function BudgetInputPanel({ income, expenses, onChange }) {
  const handleIncome = (val) => onChange({ income: val })
  const handleExpense = (key) => (val) =>
    onChange({ expenses: { ...expenses, [key]: val } })

  return (
    <div
      className="rounded-2xl border border-white/10 p-5 flex flex-col gap-6"
      style={{ background: 'rgba(255,255,255,0.03)' }}
    >
      <h2 className="font-serif text-white text-lg">Din budget</h2>

      <div className="pb-4 border-b border-white/8">
        <SliderInput
          label="Månadsinkomst (netto)"
          value={income}
          min={0}
          max={150000}
          step={500}
          onChange={handleIncome}
          format={formatCurrency}
        />
      </div>

      <div className="flex flex-col gap-6">
        <p className="text-xs font-sans text-white/40 uppercase tracking-wider -mb-2">Utgifter</p>
        {EXPENSE_CATEGORIES.map(({ key, label, min, max, step }) => (
          <SliderInput
            key={key}
            label={label}
            value={expenses[key]}
            min={min}
            max={max}
            step={step}
            onChange={handleExpense(key)}
            format={formatCurrency}
          />
        ))}
      </div>
    </div>
  )
}
