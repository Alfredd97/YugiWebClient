import { useState } from 'react'
import { useCart } from '../../../application/cart/CartContext'
import { useTheme } from '../../../theme/ThemeProvider'

interface AddToCartButtonProps {
  itemId: string
  name: string
  category: 'cards' | 'decks' | 'accessories'
  price: { usd: number; cup: number }
  availableStock: number
  size?: 'sm' | 'md'
}

export const AddToCartButton = ({
  itemId,
  name,
  category,
  price,
  availableStock,
  size = 'md',
}: AddToCartButtonProps) => {
  const { addItem } = useCart()
  const { colors, radii } = useTheme()
  const [message, setMessage] = useState<string | null>(null)
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null)

  const handleAddToCart = () => {
    const result = addItem(itemId, name, category, price, 1, availableStock)

    setMessage(result.message)
    setMessageType(result.success ? 'success' : 'error')

    if (result.success) {
      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 800)
    } else {
      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 3000)
    }
  }

  const isDisabled = availableStock <= 0

  const buttonStyles = { 
    sm: {
      padding: '8px 16px',
      fontSize: 12,
    },
    md: {
      padding: '12px 24px',
      fontSize: 13,
    },
  }

  return (
    <div style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation() // Prevent card click
          handleAddToCart()
          }
        }
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
          letterSpacing: '0.05em',
          boxShadow: isDisabled
            ? 'none'
            : '0 4px 16px rgba(251, 191, 36, 0.4)',
          transition: 'all var(--transition-base)',
          cursor: isDisabled ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
        onMouseEnter={(e) => {
          if (!isDisabled) {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(251, 191, 36, 0.6)'
          }
        }}
        onMouseLeave={(e) => {
          if (!isDisabled) {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = isDisabled
              ? 'none'
              : '0 4px 16px rgba(251, 191, 36, 0.4)'
          }
        }}
      >
        <svg
          width="16"
          height="16"
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
      </button>

      {message && (
        <div
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: 8,
            padding: '8px 12px',
            borderRadius: radii.md,
            background: messageType === 'success'
              ? 'rgba(74, 222, 128, 0.15)'
              : 'rgba(248, 113, 113, 0.15)',
            border: `1px solid ${messageType === 'success' ? colors.accentGreen : colors.accentRed}`,
            color: messageType === 'success' ? colors.accentGreen : colors.accentRed,
            fontSize: 12,
            fontWeight: 500,
            whiteSpace: 'nowrap',
            animation: 'fadeInUp 0.2s ease-out',
            zIndex: 10,
          }}
        >
          {message}
        </div>
      )}
    </div>
  )
}
