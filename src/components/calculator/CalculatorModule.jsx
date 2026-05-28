import { useState, useMemo } from 'react'
import InputPanel from './InputPanel'
import ResultsSummary from './ResultsSummary'
import ChartPanel from './ChartPanel'
import { calculateSavings } from '../../utils/calculations'

const DEFAULTS = {
  startCapital: 10000,
  monthlyAmount: 2000,
  annualReturn: 7,
  years: 20,
}

export default function CalculatorModule() {
  const [values, setValues] = useState(DEFAULTS)

  const result = useMemo(() => calculateSavings(values), [values])

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      {/* Mobile: single column. Desktop (lg+): 3-col grid — results | inputs | chart */}
      <div className="flex flex-col gap-5 lg:grid lg:grid-cols-[1fr_420px_1fr] lg:gap-6 lg:items-start">
        <div className="order-2 lg:order-1">
          <ResultsSummary result={result} years={values.years} />
        </div>
        <div className="order-1 lg:order-2">
          <InputPanel values={values} onChange={setValues} />
        </div>
        <div className="order-3">
          <ChartPanel chartData={result.chartData} />
        </div>
      </div>
    </div>
  )
}
