import type { StoreItem } from '../../../domain/entities/StoreItem'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../theme/ThemeProvider'

interface StoreItemCardProps {
  item: StoreItem
}

export const StoreItemCard = ({ item }: StoreItemCardProps) => {
  const { spacing } = useTheme()
  const navigate = useNavigate()

  return (
    <article
      style={{
        display: 'grid',
        gridTemplateColumns: '120px minmax(0, 1.6fr) minmax(0, 1.2fr)',
        gap: spacing.md,
        borderRadius: 20,
        border: '1px solid rgba(31,41,55,0.95)',
        background:
          'radial-gradient(circle at top, rgba(15,23,42,0.98), rgba(15,23,42,1))',
        padding: spacing.md,
        boxShadow: '0 18px 45px rgba(15,23,42,0.95)',
        alignItems: 'stretch',
      }}
    >
      <div
        style={{
          borderRadius: 16,
          border: '1px solid rgba(55,65,81,0.9)',
          background:
            item.category === 'cards'
              ? 'radial-gradient(circle at 10% 0, #38bdf8, #0f172a 60%, #020617 100%)'
              : item.category === 'decks'
                ? 'radial-gradient(circle at 10% 0, #f97316, #7c2d12 60%, #020617 100%)'
                : 'radial-gradient(circle at 10% 0, #facc15, #4b5563 60%, #020617 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 22,
          fontWeight: 800,
          color: '#f9fafb',
          textTransform: 'uppercase',
        }}
      >
        {item.name.charAt(0)}
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: spacing.sm,
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: 16,
            }}
          >
            {item.name}
          </h3>
          <span
            style={{
              fontSize: 11,
              padding: '2px 10px',
              borderRadius: 999,
              border: '1px solid rgba(75,85,99,0.9)',
              textTransform: 'uppercase',
              letterSpacing: 0.12,
              color: 'rgba(148,163,184,0.95)',
            }}
          >
            {item.gameFormat}
          </span>
        </div>
        <p
          style={{
            margin: 0,
            fontSize: 13,
            color: 'var(--color-text-muted)',
          }}
        >
          Vendedor:{' '}
          <span
            style={{
              color: '#e5e7eb',
              fontWeight: 500,
            }}
          >
            {item.sellerName}
          </span>
        </p>
        <p
          style={{
            margin: 0,
            fontSize: 13,
            color: 'var(--color-text-muted)',
          }}
        >
          Estado:{' '}
          <span
            style={{
              color: '#e5e7eb',
              fontWeight: 500,
            }}
          >
            {item.condition}
          </span>
          {' · '}Expansión:{' '}
          <span
            style={{
              color: '#e5e7eb',
              fontWeight: 500,
            }}
          >
            {item.expansionCode}
          </span>
          {' · '}Rareza:{' '}
          <span
            style={{
              color: '#e5e7eb',
              fontWeight: 500,
            }}
          >
            {item.rarity}
          </span>
        </p>
        <p
          style={{
            margin: 0,
            fontSize: 12,
            color: 'rgba(148,163,184,0.9)',
          }}
        >
          Cantidad disponible: {item.quantity}x
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: spacing.sm,
          textAlign: 'right',
        }}
      >
        <div>
          <div
            style={{
              fontSize: 13,
              color: 'rgba(148,163,184,0.9)',
              marginBottom: 2,
            }}
          >
            Precio por unidad
          </div>
          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: '#facc15',
            }}
          >
            ${item.price.usd.toFixed(2)} USD
          </div>
          <div
            style={{
              fontSize: 12,
              color: 'rgba(148,163,184,0.95)',
            }}
          >
            ≈{item.price.cup.toFixed(1)} CUP
          </div>
        </div>
        <button
          type="button"
          onClick={() => navigate(`/store/${item.category}/${item.id}`)}
          style={{
            borderRadius: 999,
            border: '1px solid rgba(250,204,21,0.9)',
            padding: '8px 18px',
            background:
              'linear-gradient(135deg, #facc15, #eab308, #f97316)',
            color: '#020617',
            fontSize: 13,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: 0.08,
            boxShadow: '0 12px 32px rgba(251,191,36,0.65)',
          }}
        >
          Ver detalle
        </button>
      </div>
    </article>
  )
}

