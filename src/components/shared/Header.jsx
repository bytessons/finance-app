import { TrendingUp } from 'lucide-react'

export default function Header() {
  return (
    <header className="w-full px-4 py-4 flex items-center justify-between border-b border-white/5">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-gold-500/20 flex items-center justify-center">
          <TrendingUp className="w-4 h-4 text-gold-500" />
        </div>
        <span className="font-serif text-lg text-white tracking-wide">Sparkalkylatorn</span>
      </div>
      <nav className="flex items-center gap-1">
        <button className="px-3 py-1.5 text-xs text-gold-500 bg-gold-500/10 rounded-full font-sans font-medium">
          Sparkalkylator
        </button>
        <button className="px-3 py-1.5 text-xs text-white/30 rounded-full font-sans font-medium cursor-not-allowed" disabled>
          Fonder
        </button>
        <button className="px-3 py-1.5 text-xs text-white/30 rounded-full font-sans font-medium cursor-not-allowed" disabled>
          Budget
        </button>
      </nav>
    </header>
  )
}
