import { useEffect, useState } from 'react'
import { HomePageContentService } from '../../application/content/HomePageContentService'
import { StoreCatalogService } from '../../application/store/StoreCatalogService'
import { ProductCategory } from '../../domain/entities/ProductCategory'
import { Layout } from '../components/Layout'
import { HeroSection } from '../components/HeroSection'
import { FeaturesSection } from '../components/FeaturesSection'
import { CommerceSection } from '../components/CommerceSection'
import { FaqAndContactSection } from '../components/FaqAndContactSection'
import { CommunitySection } from '../components/CommunitySection'

const contentService = new HomePageContentService()
const catalogService = new StoreCatalogService()

export const HomePage = () => {
  const content = contentService.getContent()
  const [categories, setCategories] = useState<ProductCategory[]>(content.categories)

  useEffect(() => {
    catalogService.getCounts().then(({ cards, decks, accessories }) => {
      const counts = { cards, decks, accessories }
      setCategories(content.categories.map((cat) =>
        new ProductCategory({ ...cat, totalAvailable: counts[cat.type] })
      ))
    })
  }, [])

  return (
    <Layout>
      <HeroSection hero={content.hero} />
      <FeaturesSection features={content.features} />
      <CommerceSection categories={categories} benefits={content.commerceBenefits} />
      <FaqAndContactSection
        faqs={content.faqs}
        contactChannels={content.contactChannels}
      />
      <CommunitySection developers={content.developers} donors={content.donors} />
    </Layout>
  )
}

