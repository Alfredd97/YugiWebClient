import { useCart } from '../../../application/cart/CartContext'
import { useTheme } from '../../../theme/ThemeProvider'
import { CheckoutService } from '../../../application/messaging/CheckoutService'

interface CartModalProps {
  phoneNumber?: string
  businessName?: string
  onCheckout?: () => void
}

const DEFAULT_PHONE_NUMBER = import.meta.env.VITE_WHATSAPP_PHONE as string

export const CartModal = ({
  phoneNumber,
  businessName = 'Yu-Gi-Oh-CMG',
  onCheckout
}: CartModalProps) => {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalUSD, totalCUP, isCartExpired, checkout } = useCart()

  const checkoutService = new CheckoutService({
    phoneNumber: phoneNumber ?? DEFAULT_PHONE_NUMBER,
    businessName,
  })

  const handleCheckout = () => {
    // Open WhatsApp with cart details
    checkoutService.checkoutViaWhatsApp(items, totalUSD, totalCUP)

    // Execute custom callback if provided
    onCheckout?.()

    // Clear cart after successful checkout
    checkout()
  }
  const { colors, radii, shadows, spacing } = useTheme()

  if (!isOpen) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'stretch',
        cursor: 'pointer',
      }}
      onClick={closeCart}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 420,
          background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)',
          borderLeft: `1px solid ${colors.borderStrong}`,
          boxShadow: shadows.strong,
          display: 'flex',
          flexDirection: 'column',
          cursor: 'default',
          animation: 'slideInRight 0.3s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: spacing.lg,
            borderBottom: `1px solid ${colors.borderSubtle}`,
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: 18,
              fontWeight: 700,
              color: colors.text,
            }}
          >
            Tu Carrito
          </h2>
          <button
            type="button"
            onClick={closeCart}
            style={{
              background: 'transparent',
              border: 'none',
              color: colors.textMuted,
              cursor: 'pointer',
              padding: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all var(--transition-fast)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = colors.text)}
            onMouseLeave={(e) => (e.currentTarget.style.color = colors.textMuted)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Expired Warning */}
        {isCartExpired && (
          <div
            style={{
              margin: spacing.lg,
              padding: spacing.md,
              borderRadius: radii.md,
              background: 'rgba(251, 191, 36, 0.1)',
              border: `1px solid ${colors.primary}`,
              color: colors.primary,
              fontSize: 13,
            }}
          >
            Tu carrito expiró. Los productos se liberaron después de 15 minutos de inactividad.
          </div>
        )}

        {/* Cart Items */}
        <div
          style={{
            flex: 1,
            overflow: 'auto',
            padding: spacing.lg,
          }}
        >
          {items.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: spacing.xxl,
                color: colors.textMuted,
              }}
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                style={{ opacity: 0.5, marginBottom: spacing.md }}
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <p style={{ margin: 0, fontSize: 14 }}>Tu carrito está vacío</p>
              <p style={{ margin: 0, fontSize: 12, marginTop: 4, color: colors.textSubtle }}>
                Agrega productos para comenzar
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
              {items.map((item) => (
                <div
                  key={item.itemId}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '60px 1fr auto',
                    gap: spacing.md,
                    padding: spacing.md,
                    borderRadius: radii.lg,
                    background: 'rgba(2, 6, 23, 0.5)',
                    border: `1px solid ${colors.borderSubtle}`,
                  }}
                >
                  {/* Product Image Placeholder */}
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: radii.md,
                      background: item.category === 'cards'
                        ? 'linear-gradient(145deg, #38bdf8, #0ea5e9)'
                        : item.category === 'decks'
                          ? 'linear-gradient(145deg, #f97316, #ea580c)'
                          : 'linear-gradient(145deg, #fbbf24, #f59e0b)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 20,
                      fontWeight: 800,
                      color: '#f8fafc',
                      textTransform: 'uppercase',
                    }}
                  >
                    {item.name.charAt(0)}
                  </div>

                  {/* Product Info */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 4,
                    }}
                  >
                    <h3
                      style={{
                        margin: 0,
                        fontSize: 14,
                        fontWeight: 600,
                        color: colors.text,
                      }}
                    >
                      {item.name}
                    </h3>
                    <div
                      style={{
                        fontSize: 16,
                        fontWeight: 700,
                        color: colors.primary,
                      }}
                    >
                      ${item.price.usd.toFixed(2)}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: colors.textSubtle,
                      }}
                    >
                      Stock disponible: {item.maxAvailable}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      gap: spacing.xs,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.itemId, item.quantity - 1, item.maxAvailable)}
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: radii.sm,
                          border: `1px solid ${colors.borderStrong}`,
                          background: 'rgba(15, 23, 42, 0.5)',
                          color: colors.text,
                          fontSize: 16,
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all var(--transition-fast)',
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
                        −
                      </button>
                      <span
                        style={{
                          minWidth: 32,
                          textAlign: 'center',
                          fontSize: 14,
                          fontWeight: 600,
                          color: colors.text,
                        }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.itemId, item.quantity + 1, item.maxAvailable)}
                        disabled={item.quantity >= item.maxAvailable}
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: radii.sm,
                          border: `1px solid ${colors.borderStrong}`,
                          background: item.quantity >= item.maxAvailable
                            ? 'rgba(15, 23, 42, 0.3)'
                            : 'rgba(15, 23, 42, 0.5)',
                          color: item.quantity >= item.maxAvailable ? colors.textSubtle : colors.text,
                          fontSize: 16,
                          fontWeight: 700,
                          cursor: item.quantity >= item.maxAvailable ? 'not-allowed' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all var(--transition-fast)',
                        }}
                        onMouseEnter={(e) => {
                          if (item.quantity < item.maxAvailable) {
                            e.currentTarget.style.borderColor = colors.primary
                            e.currentTarget.style.background = 'rgba(30, 41, 59, 0.7)'
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = colors.borderStrong
                          e.currentTarget.style.background = item.quantity >= item.maxAvailable
                            ? 'rgba(15, 23, 42, 0.3)'
                            : 'rgba(15, 23, 42, 0.5)'
                        }}
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.itemId)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: colors.accentRed,
                        fontSize: 11,
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        transition: 'opacity var(--transition-fast)',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Total and Checkout */}
        {items.length > 0 && (
          <div
            style={{
              padding: spacing.lg,
              borderTop: `1px solid ${colors.borderStrong}`,
              background: 'rgba(2, 6, 23, 0.5)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: spacing.md,
              }}
            >
              <span style={{ fontSize: 14, color: colors.textMuted }}>Total:</span>
              <div style={{ textAlign: 'right' }}>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    lineHeight: 1,
                  }}
                >
                  ${totalUSD.toFixed(2)} USD
                </div>
                <div style={{ fontSize: 12, color: colors.textSubtle }}>
                  ≈{totalCUP.toFixed(1)} CUP
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              style={{
                width: '100%',
                borderRadius: radii.pill,
                border: 'none',
                padding: '14px 24px',
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #fb923c 100%)',
                color: '#0a0e1a',
                fontSize: 14,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                boxShadow: '0 4px 20px rgba(251, 191, 36, 0.4)',
                transition: 'all var(--transition-base)',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(251, 191, 36, 0.6)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(251, 191, 36, 0.4)'
              }}
            >
              Contactar vendedor por WhatsApp
            </button>

            <p
              style={{
                margin: 0,
                marginTop: spacing.sm,
                fontSize: 11,
                color: colors.textSubtle,
                textAlign: 'center',
              }}
            >
              Al continuar, se abrirá WhatsApp para coordinar la compra
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
