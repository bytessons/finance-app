import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Wallet, TrendingUp, PiggyBank } from 'lucide-react'
import StatCard from '../shared/StatCard'
import { formatCurrency, formatPercent } from '../../utils/formatters'

function useCountUp(target, duration = 800) {
  const [current, setCurrent] = useState(target)
  const rafRef = useRef(null)
  const startRef = useRef(null)
  const fromRef = useRef(target)

  useEffect(() => {
    const from = fromRef.current
    const diff = target - from
    if (Math.abs(diff) < 100) {
      setCurrent(target)
      fromRef.current = target
      return
    }
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    startRef.current = null

    const animate = (ts) => {
      if (!startRef.current) startRef.current = ts
      const progress = Math.min((ts - startRef.current) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setCurrent(Math.round(from + diff * ease))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        fromRef.current = target
      }
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => rafRef.current && cancelAnimationFrame(rafRef.current)
  }, [target, duration])

  return current
}

export default function ResultsSummary({ result, years }) {
  const animatedFinal = useCountUp(result.finalCapital)
  const animatedDeposited = useCountUp(result.totalDeposited)
  const animatedInterest = useCountUp(result.totalInterest)

  return (
    <div className="flex flex-col gap-4">
      <motion.div
        key={result.finalCapital}
        initial={{ opacity: 0.6, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="rounded-2xl border border-gold-500/30 p-5 text-center"
        style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(245,158,11,0.03) 100%)' }}
      >
        <p className="text-xs font-sans uppercase tracking-widest text-white/40 mb-2">Slutvärde</p>
        <p className="font-mono text-3xl sm:text-4xl font-bold text-gold-400 tabular-nums">
          {formatCurrency(animatedFinal)}
        </p>
        <p className="text-xs font-sans text-white/30 mt-1.5">efter {years} år med ränta-på-ränta</p>
      </motion.div>

      <div className="grid grid-cols-3 gap-3">
        <StatCard
          label="Inbetalt"
          value={formatCurrency(animatedDeposited)}
          icon={Wallet}
        />
        <StatCard
          label="Avkastning"
          value={formatCurrency(animatedInterest)}
          highlight
          icon={TrendingUp}
        />
        <StatCard
          label="Avk. %"
          value={formatPercent(result.returnPercent)}
          icon={PiggyBank}
        />
      </div>
    </div>
  )
}
