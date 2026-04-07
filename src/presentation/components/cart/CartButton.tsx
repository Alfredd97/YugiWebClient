import { useCart } from '../../../application/cart/CartContext'
import { useTheme } from '../../../theme/ThemeProvider'

export const CartButton = () => {
  const { totalItems, openCart } = useCart()
  const { colors, radii } = useTheme()

  return (
    <button
      type="button"
      onClick={openCart}
      style={{
        position: 'relative',
        borderRadius: radii.pill,
        border: `1px solid ${colors.borderStrong}`,
        background: 'rgba(15, 23, 42, 0.5)',
        backdropFilter: 'blur(8px)',
        padding: '10px 16px',
        color: colors.text,
        fontWeight: 600,
        fontSize: 13,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        transition: 'all var(--transition-base)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = colors.primary
        e.currentTarget.style.background = 'rgba(30, 41, 59, 0.7)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = colors.borderStrong
        e.currentTarget.style.background = 'rgba(15, 23, 42, 0.5)'
      }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>

      {totalItems > 0 && (
        <span
          style={{
            position: 'absolute',
            top: -6,
            right: -6,
            minWidth: 20,
            height: 20,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
            color: '#0a0e1a',
            fontSize: 11,
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 12px rgba(251, 191, 36, 0.6)',
          }}
        >
          {totalItems}
        </span>
      )}

      Carrito
    </button>
  )
}
