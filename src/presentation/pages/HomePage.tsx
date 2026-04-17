import { HomePageContentService } from '../../application/content/HomePageContentService'
import { Layout } from '../components/Layout'
import { HeroSection } from '../components/HeroSection'
import { FeaturesSection } from '../components/FeaturesSection'
import { CommerceSection } from '../components/CommerceSection'
import { FaqAndContactSection } from '../components/FaqAndContactSection'
import { CommunitySection } from '../components/CommunitySection'

const contentService = new HomePageContentService()

export const HomePage = () => {
  const content = contentService.getContent()

  return (
    <Layout>
      <HeroSection hero={content.hero} />
      <FeaturesSection features={content.features} />
      <CommerceSection categories={content.categories} benefits={content.commerceBenefits} />
      <FaqAndContactSection
        faqs={content.faqs}
        contactChannels={content.contactChannels}
      />
      <CommunitySection developers={content.developers} donors={content.donors} />
    </Layout>
  )
}

