import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { formatCurrency } from '../../utils/formatters'

const CATEGORY_META = {
  boende:    { label: 'Boende',        color: '#bca8f7' },
  mat:       { label: 'Mat & Hushåll', color: '#c79514' },
  transport: { label: 'Transport',     color: '#09a5eb' },
  noje:      { label: 'Nöje & Fritid', color: '#f28ac1' },
  ovrigt:    { label: 'Övrigt',        color: '#9fb4d1' },
}

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  const { name, value, payload: p } = payload[0]
  return (
    <div
      className="rounded-xl border border-white/10 px-4 py-3 text-sm"
      style={{ background: 'rgba(15,23,42,0.95)', backdropFilter: 'blur(12px)' }}
    >
      <div className="flex items-center gap-2 mb-1">
        <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
        <span className="font-sans text-white/70 text-xs">{name}</span>
      </div>
      <span className="font-mono text-white font-semibold text-xs">{formatCurrency(value)}</span>
    </div>
  )
}

export default function BudgetChart({ expenses, income }) {
  const data = Object.entries(expenses)
    .filter(([, v]) => v > 0)
    .map(([key, value]) => ({
      name: CATEGORY_META[key].label,
      value,
      color: CATEGORY_META[key].color,
    }))

  const totalExpenses = data.reduce((s, d) => s + d.value, 0)
  const surplus = income - totalExpenses
  if (surplus > 0) {
    data.push({ name: 'Sparande', value: surplus, color: '#2fed5c' })
  }

  return (
    <div
      className="rounded-2xl border border-white/10 p-5 flex flex-col gap-4"
      style={{ background: 'rgba(255,255,255,0.02)' }}
    >
      <h2 className="font-serif text-white text-lg">Fördelning</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={110}
            dataKey="value"
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} stroke="#0a1120" strokeWidth={1} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ paddingTop: '25px' }}
            formatter={(value) => (
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, fontFamily: 'Inter' }}>
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
