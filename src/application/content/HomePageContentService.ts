import { HeroContent } from '../../domain/entities/HeroContent'
import { Feature } from '../../domain/entities/Feature'
import { ProductCategory } from '../../domain/entities/ProductCategory'
import { CommerceBenefit } from '../../domain/entities/CommerceBenefit'
import { FaqItem } from '../../domain/entities/FaqItem'
import { ContactChannel } from '../../domain/entities/ContactChannel'
import { DeveloperProfile } from '../../domain/entities/DeveloperProfile'
import { Donor } from '../../domain/entities/Donor'

export interface HomePageContent {
  hero: HeroContent
  features: Feature[]
  categories: ProductCategory[]
  commerceBenefits: CommerceBenefit[]
  faqs: FaqItem[]
  contactChannels: ContactChannel[]
  developers: DeveloperProfile[]
  donors: Donor[]
}

export class HomePageContentService {
  getContent(): HomePageContent {
    return {
      hero: new HeroContent({
        title: 'Bienvenido a YuGi Faction',
        subtitle:
          'Bienvenidos duelistas. Acceda a las mejores cartas, decks y accesorios. Nos encargamos de ayudarlo a encontrar lo que desea. ¡Comercie ahora!',
        primaryCtaLabel: 'Iniciar sesión',
        secondaryCtaLabel: 'Acceder a la tienda',
      }),
      features: [
        new Feature({
          id: 'unify-community',
          title: 'Unificar a la comunidad',
          description:
            'Tenemos el objetivo de agrupar a toda la comunidad de YU-GI-OH y hacer de esta una gran nación.',
        }),
        new Feature({
          id: 'card-trade',
          title: 'Comercio de cartas',
          description: 'Accede a las mejores cartas del mercado',
        }),
        new Feature({
          id: 'deck-trade',
          title: 'Comercio de decks',
          description: 'Encuentra decks completos listos para jugar o mejorar tu estrategia.',
        }),
        new Feature({
          id: 'accessory-trade',
          title: 'Comercio de accesorios',
          description: 'Tapetes, fundas y todo tipo de accesorios a tu disposición.',
        }),
        new Feature({
          id: 'donations',
          title: 'Donaciones voluntarias',
          description: 'Apoya el proyecto para que siga creciendo y ofreciendo mejores servicios.',
        }),
      ],
      categories: [
        new ProductCategory({
          id: 'cards',
          type: 'cards',
          title: 'Comercio de cartas',
          description: 'Accede las mejores cartas del mercado ¡Accede ahora!',
          totalAvailable: 2602,
        }),
        new ProductCategory({
          id: 'decks',
          type: 'decks',
          title: 'Comercio de decks',
          description: 'Decks disponibles para comprar ¡Accede ahora!',
          totalAvailable: 74,
        }),
        new ProductCategory({
          id: 'accessories',
          type: 'accessories',
          title: 'Comercio de accesorios',
          description: 'Accesorios de todo tipo a tu disposición. ¡Accede ahora!',
          totalAvailable: 23,
        }),
      ],
      commerceBenefits: [
        new CommerceBenefit({
          id: 'variety',
          title: 'Gran variedad de cartas',
          description: 'Encuentra cartas para cualquier tipo de estrategia o colección.',
        }),
        new CommerceBenefit({
          id: 'centralized',
          title: 'Centralizar el mercado',
          description:
            'Un único lugar para que la comunidad pueda comprar, vender y donar de forma organizada.',
        }),
        new CommerceBenefit({
          id: 'decks-available',
          title: 'Todo tipo de decks disponibles',
          description: 'Desde decks competitivos hasta temáticos, listos para entrar al duelo.',
        }),
        new CommerceBenefit({
          id: 'competition',
          title: 'Forme parte de la competencia',
          description:
            'Únase a eventos, torneos y retos organizados por la comunidad y los administradores.',
        }),
        new CommerceBenefit({
          id: 'contact',
          title: 'Contacto rápido con vendedores',
          description: 'Comuníquese con vendedores potenciales de forma ágil y directa.',
        }),
        new CommerceBenefit({
          id: 'ease',
          title: 'Facilidad de comercio',
          description: 'Procesos simples para publicar, negociar y concretar sus intercambios.',
        }),
      ],
      faqs: [
        new FaqItem({
          id: 'seller',
          question: '¿Cómo ser vendedor?',
          answer:
            'Si pertenece a la comunidad debe contactar a su principal jefe de provincia. Si está fuera de la comunidad debe contactar directamente con el administrador del sitio Mangel. Los contactos de los administradores de provincia están disponibles en su sesión administrativa de perfil una vez creada la cuenta.',
        }),
        new FaqItem({
          id: 'complaint',
          question: '¿Cómo reportar una queja?',
          answer:
            'Puede reportar abuso en el uso de la plataforma, ya sea de un administrador o un usuario normal. Revisaremos las pruebas y tomaremos medidas con el personal reportado.',
        }),
        new FaqItem({
          id: 'bug',
          question: '¿Cómo reportar un error?',
          answer:
            'Al encontrar un error en el sitio, presente pruebas claras (preferiblemente capturas de pantalla) o una descripción detallada del problema.',
        }),
        new FaqItem({
          id: 'offerings',
          question: '¿Es todo lo que brindan?',
          answer:
            'Actualmente el sitio está en desarrollo y se irán integrando nuevas funcionalidades con el tiempo.',
        }),
        new FaqItem({
          id: 'ideas',
          question: '¿Cómo puedo presentar ideas?',
          answer:
            'Puede contactarnos directamente por WhatsApp o correo electrónico y plantear sus ideas para mejorar la plataforma.',
        }),
        new FaqItem({
          id: 'news',
          question: '¿Dónde puedo ver las últimas noticias?',
          answer:
            'Las noticias se publicarán en nuestro grupo de WhatsApp con cada actualización relevante del sitio.',
        }),
        new FaqItem({
          id: 'help',
          question: '¿Cómo puedo ayudar?',
          answer:
            'Siempre puede ayudarnos realizando una contribución. Esto nos motiva y nos permite seguir mejorando el servicio.',
        }),
      ],
      contactChannels: [
        new ContactChannel({
          id: 'email',
          type: 'email',
          label: 'Email',
          description: 'Contáctanos vía Gmail. Responderemos lo antes posible.',
          ctaLabel: 'Contactar',
        }),
        new ContactChannel({
          id: 'whatsapp',
          type: 'whatsapp',
          label: 'Whatsapp',
          description: 'Contáctanos vía Whatsapp. Responderemos lo antes posible.',
          ctaLabel: 'Contactar',
        }),
        new ContactChannel({
          id: 'donate',
          type: 'donation',
          label: 'Donar',
          description: 'Si te gusta nuestro trabajo puedes ayudarnos con un ☕.',
          ctaLabel: 'Acceder',
        }),
      ],
      developers: [
        new DeveloperProfile({
          id: 'jose-raul',
          name: 'Jose Raul',
          role: 'Jefe de proyecto y desarrollador',
          order: 1,
        }),
        new DeveloperProfile({
          id: 'alfredd',
          name: 'Alfredd',
          role: 'Desarrollador',
          order: 2,
        }),
      ],
      donors: [
        new Donor({ id: 'maik', displayName: 'Maik' }),
        new Donor({ id: 'livany', displayName: 'Livany' }),
        new Donor({ id: 'marcos', displayName: 'Marcos' }),
        new Donor({ id: 'bankaiproject', displayName: 'BankaiProject' }),
        new Donor({ id: 'yukigw', displayName: 'YukiGW' }),
      ],
    }
  }
}

