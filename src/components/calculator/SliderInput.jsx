import { useState, useCallback } from 'react'

export default function SliderInput({ label, value, min, max, step, onChange, format }) {
  const [inputValue, setInputValue] = useState('')
  const [editing, setEditing] = useState(false)

  const percent = ((value - min) / (max - min)) * 100

  const handleSlider = useCallback((e) => {
    onChange(Number(e.target.value))
  }, [onChange])

  const handleInputFocus = () => {
    setEditing(true)
    setInputValue(String(value))
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleInputBlur = () => {
    setEditing(false)
    const num = parseFloat(inputValue.replace(',', '.'))
    if (!isNaN(num)) {
      onChange(Math.min(max, Math.max(min, num)))
    }
  }

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') e.target.blur()
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-sans text-white/60">{label}</label>
        <input
          type="text"
          inputMode="decimal"
          value={editing ? inputValue : format(value)}
          onFocus={handleInputFocus}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          className="w-36 text-right font-mono text-sm font-semibold text-gold-400 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 focus:outline-none focus:border-gold-500/50 focus:bg-white/8 transition-colors min-h-[44px]"
        />
      </div>
      <div className="relative">
        <div className="relative h-1.5 rounded-full bg-white/10">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-gold-600 to-gold-400"
            style={{ width: `${percent}%` }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleSlider}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
          style={{ height: '100%', minHeight: '44px', top: '50%', transform: 'translateY(-50%)', touchAction: 'none' }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gold-400 border-2 border-slate-900 shadow-lg pointer-events-none"
          style={{ left: `calc(${percent}% - 8px)` }}
        />
      </div>
      <div className="flex justify-between text-xs font-mono text-white/25">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  )
}
