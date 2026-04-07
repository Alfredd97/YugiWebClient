import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../theme/ThemeProvider'
import { CartButton } from './cart/CartButton'
import { CartModal } from './cart/CartModal'
import { Toast } from './cart/Toast'
import { useCart } from '../../application/cart/CartContext'

const DEFAULT_PHONE_NUMBER = '5350000000' // TODO: Configure via environment variable

interface LayoutProps {
  children: ReactNode
  onCheckout?: () => void
}

export const Layout = ({ children, onCheckout }: LayoutProps) => {
  const { spacing, radii, colors } = useTheme()
  const navigate = useNavigate()
  const { toast, dismissToast } = useCart()

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0a0e1a 0%, #0d1120 50%, #050810 100%)',
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      {/* Ambient background glow */}
      <div
        style={{
          position: 'fixed',
          top: '-20%',
          right: '-10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'fixed',
          bottom: '-20%',
          left: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {toast && <Toast message={toast.message} type={toast.type} onClose={dismissToast} />}

      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          background: 'rgba(10, 14, 26, 0.7)',
          borderBottom: '1px solid rgba(51, 65, 85, 0.3)',
        }}
      >
        <div
          style={{
            maxWidth: 1120,
            margin: '0 auto',
            padding: `${spacing.lg}px ${spacing.xl}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: spacing.lg,
          }}
        >
          <button
            type="button"
            onClick={() => navigate('/')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: spacing.md,
              border: 'none',
              padding: 0,
              background: 'transparent',
              cursor: 'pointer',
              transition: 'transform var(--transition-base)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                border: `2px solid ${colors.primary}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #f59e0b 100%)',
                boxShadow: '0 0 30px rgba(251, 191, 36, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.1)',
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  letterSpacing: '0.5px',
                  color: '#0a0e1a',
                }}
              >
                YF
              </span>
            </div>
            <div style={{ textAlign: 'left' }}>
              <div
                style={{
                  fontWeight: 700,
                  letterSpacing: '1px',
                  fontSize: 14,
                  textTransform: 'uppercase',
                  background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Yugi Faction
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: colors.textMuted,
                  fontWeight: 500,
                }}
              >
                Comunidad de Yu-Gi-Oh!
              </div>
            </div>
          </button>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: spacing.sm,
            }}
          >
            <CartButton />
            <button
              type="button"
              onClick={() => navigate('/')}
              style={{
                borderRadius: radii.pill,
                border: `1px solid ${colors.borderStrong}`,
                padding: '10px 18px',
                background: 'rgba(15, 23, 42, 0.5)',
                backdropFilter: 'blur(8px)',
                color: colors.text,
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                transition: 'all var(--transition-base)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(30, 41, 59, 0.7)'
                e.currentTarget.style.borderColor = colors.primary
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(15, 23, 42, 0.5)'
                e.currentTarget.style.borderColor = colors.borderStrong
              }}
            >
              Inicio
            </button>
            <button
              type="button"
              style={{
                borderRadius: radii.pill,
                border: 'none',
                padding: '10px 22px',
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #fb923c 100%)',
                color: '#0a0e1a',
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                boxShadow: '0 4px 20px rgba(251, 191, 36, 0.4), 0 0 40px rgba(251, 191, 36, 0.2)',
                transition: 'all var(--transition-base)',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(251, 191, 36, 0.5), 0 0 60px rgba(251, 191, 36, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(251, 191, 36, 0.4), 0 0 40px rgba(251, 191, 36, 0.2)'
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
          padding: `${spacing.xxl}px ${spacing.xl}px ${spacing.sectionPaddingY}px`,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {children}
      </main>

      <footer
        style={{
          borderTop: `1px solid ${colors.borderSubtle}`,
          marginTop: spacing.xxl,
          padding: `${spacing.xl}px ${spacing.xl}px ${spacing.xxl}px`,
          background: 'linear-gradient(180deg, rgba(13, 17, 32, 0.8) 0%, rgba(5, 8, 16, 0.95) 100%)',
          backdropFilter: 'blur(10px)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            maxWidth: 1120,
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: spacing.md,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontSize: 13, color: colors.text, fontWeight: 600 }}>
              © {new Date().getFullYear()} YuGi Faction
            </span>
            <span style={{ fontSize: 12, color: colors.textMuted }}>
              Comunidad de duelistas
            </span>
          </div>
          <div style={{ fontSize: 12, color: colors.textSubtle }}>
            Proyecto no oficial inspirado en Yu-Gi-Oh!
          </div>
        </div>
      </footer>

      <CartModal
        phoneNumber={DEFAULT_PHONE_NUMBER}
        businessName="YuGi Faction"
        onCheckout={onCheckout}
      />
    </div>
  )
}

