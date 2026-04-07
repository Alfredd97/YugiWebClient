import { useCart } from '../../../application/cart/CartContext'
import { useTheme } from '../../../theme/ThemeProvider'

interface AddToCartButtonProps {
  itemId: string
  name: string
  category: 'cards' | 'decks' | 'accessories'
  price: { usd: number; cup: number }
  availableStock: number
  size?: 'sm' | 'md'
  showText?: boolean
}

export const AddToCartButton = ({
  itemId,
  name,
  category,
  price,
  availableStock,
  size = 'md',
  showText = false,
}: AddToCartButtonProps) => {
  const { addItem } = useCart()
  const { colors, radii } = useTheme()

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation() // Prevent card click
    addItem(itemId, name, category, price, 1, availableStock)
  }

  const isDisabled = availableStock <= 0

  const buttonStyles = {
    sm: {
      padding: '8px 16px',
      fontSize: 12,
    },
    md: {
      padding: '14px 24px',
      fontSize: 13,
    },
  }

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      disabled={isDisabled}
      style={{
        borderRadius: radii.pill,
        border: 'none',
        padding: buttonStyles[size].padding,
        background: isDisabled
          ? 'rgba(51, 65, 85, 0.5)'
          : 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #fb923c 100%)',
        color: isDisabled ? 'rgba(148, 163, 184, 0.5)' : '#0a0e1a',
        fontWeight: 700,
        fontSize: buttonStyles[size].fontSize,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        boxShadow: isDisabled
          ? 'none'
          : '0 4px 20px rgba(251, 191, 36, 0.4)',
        transition: 'all var(--transition-base)',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
      }}
      onMouseEnter={(e) => {
        if (!isDisabled) {
          e.currentTarget.style.transform = 'translateY(-2px)'
          e.currentTarget.style.boxShadow = '0 8px 30px rgba(251, 191, 36, 0.5)'
        }
      }}
      onMouseLeave={(e) => {
        if (!isDisabled) {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = isDisabled
            ? 'none'
            : '0 4px 20px rgba(251, 191, 36, 0.4)'
        }
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
      {showText && (
        <span style={{ marginLeft: 4 }}>Agregar al carrito</span>
      )}
    </button>
  )
}
