import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import logoYugi from '../../assets/LogoYugi.png'
import { useTheme } from '../../theme/ThemeProvider'
import { CartButton } from './cart/CartButton'
import { CartModal } from './cart/CartModal'
import { Toast } from './cart/Toast'
import { useCart } from '../../application/cart/CartContext'

const DEFAULT_PHONE_NUMBER = import.meta.env.VITE_WHATSAPP_PHONE as string

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
            padding: `${spacing.md}px ${spacing.lg}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: spacing.md,
          }}
        >
          {/* Logo - Hidden on mobile, shows only icon */}
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
            <img
              src={logoYugi}
              alt="Yu-Gi-Oh-CMG"
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                border: `2px solid ${colors.primary}`,
                boxShadow: '0 0 30px rgba(252, 245, 226, 0.5)',
                objectFit: 'cover',
                flexShrink: 0,
              }}
            />
            {/* Brand text - hidden on mobile */}
            <div style={{ textAlign: 'left', display: 'none' }} className="desktop-only">
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
                Yu-Gi-Oh-CMG
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
                padding: '8px 14px',
                background: 'rgba(15, 23, 42, 0.5)',
                backdropFilter: 'blur(8px)',
                color: colors.text,
                fontWeight: 600,
                fontSize: 12,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                transition: 'all var(--transition-base)',
                display: 'none',
              }}
              className="desktop-only"
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
          </div>
        </div>
      </header>

      <main
        style={{
          maxWidth: 1120,
          margin: '0 auto',
          padding: `${spacing.xl}px ${spacing.lg}px ${spacing.sectionPaddingY}px`,
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
              © {new Date().getFullYear()} Yu-Gi-Oh-CMG
            </span>
          </div>
          <div style={{ fontSize: 12, color: colors.textSubtle }}>
            Proyecto no oficial inspirado en Yu-Gi-Oh!
          </div>
        </div>
      </footer>

      <CartModal
        phoneNumber={DEFAULT_PHONE_NUMBER}
        businessName="Yu-Gi-Oh-CMG"
        onCheckout={onCheckout}
      />
    </div>
  )
}

