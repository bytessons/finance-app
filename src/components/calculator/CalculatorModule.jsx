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
    <div className="w-full max-w-2xl mx-auto px-4 py-6 flex flex-col gap-5">
      <InputPanel values={values} onChange={setValues} />
      <ResultsSummary result={result} years={values.years} />
      <ChartPanel chartData={result.chartData} />
    </div>
  )
}
