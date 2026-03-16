import { Navigate, useNavigate, useParams } from 'react-router-dom'
import type { StoreItemCategory } from '../../domain/entities/StoreItem'
import { StoreCatalogService } from '../../application/store/StoreCatalogService'
import { Layout } from '../components/Layout'
import { useTheme } from '../../theme/ThemeProvider'

const catalog = new StoreCatalogService()

const isValidCategory = (value: string | undefined): value is StoreItemCategory => {
  return value === 'cards' || value === 'decks' || value === 'accessories'
}

export const StoreItemDetailsPage = () => {
  const params = useParams()
  const navigate = useNavigate()
  const { spacing, typography } = useTheme()

  const rawCategory = params.category
  const id = params.id

  if (!isValidCategory(rawCategory) || !id) {
    return <Navigate to="/store/cards" replace />
  }

  const items = catalog.getItemsByCategory(rawCategory)
  const item = items.find((entry) => entry.id === id)

  if (!item) {
    return <Navigate to={`/store/${rawCategory}`} replace />
  }

  return (
    <Layout>
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1.6fr)',
          gap: spacing.xxl,
          marginBottom: spacing.sectionPaddingY,
          alignItems: 'flex-start',
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: spacing.sm,
              marginBottom: spacing.sm,
            }}
          >
            <p
              style={{
                fontSize: 13,
                textTransform: 'uppercase',
                letterSpacing: 4,
                color: 'var(--color-primary-soft)',
                margin: 0,
              }}
            >
              Detalle de {rawCategory === 'cards' ? 'carta' : rawCategory === 'decks' ? 'deck' : 'accesorio'}
            </p>
            <button
              type="button"
              onClick={() => navigate(`/store/${rawCategory}`)}
              style={{
                borderRadius: 999,
                border: '1px solid rgba(148,163,184,0.85)',
                padding: '6px 14px',
                background:
                  'radial-gradient(circle at top left, rgba(15,23,42,0.95), rgba(15,23,42,1))',
                color: '#e5e7eb',
                fontSize: 12,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: 0.08,
              }}
            >
              Volver a la tienda
            </button>
          </div>
          <h1
            style={{
              fontSize: typography.sectionTitle.size + 6,
              lineHeight: typography.sectionTitle.lineHeight,
              fontWeight: typography.sectionTitle.weight,
              margin: 0,
              marginBottom: spacing.sm,
            }}
          >
            {item.name}
          </h1>
          <p
            style={{
              fontSize: typography.body.size,
              color: 'var(--color-text-muted)',
              maxWidth: 520,
            }}
          >
            Información basada en un ejemplo del catálogo de la tienda YuGi Faction. Úselo como
            referencia para integrar datos reales más adelante.
          </p>

          <div
            style={{
              marginTop: spacing.lg,
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: spacing.md,
              fontSize: 14,
            }}
          >
            <div>
              <div>
                <strong>Vendedor: </strong>
                <span>{item.sellerName}</span>
              </div>
              <div>
                <strong>Formato: </strong>
                <span>{item.gameFormat}</span>
              </div>
              <div>
                <strong>Estado: </strong>
                <span>{item.condition}</span>
              </div>
              <div>
                <strong>Cantidad disponible: </strong>
                <span>{item.quantity}x</span>
              </div>
            </div>
            <div>
              <div>
                <strong>Expansión: </strong>
                <span>{item.expansionCode}</span>
              </div>
              <div>
                <strong>Rareza: </strong>
                <span>{item.rarity}</span>
              </div>
              <div>
                <strong>Precio unidad: </strong>
                <span>${item.price.usd.toFixed(2)} USD</span>
              </div>
              <div>
                <strong>Equivalente CUP: </strong>
                <span>≈{item.price.cup.toFixed(1)} CUP</span>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            borderRadius: 24,
            border: '1px solid rgba(31,41,55,0.95)',
            background:
              'radial-gradient(circle at top, rgba(15,23,42,1), rgba(15,23,42,0.98))',
            padding: spacing.xl,
            boxShadow: '0 24px 60px rgba(15,23,42,0.98)',
          }}
        >
          <div
            style={{
              borderRadius: 18,
              border: '1px solid rgba(55,65,81,0.9)',
              background:
                item.category === 'cards'
                  ? 'radial-gradient(circle at 10% 0, #38bdf8, #0f172a 60%, #020617 100%)'
                  : item.category === 'decks'
                    ? 'radial-gradient(circle at 10% 0, #f97316, #7c2d12 60%, #020617 100%)'
                    : 'radial-gradient(circle at 10% 0, #facc15, #4b5563 60%, #020617 100%)',
              height: 220,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#f9fafb',
              fontSize: 42,
              fontWeight: 800,
              textTransform: 'uppercase',
            }}
          >
            {item.name.charAt(0)}
          </div>
          <p
            style={{
              marginTop: spacing.md,
              fontSize: 13,
              color: 'var(--color-text-muted)',
            }}
          >
            Aquí podría ir una imagen oficial o personalizada del producto, junto con información
            adicional del vendedor y acciones de compra.
          </p>
          <button
            type="button"
            style={{
              marginTop: spacing.md,
              borderRadius: 999,
              border: '1px solid rgba(250,204,21,0.9)',
              padding: '10px 24px',
              background:
                'linear-gradient(135deg, #facc15, #eab308, #f97316)',
              color: '#020617',
              fontWeight: 700,
              fontSize: 14,
              textTransform: 'uppercase',
              letterSpacing: 0.08,
              boxShadow: '0 16px 40px rgba(251,191,36,0.75)',
              width: '100%',
            }}
          >
            Contactar vendedor (demo)
          </button>
        </div>
      </section>
    </Layout>
  )
}

