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
      tagline: 'Eventová značka nové generace — hudba, zážitky a propojení lidí.',
      paragraphs: [
        '3lwave vznikl ze severočeské hudební scény. Pořádáme eventy, na kterých jde o hudbu, atmosféru a lidi, kteří k nim patří — od line-upu a produkce po promo a komunitu kolem akcí.',
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
      tagline: 'Next-generation event brand — music, experiences and connecting people.',
      paragraphs: [
        '3lwave grew out of the North Bohemian music scene. We run events that are about music, atmosphere and the people who belong to them — from line-up and production to promotion and the community around each event.',
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
      tagline: 'Nezávislé vydavatelství zaměřené na autentické umělce a originální zvuky.',
      paragraphs: [
        'Globaal Records je nezávislé hudební vydavatelství. Stavíme na autentických umělcích a originálním zvuku, ne na trendech.',
        'Díky propojení s eventy 3lwave a kreativním zázemím skupiny mohou umělci růst na jednom místě — od vydání hudby po vystoupení před publikem.',
      ],
      highlights: [
        { title: 'Autentičnost', text: 'Podporujeme umělce s vlastním hlasem a originálním zvukem.' },
        { title: 'Nezávislost', text: 'Jsme nezávislé vydavatelství, které drží kurz podle hudby.' },
        { title: 'Propojení s eventy', text: 'Umělci mají cestu na pódia akcí 3lwave.' },
      ],
      cta: 'Navštívit web labelu',
    },
    en: {
      category: 'Music',
      tagline: 'Independent label focused on authentic artists and original sounds.',
      paragraphs: [
        'Globaal Records is an independent music label. We build on authentic artists and original sound, not on trends.',
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
      tagline: 'Kreativní a marketingová agentura pro malé a střední firmy.',
      paragraphs: [
        'Globaal Production vznikl, protože jsme sami neměli kde objednat slušný branding za rozumnou cenu. Dnes stejnou službu nabízíme malým a středním firmám.',
        'Zajišťujeme kompletní marketing a grafické zpracování — od vizuální identity a webu přes SEO a placenou reklamu po oslovování zákazníků.',
      ],
      highlights: [],
      services: [
        { title: 'SEO', text: 'Optimalizace pro vyhledávače, aby vás zákazníci našli na Googlu.' },
        { title: 'Meta Ads', text: 'Reklamní kampaně na Facebooku a Instagramu.' },
        { title: 'Google Ads', text: 'Placená reklama ve vyhledávání a na dalších kanálech Googlu.' },
        { title: 'Marketing', text: 'Plánování a řízení marketingu, který odpovídá cílům vaší firmy.' },
        { title: 'Grafické zpracování', text: 'Branding, vizuální identita a grafika pro web, sociální sítě i tisk.' },
        { title: 'Web development', text: 'Weby, které vypadají dobře a konvertují.' },
        { title: 'Telesales', text: 'Aktivní oslovování zákazníků a budování obchodních kontaktů.' },
      ],
      cta: 'Napište nám',
    },
    en: {
      category: 'Creative',
      tagline: 'Creative and marketing agency for small and medium-sized businesses.',
      paragraphs: [
        'Globaal Production was born because we ourselves had nowhere to order decent branding at a reasonable price. Today we offer the same service to small and medium-sized businesses.',
        'We provide complete marketing and graphic design — from visual identity and a website to SEO, paid advertising and reaching out to customers.',
      ],
      highlights: [],
      services: [
        { title: 'SEO', text: 'Search engine optimisation so customers can find you on Google.' },
        { title: 'Meta Ads', text: 'Advertising campaigns on Facebook and Instagram.' },
        { title: 'Google Ads', text: 'Paid advertising in search and across other Google channels.' },
        { title: 'Marketing', text: 'Planning and running marketing that matches your business goals.' },
        { title: 'Graphic design', text: 'Branding, visual identity and graphics for web, social media and print.' },
        { title: 'Web development', text: 'Websites that look good and convert.' },
        { title: 'Telesales', text: 'Active customer outreach and building business contacts.' },
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
      tagline: 'Vývoj AI systémů, webů a digitálních produktů na zakázku.',
      paragraphs: [
        'Vision Technology je technologická větev skupiny. Vyvíjíme AI systémy, weby a digitální produkty na zakázku — od prototypu až po produkci.',
        'Stojíme také za interními systémy a architekturou digitálních produktů celé skupiny Globaal Elevate.',
      ],
      highlights: [
        { title: 'AI systémy', text: 'Řešení na míru, která řeší konkrétní problém.' },
        { title: 'Weby a produkty', text: 'Od webu po digitální produkt na zakázku.' },
        { title: 'Od prototypu po produkci', text: 'Provedeme vás celou cestou od nápadu po nasazení.' },
      ],
      cta: 'Navštívit web Vision Technology',
    },
    en: {
      category: 'Technology',
      tagline: 'Custom development of AI systems, websites and digital products.',
      paragraphs: [
        'Vision Technology is the technology arm of the group. We build custom AI systems, websites and digital products — from prototype to production.',
        'We are also behind the internal systems and the digital product architecture of the entire Globaal Elevate group.',
      ],
      highlights: [
        { title: 'AI systems', text: 'Tailor-made solutions that solve a specific problem.' },
        { title: 'Websites and products', text: 'From a website to a custom digital product.' },
        { title: 'Prototype to production', text: 'We take you the whole way from idea to deployment.' },
      ],
      cta: 'Visit the Vision Technology website',
    },
  },
]
