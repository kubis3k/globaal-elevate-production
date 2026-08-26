export const locales = ['cs', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'cs';

export const ui = {
  cs: {
    'nav.marketing': 'Marketing',
    'nav.portfolio': 'Portfolio',
    'nav.about': 'O nás',
    'nav.careers': 'Kariéra',
    'nav.contact': 'Kontakt',
    'nav.skipToContent': 'Přejít na obsah',

    'footer.businessInquiries': 'Obchodní dotazy',
    'footer.eventBooking': 'Eventový booking',
    'footer.brandOf': 'je značka Globaal Elevate Production s.r.o.',
    'footer.rights': 'Všechna práva vyhrazena.',
    'footer.gdpr': 'GDPR',
    'footer.ico': 'IČO',

    'cookie.text':
      'Používáme cookies pro provoz webu a anonymní analytiku. Více v našich zásadách.',
    'cookie.accept': 'Přijmout',
    'cookie.decline': 'Odmítnout',
    'cookie.settings': 'Nastavení',

    'form.name': 'Jméno',
    'form.email': 'E-mail',
    'form.message': 'Zpráva',
    'form.submit': 'Odeslat',
    'form.sending': 'Odesílání…',
    'form.success': 'Děkujeme, ozveme se vám co nejdříve.',
    'form.error': 'Něco se nepovedlo, zkuste to znovu nebo nám napište přímo na e-mail.',

    'lang.switchTo': 'English',

    'jobs.empty':
      'Momentálně nemáme otevřené pozice. Sledujte nás na Instagramu nebo nám napište — ozveme se, jakmile se něco uvolní.',
    'jobs.apply': 'Napsat na',
    'jobs.remote': 'Remote',
    'jobs.location': 'Místo',
    'jobs.employmentType.FULL_TIME': 'Plný úvazek',
    'jobs.employmentType.PART_TIME': 'Částečný úvazek',
    'jobs.employmentType.CONTRACTOR': 'Spolupráce (IČO)',
    'jobs.employmentType.INTERN': 'Stáž',
    'jobs.salaryUnit.MONTH': 'měsíc',
    'jobs.salaryUnit.HOUR': 'hod',

    'brand.visit': 'Navštívit',
    'brand.building': 'Připravujeme',
  },
  en: {
    'nav.marketing': 'Marketing',
    'nav.portfolio': 'Portfolio',
    'nav.about': 'About',
    'nav.careers': 'Careers',
    'nav.contact': 'Contact',
    'nav.skipToContent': 'Skip to content',

    'footer.businessInquiries': 'Business inquiries',
    'footer.eventBooking': 'Event booking',
    'footer.brandOf': 'is a brand of Globaal Elevate Production s.r.o.',
    'footer.rights': 'All rights reserved.',
    'footer.gdpr': 'GDPR',
    'footer.ico': 'Company ID',

    'cookie.text':
      'We use cookies to run this site and for anonymous analytics. See our policy for details.',
    'cookie.accept': 'Accept',
    'cookie.decline': 'Decline',
    'cookie.settings': 'Settings',

    'form.name': 'Name',
    'form.email': 'Email',
    'form.message': 'Message',
    'form.submit': 'Submit',
    'form.sending': 'Sending…',
    'form.success': 'Thank you, we will get back to you shortly.',
    'form.error': 'Something went wrong, please try again or email us directly.',

    'lang.switchTo': 'Česky',

    'jobs.empty':
      'We currently have no open positions. Follow us on Instagram or write to us — we will reach out as soon as something opens up.',
    'jobs.apply': 'Email',
    'jobs.remote': 'Remote',
    'jobs.location': 'Location',
    'jobs.employmentType.FULL_TIME': 'Full-time',
    'jobs.employmentType.PART_TIME': 'Part-time',
    'jobs.employmentType.CONTRACTOR': 'Contractor',
    'jobs.employmentType.INTERN': 'Internship',
    'jobs.salaryUnit.MONTH': 'month',
    'jobs.salaryUnit.HOUR': 'hour',

    'brand.visit': 'Visit',
    'brand.building': 'Coming soon',
  },
} as const;

export type UiKey = keyof typeof ui.cs;
