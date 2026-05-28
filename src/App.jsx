import { useState } from 'react'
import Header from './components/shared/Header'
import CalculatorModule from './components/calculator/CalculatorModule'
import BudgetModule from './components/budget/BudgetModule'

export default function App() {
  const [activeModule, setActiveModule] = useState('sparkalkylator')

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(160deg, #0f1a2e 0%, #0a1120 50%, #080e18 100%)' }}>
      <Header activeModule={activeModule} onNavigate={setActiveModule} />
      <main className="flex-1 flex flex-col items-center pb-12">
        {activeModule === 'sparkalkylator' ? <CalculatorModule /> : <BudgetModule />}
      </main>
      <footer className="text-center pb-6 text-xs font-sans text-white/20">
        Beräkningar är illustrativa, ej finansiell rådgivning
      </footer>
    </div>
  )
}
