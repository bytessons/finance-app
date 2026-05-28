import { useState } from 'react'
import { TrendingUp, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_ITEMS = [
  { label: 'Sparkalkylator', id: 'sparkalkylator' },
  { label: 'Budget', id: 'budget' },
]

export default function Header({ activeModule, onNavigate }) {
  const [open, setOpen] = useState(false)

  const navigate = (id) => {
    onNavigate(id)
    setOpen(false)
  }

  return (
    <header className="w-full border-b border-white/5 relative z-50">
      <div className="px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gold-500/20 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-gold-500" />
          </div>
          <span className="font-serif text-lg text-white tracking-wide">Sparkalkylatorn</span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-1">
          {NAV_ITEMS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => navigate(id)}
              className={`px-3 py-1.5 text-xs rounded-full font-sans font-medium transition-colors ${
                activeModule === id
                  ? 'text-gold-500 bg-gold-500/10'
                  : 'text-white/50 hover:text-white/80 hover:bg-white/5'
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Hamburger — mobile only */}
        <button
          className="sm:hidden w-9 h-9 flex items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label="Meny"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="sm:hidden absolute top-full left-0 right-0 border-b border-white/5 flex flex-col py-2"
            style={{ background: 'rgba(15,23,42,0.97)', backdropFilter: 'blur(12px)' }}
          >
            {NAV_ITEMS.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => navigate(id)}
                className={`w-full text-left px-5 py-3 text-sm font-sans font-medium transition-colors ${
                  activeModule === id ? 'text-gold-500' : 'text-white/50 hover:text-white/80'
                }`}
              >
                {label}
              </button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
