import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { calculateSavings } from '../../utils/calculations'
import { formatCurrency, formatPercent } from '../../utils/formatters'
import StatCard from '../shared/StatCard'
import { Wallet, Percent, TrendingUp } from 'lucide-react'

const YEAR_OPTIONS = [10, 20, 30]

export default function BudgetSummary({ income, totalExpenses, surplus, projectionYears, projectionReturn, onChange }) {
  const projection = useMemo(() => {
    if (surplus <= 0) return null
    return calculateSavings({
      startCapital: 0,
      monthlyAmount: surplus,
      annualReturn: projectionReturn,
      years: projectionYears,
    })
  }, [surplus, projectionYears, projectionReturn])

  const savingsRate = income > 0 ? (surplus / income) * 100 : 0
  const isPositive = surplus >= 0

  return (
    <div className="flex flex-col gap-4">
      {/* Surplus card */}
      <motion.div
        key={surplus}
        initial={{ opacity: 0.7, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="rounded-2xl border p-5 text-center"
        style={{
          background: isPositive
            ? 'linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(16,185,129,0.03) 100%)'
            : 'linear-gradient(135deg, rgba(244,63,94,0.10) 0%, rgba(244,63,94,0.03) 100%)',
          borderColor: isPositive ? 'rgba(16,185,129,0.3)' : 'rgba(244,63,94,0.3)',
        }}
      >
        <p className="text-xs font-sans uppercase tracking-widest text-white/40 mb-2">
          {isPositive ? 'Kvar att spara' : 'Underskott'}
        </p>
        <p
          className="font-mono text-3xl sm:text-4xl font-bold tabular-nums"
          style={{ color: isPositive ? '#10b981' : '#f43f5e' }}
        >
          {formatCurrency(Math.abs(surplus))}
        </p>
        <p className="text-xs font-sans text-white/30 mt-1.5">per månad</p>
      </motion.div>

      {/* Stat cards */}
      <div className="flex flex-col gap-3">
        <StatCard label="Totala utgifter" value={formatCurrency(totalExpenses)} icon={Wallet} />
        <StatCard label="Sparandel" value={formatPercent(Math.max(0, savingsRate))} icon={Percent} />
      </div>

      {/* Savings projection */}
      {surplus > 0 && projection && (
        <div
          className="rounded-2xl border border-white/10 p-5 flex flex-col gap-4"
          style={{ background: 'rgba(255,255,255,0.02)' }}
        >
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-gold-500" />
            <h3 className="font-serif text-white text-base">Sparprognos</h3>
          </div>

          <p className="text-xs font-sans text-white/40 leading-relaxed">
            Om du investerar överskottet varje månad med {projectionReturn}% årsavkastning:
          </p>

          {/* Year selector */}
          <div className="flex gap-2">
            {YEAR_OPTIONS.map((y) => (
              <button
                key={y}
                onClick={() => onChange({ projectionYears: y })}
                className={`flex-1 py-2 rounded-xl text-xs font-sans font-medium transition-colors ${
                  projectionYears === y
                    ? 'bg-gold-500/20 text-gold-400 border border-gold-500/30'
                    : 'bg-white/5 text-white/40 border border-white/5 hover:text-white/60'
                }`}
              >
                {y} år
              </button>
            ))}
          </div>

          {/* Projected value */}
          <div className="text-center py-2">
            <p className="font-mono text-2xl font-bold text-gold-400 tabular-nums">
              {formatCurrency(projection.finalCapital)}
            </p>
            <p className="text-xs font-sans text-white/30 mt-1">
              varav {formatCurrency(projection.totalInterest)} i ränta-på-ränta
            </p>
          </div>

          {/* Return slider */}
          <div className="flex items-center gap-3 pt-1 border-t border-white/5">
            <span className="text-xs font-sans text-white/40 whitespace-nowrap">Avkastning</span>
            <input
              type="range"
              min={1}
              max={20}
              step={1}
              value={projectionReturn}
              onChange={(e) => onChange({ projectionReturn: Number(e.target.value) })}
              className="flex-1 accent-amber-500"
              style={{ touchAction: 'none' }}
            />
            <span className="font-mono text-xs text-gold-400 w-10 text-right">
              {projectionReturn}%
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
