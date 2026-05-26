import { motion } from 'framer-motion'

export default function StatCard({ label, value, highlight = false, icon: Icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl p-4 flex flex-col gap-1.5 ${
        highlight
          ? 'bg-gold-500/10 border border-gold-500/20'
          : 'bg-white/5 border border-white/5'
      }`}
    >
      <div className="flex items-center gap-1.5">
        {Icon && <Icon className={`w-3.5 h-3.5 ${highlight ? 'text-gold-500' : 'text-white/40'}`} />}
        <span className="text-xs font-sans text-white/50 uppercase tracking-wider">{label}</span>
      </div>
      <span className={`font-mono text-base font-semibold tabular-nums ${highlight ? 'text-gold-400' : 'text-white/90'}`}>
        {value}
      </span>
    </motion.div>
  )
}
