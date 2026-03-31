import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import type { StoreItemCategory } from '../../domain/entities/StoreItem'
import type { StoreItem } from '../../domain/entities/StoreItem'
import { StoreCatalogService } from '../../application/store/StoreCatalogService'
import { Layout } from '../components/Layout'
import { StoreCategoryTabs } from '../components/store/StoreCategoryTabs'
import { StoreItemCard } from '../components/store/StoreItemCard'
import { useTheme } from '../../theme/ThemeProvider'

const catalog = new StoreCatalogService()

const isValidCategory = (value: string | undefined): value is StoreItemCategory => {
  return value === 'cards' || value === 'decks' || value === 'accessories'
}

export const StorePage = () => {
  const params = useParams()
  const rawCategory = params.category
  const { spacing, typography } = useTheme()

  const [items, setItems] = useState<StoreItem[]>([])
  const [loading, setLoading] = useState(true)

  const activeCategory: StoreItemCategory = isValidCategory(rawCategory) ? rawCategory : 'cards'

  useEffect(() => {
    setLoading(true)
    catalog.getItemsByCategory(activeCategory).then(setItems).finally(() => setLoading(false))
  }, [activeCategory])

  if (!isValidCategory(rawCategory)) {
    return <Navigate to="/store/cards" replace />
  }

  const titleByCategory: Record<StoreItemCategory, string> = {
    cards: 'Todas las cartas',
    decks: 'Todos los decks',
    accessories: 'Todos los accesorios',
  }

  const subtitleByCategory: Record<StoreItemCategory, string> = {
    cards:
      'Explora las cartas disponibles en la comunidad YuGi Faction. Basado en la tienda de referencia.',
    decks:
      'Decks listos para jugar o mejorar tu estrategia. Listado de ejemplo inspirado en la tienda.',
    accessories:
      'Accesorios para tus duelos: playmats, fundas y más. Catálogo demostrativo.',
  }

  return (
    <Layout>
      <section
        style={{
          marginBottom: spacing.sectionPaddingY,
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 3fr) minmax(0, 2fr)',
          gap: spacing.xxl,
          alignItems: 'flex-start',
        }}
      >
        <div>
          <p
            style={{
              fontSize: 13,
              textTransform: 'uppercase',
              letterSpacing: 4,
              color: 'var(--color-primary-soft)',
              marginBottom: spacing.sm,
            }}
          >
            Tienda YuGi Faction
          </p>
          <h1
            style={{
              fontSize: typography.sectionTitle.size + 4,
              lineHeight: typography.sectionTitle.lineHeight,
              fontWeight: typography.sectionTitle.weight,
              margin: 0,
              marginBottom: spacing.sm,
            }}
          >
            {titleByCategory[activeCategory]}
          </h1>
          <p
            style={{
              fontSize: typography.body.size,
              color: 'var(--color-text-muted)',
              maxWidth: 520,
              marginBottom: spacing.lg,
            }}
          >
            {subtitleByCategory[activeCategory]}
          </p>
          <StoreCategoryTabs activeCategory={activeCategory} />
        </div>

        <div
          style={{
            borderRadius: 22,
            border: '1px solid rgba(31,41,55,0.95)',
            background:
              'radial-gradient(circle at top, rgba(15,23,42,0.98), rgba(15,23,42,1))',
            padding: spacing.lg,
            boxShadow: '0 24px 60px rgba(15,23,42,0.96)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: spacing.sm,
              fontSize: 13,
            }}
          >
            <label
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                color: 'var(--color-text-muted)',
              }}
            >
              <span>Buscar</span>
              <input
                type="text"
                placeholder="Nombre de la carta..."
                style={{
                  borderRadius: 999,
                  border: '1px solid rgba(55,65,81,0.9)',
                  backgroundColor: 'rgba(15,23,42,0.9)',
                  padding: '8px 12px',
                  color: '#e5e7eb',
                  fontSize: 13,
                }}
              />
            </label>
            <label
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                color: 'var(--color-text-muted)',
              }}
            >
              <span>Ordenar</span>
              <select
                style={{
                  borderRadius: 999,
                  border: '1px solid rgba(55,65,81,0.9)',
                  backgroundColor: 'rgba(15,23,42,0.9)',
                  padding: '8px 12px',
                  color: '#e5e7eb',
                  fontSize: 13,
                }}
                defaultValue="none"
              >
                <option value="none">N/A</option>
                <option value="recent">Más reciente</option>
                <option value="price-asc">Precio</option>
                <option value="name">Nombre</option>
              </select>
            </label>
          </div>
          <p
            style={{
              marginTop: spacing.sm,
              marginBottom: 0,
              fontSize: 12,
              color: 'rgba(148,163,184,0.9)',
            }}
          >
            Filtros y ordenamiento son demostrativos y no modifican los resultados aún.
          </p>
        </div>
      </section>

      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: spacing.md,
        }}
      >
        {loading ? (
          <p style={{ color: 'var(--color-text-muted)', textAlign: 'center' }}>Cargando...</p>
        ) : items.length === 0 ? (
          <p style={{ color: 'var(--color-text-muted)', textAlign: 'center' }}>
            No hay elementos disponibles en esta categoría.
          </p>
        ) : (
          items.map((item) => <StoreItemCard key={item.id} item={item} />)
        )}
      </section>
    </Layout>
  )
}

