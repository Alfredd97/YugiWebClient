import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../theme/ThemeProvider'

interface LayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  const { spacing } = useTheme()
  const navigate = useNavigate()

  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top, #111827 0, #020617 60%, #000 100%)',
      }}
    >
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 20,
          backdropFilter: 'blur(14px)',
          background:
            'linear-gradient(to bottom, rgba(15,23,42,0.95), rgba(15,23,42,0.85), transparent)',
          borderBottom: '1px solid rgba(30,64,175,0.35)',
        }}
      >
        <div
          style={{
            maxWidth: 1120,
            margin: '0 auto',
            padding: `${spacing.md}px ${spacing.lg}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: spacing.lg,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
            <button
              type="button"
              onClick={() => navigate('/')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing.sm,
                border: 'none',
                padding: 0,
                background: 'transparent',
                cursor: 'pointer',
                color: 'inherit',
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  border: '2px solid rgba(250,204,21,0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background:
                    'radial-gradient(circle at 30% 0, #facc15, #a855f7 45%, #0ea5e9 85%)',
                  boxShadow: '0 0 30px rgba(250,204,21,0.7)',
                }}
              >
                <span
                  style={{
                    fontSize: 18,
                    fontWeight: 900,
                    letterSpacing: 0.5,
                    color: '#020617',
                  }}
                >
                  YF
                </span>
              </div>
              <div style={{ textAlign: 'left' }}>
                <div
                  style={{
                    fontWeight: 700,
                    letterSpacing: 1,
                    fontSize: 14,
                    textTransform: 'uppercase',
                  }}
                >
                  Yugi Faction
                </div>
                <div
                  style={{
                    fontSize: 11,
                    opacity: 0.65,
                  }}
                >
                  Comunidad de Yu-Gi-Oh!
                </div>
              </div>
            </button>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: spacing.sm,
            }}
          >
            <button
              type="button"
              onClick={() => navigate('/')}
              style={{
                borderRadius: 999,
                border: '1px solid rgba(148,163,184,0.8)',
                padding: '8px 16px',
                background:
                  'radial-gradient(circle at top left, rgba(15,23,42,0.95), rgba(15,23,42,1))',
                color: '#e5e7eb',
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: 0.08,
                textTransform: 'uppercase',
              }}
            >
              Inicio
            </button>
            <button
              type="button"
              style={{
                borderRadius: 999,
                border: '1px solid rgba(250,204,21,0.7)',
                padding: '8px 18px',
                background:
                  'linear-gradient(135deg, #facc15, #eab308, #f97316)',
                color: '#0f172a',
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: 0.08,
                textTransform: 'uppercase',
                boxShadow: '0 10px 30px rgba(251, 191, 36, 0.55)',
              }}
            >
              Iniciar sesión
            </button>
          </div>
        </div>
      </header>

      <main
        style={{
          maxWidth: 1120,
          margin: '0 auto',
          padding: `${spacing.xxl}px ${spacing.lg}px ${spacing.sectionPaddingY}px`,
        }}
      >
        {children}
      </main>

      <footer
        style={{
          borderTop: '1px solid rgba(31,41,55,0.9)',
          marginTop: spacing.xxl,
          padding: `${spacing.lg}px ${spacing.lg}px ${spacing.xl}px`,
          background:
            'radial-gradient(circle at top, #020617, #020617 45%, #000 100%)',
        }}
      >
        <div
          style={{
            maxWidth: 1120,
            margin: '0 auto',
            fontSize: 12,
            opacity: 0.6,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: spacing.md,
          }}
        >
          <span>© {new Date().getFullYear()} YuGi Faction. Comunidad de duelistas.</span>
          <span>Proyecto no oficial inspirado en Yu-Gi-Oh!</span>
        </div>
      </footer>
    </div>
  )
}

