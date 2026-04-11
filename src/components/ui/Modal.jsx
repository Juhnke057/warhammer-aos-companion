import { useEffect } from 'react'

export default function Modal({ open, onClose, title, children, accentColor = '#888' }) {
  useEffect(() => {
    if (!open) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative z-10 w-full max-w-2xl max-h-[90vh] rounded-xl overflow-hidden flex flex-col"
        style={{
          background: 'linear-gradient(180deg, #0E0E1A 0%, #080810 100%)',
          border: `1px solid ${accentColor}35`,
          borderTop: `3px solid ${accentColor}`,
          boxShadow: `0 24px 64px rgba(0,0,0,0.85), 0 0 40px ${accentColor}12`,
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-3 flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${accentColor}18 0%, ${accentColor}08 100%)`,
            borderBottom: `1px solid ${accentColor}25`,
          }}
        >
          <h2 className="text-base font-bold font-display tracking-wide" style={{ color: accentColor }}>
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white text-2xl leading-none w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto panel-scroll p-5">
          {children}
        </div>
      </div>
    </div>
  )
}
