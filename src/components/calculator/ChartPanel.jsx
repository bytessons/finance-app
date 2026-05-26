import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { formatCurrency } from '../../utils/formatters'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-white/10 px-4 py-3 text-sm"
      style={{ background: 'rgba(15,23,42,0.95)', backdropFilter: 'blur(12px)' }}>
      <p className="font-sans text-white/50 text-xs mb-2">År {label}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
          <span className="font-sans text-white/70 text-xs">{entry.name}:</span>
          <span className="font-mono text-white font-semibold text-xs">{formatCurrency(entry.value)}</span>
        </div>
      ))}
    </div>
  )
}

const tickFormatter = (value) => {
  if (value >= 1_000_000) return (value / 1_000_000).toFixed(1) + 'M'
  if (value >= 1_000) return (value / 1_000).toFixed(0) + 'k'
  return String(value)
}

export default function ChartPanel({ chartData }) {
  return (
    <div className="rounded-2xl border border-white/10 p-5 flex flex-col gap-4"
      style={{ background: 'rgba(255,255,255,0.02)' }}>
      <h2 className="font-serif text-white text-lg">Kapitalutveckling</h2>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={chartData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="gradDeposited" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="gradInterest" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis
            dataKey="year"
            tickFormatter={(v) => `${v}år`}
            tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'JetBrains Mono' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={tickFormatter}
            tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'JetBrains Mono' }}
            axisLine={false}
            tickLine={false}
            width={48}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value) => (
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, fontFamily: 'Inter' }}>{value}</span>
            )}
          />
          <Area
            type="monotone"
            dataKey="deposited"
            stackId="1"
            stroke="#6366f1"
            strokeWidth={1.5}
            fill="url(#gradDeposited)"
            name="Inbetalt kapital"
          />
          <Area
            type="monotone"
            dataKey="interest"
            stackId="1"
            stroke="#F59E0B"
            strokeWidth={2}
            fill="url(#gradInterest)"
            name="Ränta-på-ränta"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
