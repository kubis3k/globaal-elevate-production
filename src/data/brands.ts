export type Lang = 'cs' | 'en'

interface BrandText {
  category: string
  tagline: string
  paragraphs: string[]
  highlights: { title: string; text: string }[]
  services?: { title: string; text: string }[]
  cta: string
}

export interface Brand {
  slug: string
  name: string
  color: string
  year: string
  url: string
  external: boolean
  cs: BrandText
  en: BrandText
}

export const brands: Brand[] = [
  {
    slug: '3lwave',
    name: '3lwave',
    color: '#F59E0B',
    year: '2026',
    url: 'https://3lwave.cz',
    external: true,
    cs: {
      category: 'Eventy',
      tagline: 'Pořádáme koncerty, klubové akce a tour zastávky. Od Chomutova po další města po celé republice.',
      paragraphs: [
        '3lwave vznikl ze severočeské hudební scény. Pořádáme koncerty a klubové akce, na kterých jde o hudbu, atmosféru a lidé, kteří k nim patří. Součástí jsou i tour zastávky, například v Chomutově, Liberci nebo Mariánských Lázních.',
        'Zkušenost s logistikou, promotion a publikem, kterou jsme získali přímo na scéně, přenášíme do každého dalšího projektu skupiny Globaal Elevate.',
      ],
      highlights: [
        { title: 'Hudba a zážitky', text: 'Eventy postavené kolem hudby a atmosféry, ne jen kolem line-upu.' },
        { title: 'Komunita', text: 'Propojujeme umělce, publikum a partnery na jednom místě.' },
        { title: 'Zázemí skupiny', text: 'Kreativu a technologie dodávají ostatní značky pod GEP.' },
      ],
      cta: 'Navštívit web 3lwave',
    },
    en: {
      category: 'Events',
      tagline: 'We organise concerts, club events and tour stops, from Chomutov to other cities across the country.',
      paragraphs: [
        '3lwave grew out of the North Bohemian music scene. We organise concerts and club events that are about music, atmosphere and the people who belong to them. Tour stops are part of it too, for example in Chomutov, Liberec or Mariánské Lázně.',
        'The experience with logistics, promotion and audiences that we gained directly on the scene carries into every other project of the Globaal Elevate group.',
      ],
      highlights: [
        { title: 'Music and experiences', text: 'Events built around music and atmosphere, not just a line-up.' },
        { title: 'Community', text: 'We connect artists, audiences and partners in one place.' },
        { title: 'Group backing', text: 'Creative and technology are provided by the other GEP brands.' },
      ],
      cta: 'Visit the 3lwave website',
    },
  },
  {
    slug: 'globaal-records',
    name: 'Globaal Records',
    color: '#ff6600',
    year: '2026',
    url: 'https://3lwave.cz/label',
    external: true,
    cs: {
      category: 'Hudba',
      tagline: 'Nezávislý hudební label. Hledáme autentické umělce, pomáháme jim s vydáním, distribucí a rozvojem.',
      paragraphs: [
        'Globaal Records je nezávislý hudební label. Hledáme autentické umělce a pomáháme jim s vydáním, distribucí a rozvojem. Stavíme na originálním zvuku, ne na trendech.',
        'Díky propojení s eventy 3lwave a kreativním zázemím skupiny mohou umělci růst na jednom místě — od vydání hudby po vystoupení před publikem.',
      ],
      highlights: [
        { title: 'Autentičnost', text: 'Podporujeme umělce s vlastním hlasem a originálním zvukem.' },
        { title: 'Nezávislost', text: 'Jsme nezávislý label, který drží kurz podle hudby.' },
        { title: 'Propojení s eventy', text: 'Umělci mají cestu na pódia akcí 3lwave.' },
      ],
      cta: 'Navštívit web labelu',
    },
    en: {
      category: 'Music',
      tagline: 'An independent music label. We look for authentic artists and help them with releases, distribution and development.',
      paragraphs: [
        'Globaal Records is an independent music label. We look for authentic artists and help them with releases, distribution and development. We build on original sound, not on trends.',
        'Thanks to the connection with 3lwave events and the creative backing of the group, artists can grow in one place — from releasing music to performing in front of an audience.',
      ],
      highlights: [
        { title: 'Authenticity', text: 'We support artists with their own voice and original sound.' },
        { title: 'Independence', text: 'We are an independent label that keeps its course by the music.' },
        { title: 'Connected to events', text: 'Artists have a route to the stages of 3lwave events.' },
      ],
      cta: 'Visit the label website',
    },
  },
  {
    slug: 'globaal-production',
    name: 'Globaal Production',
    color: '#6366f1',
    year: '2026',
    url: '/kontakt',
    external: false,
    cs: {
      category: 'Kreativa',
      tagline: 'Kreativní a marketingová agentura pro malé a střední firmy. Weby, branding a online reklama, které přivádějí zákazníky.',
      paragraphs: [
        'Globaal Production vznikl, protože jsme sami neměli kde objednat slušný branding za rozumnou cenu. Dnes stejnou službu nabízíme malým a středním firmám.',
        'Zajišťujeme prezentační weby, branding, grafiku a online marketing včetně SEO a reklamy na Meta a Google.',
      ],
      highlights: [],
      services: [
        { title: 'SEO', text: 'Optimalizace pro vyhledávače, aby vás zákazníci našli na Googlu.' },
        { title: 'Meta Ads', text: 'Reklamní kampaně na Facebooku a Instagramu.' },
        { title: 'Google Ads', text: 'Placená reklama ve vyhledávání a na dalších kanálech Googlu.' },
        { title: 'Marketing', text: 'Plánování a řízení marketingu, který odpovídá cílům vaší firmy.' },
        { title: 'Grafické zpracování', text: 'Branding, vizuální identita a grafika pro web, sociální sítě i tisk.' },
        { title: 'Weby', text: 'Prezentační weby, které vypadají dobře a přivádějí zákazníky.' },
      ],
      cta: 'Napište nám',
    },
    en: {
      category: 'Creative',
      tagline: 'A creative and marketing agency for small and medium-sized businesses. Websites, branding and online advertising that bring in customers.',
      paragraphs: [
        'Globaal Production was born because we ourselves had nowhere to order decent branding at a reasonable price. Today we offer the same service to small and medium-sized businesses.',
        'We provide presentation websites, branding, graphic design and online marketing, including SEO and advertising on Meta and Google.',
      ],
      highlights: [],
      services: [
        { title: 'SEO', text: 'Search engine optimisation so customers can find you on Google.' },
        { title: 'Meta Ads', text: 'Advertising campaigns on Facebook and Instagram.' },
        { title: 'Google Ads', text: 'Paid advertising in search and across other Google channels.' },
        { title: 'Marketing', text: 'Planning and running marketing that matches your business goals.' },
        { title: 'Graphic design', text: 'Branding, visual identity and graphics for web, social media and print.' },
        { title: 'Websites', text: 'Presentation websites that look good and bring in customers.' },
      ],
      cta: 'Get in touch',
    },
  },
  {
    slug: 'vision-technology',
    name: 'Vision Technology',
    color: '#10b981',
    year: '2026',
    url: 'https://visiontechnology.cz',
    external: true,
    cs: {
      category: 'Technologie',
      tagline: 'Software na zakázku: AI systémy, webové aplikace a vlastní SaaS produkty.',
      paragraphs: [
        'Vision Technology je technologická větev skupiny. Vyvíjíme software na zakázku: AI systémy, webové aplikace a vlastní SaaS produkty.',
        'Stojíme také za interními systémy a architekturou digitálních produktů celé skupiny Globaal Elevate.',
      ],
      highlights: [
        { title: 'AI systémy', text: 'Řešení na míru, která řeší konkrétní problém.' },
        { title: 'Webové aplikace', text: 'Webové aplikace na zakázku podle potřeb firmy.' },
        { title: 'Vlastní SaaS produkty', text: 'Vyvíjíme i vlastní SaaS produkty.' },
      ],
      cta: 'Navštívit web Vision Technology',
    },
    en: {
      category: 'Technology',
      tagline: 'Custom software: AI systems, web applications and our own SaaS products.',
      paragraphs: [
        'Vision Technology is the technology arm of the group. We build custom software: AI systems, web applications and our own SaaS products.',
        'We are also behind the internal systems and the digital product architecture of the entire Globaal Elevate group.',
      ],
      highlights: [
        { title: 'AI systems', text: 'Tailor-made solutions that solve a specific problem.' },
        { title: 'Web applications', text: 'Custom web applications built around a company\'s needs.' },
        { title: 'Our own SaaS products', text: 'We also build our own SaaS products.' },
      ],
      cta: 'Visit the Vision Technology website',
    },
  },
]
