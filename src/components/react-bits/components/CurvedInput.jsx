import React, { useState } from 'react'

export function CurvedInput({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  required = false,
  placeholder = '',
  isTextArea = false,
  rows = 5,
  className = '',
}) {
  const [isFocused, setIsFocused] = useState(false)
  const hasValue = value && value.length > 0

  const Component = isTextArea ? 'textarea' : 'input'

  return (
    <div className={`relative w-full ${className}`}>
      <div
        className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${
          isFocused
            ? 'border-accent-500/80 bg-base-900/90 shadow-lg shadow-accent-500/10 ring-1 ring-accent-500/30'
            : 'border-base-800/80 bg-base-900/50 hover:border-base-700/80'
        }`}
      >
        <Component
          id={id}
          name={name}
          type={!isTextArea ? type : undefined}
          rows={isTextArea ? rows : undefined}
          value={value}
          onChange={onChange}
          required={required}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`w-full bg-transparent px-4 pb-3 pt-6 text-sm text-base-100 placeholder:text-base-600 focus:outline-none ${
            isTextArea ? 'resize-none' : ''
          }`}
        />

        {/* Floating Curved Label */}
        {label && (
          <label
            htmlFor={id}
            className={`pointer-events-none absolute left-4 font-mono text-xs transition-all duration-200 ${
              isFocused || hasValue
                ? 'top-2 text-[10px] uppercase tracking-wider text-accent-400'
                : 'top-4 text-base-500'
            }`}
          >
            {label}
            {required && <span className="ml-1 text-accent-500">*</span>}
          </label>
        )}

        {/* Bottom subtle glow line */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 transition-opacity duration-300 ${
            isFocused ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>
    </div>
  )
}
