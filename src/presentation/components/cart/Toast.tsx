import { useTheme } from '../../../theme/ThemeProvider'

interface ToastProps {
  message: string
  type: 'success' | 'error'
  onClose: () => void
}

export const Toast = ({ message, type, onClose }: ToastProps) => {
  const { colors, radii } = useTheme()
  const isSuccess = type === 'success'

  return (
    <div
      style={{
        position: 'fixed',
        top: 100,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        animation: 'slideInDown 0.3s ease-out',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '14px 24px',
          borderRadius: radii.lg,
          background: isSuccess
            ? 'rgba(22, 163, 74, 0.15)'
            : 'rgba(220, 38, 38, 0.15)',
          border: `1px solid ${isSuccess ? colors.accentGreen : colors.accentRed}`,
          boxShadow: isSuccess
            ? '0 8px 30px rgba(22, 163, 74, 0.3)'
            : '0 8px 30px rgba(220, 38, 38, 0.3)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: '50%',
            background: isSuccess ? colors.accentGreen : colors.accentRed,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {isSuccess ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0a0e1a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          )}
        </div>
        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: isSuccess ? colors.accentGreen : colors.accentRed,
            whiteSpace: 'nowrap',
          }}
        >
          {message}
        </span>
        <button
          type="button"
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isSuccess ? colors.accentGreen : colors.accentRed,
            opacity: 0.7,
            transition: 'opacity var(--transition-fast)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.7')}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  )
}
