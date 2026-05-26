import SliderInput from './SliderInput'
import { formatCurrency, formatPercent } from '../../utils/formatters'

export default function InputPanel({ values, onChange }) {
  const handle = (key) => (val) => onChange({ ...values, [key]: val })

  return (
    <div className="rounded-2xl border border-white/10 bg-white/3 backdrop-blur-xl p-5 flex flex-col gap-6"
      style={{ background: 'rgba(255,255,255,0.03)' }}>
      <h2 className="font-serif text-white text-lg">Dina förutsättningar</h2>

      <SliderInput
        label="Startkapital"
        value={values.startCapital}
        min={0}
        max={500000}
        step={1000}
        onChange={handle('startCapital')}
        format={formatCurrency}
      />
      <SliderInput
        label="Månadsbelopp"
        value={values.monthlyAmount}
        min={0}
        max={20000}
        step={100}
        onChange={handle('monthlyAmount')}
        format={formatCurrency}
      />
      <SliderInput
        label="Årsavkastning"
        value={values.annualReturn}
        min={0}
        max={20}
        step={0.1}
        onChange={handle('annualReturn')}
        format={formatPercent}
      />
      <SliderInput
        label="Antal år"
        value={values.years}
        min={1}
        max={50}
        step={1}
        onChange={handle('years')}
        format={(v) => `${v} år`}
      />
    </div>
  )
}
