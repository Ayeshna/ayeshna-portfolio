/* ==========================================================================
   Case Studies — text content for the 5 featured projects
   Keyed by project slug. Renders via <CaseStudyHero> at the top of overlays.
   Archive projects have no entry → they show the standard overlay only.
   ========================================================================== */

export const caseStudies = {
  /* ─────────────────────────────────────────────────────────── */
  'ivg-bespoke': {
    sector: 'Vape · Cinema & OOH',
    year:   '2024',
    role:   'Lead Visual Designer',
    problem:
      'IVG needed to break out of standard product-shot category visuals and stake its claim as a premium lifestyle brand on screens, transport hoardings and high-traffic urban surfaces across the UK and Europe.',
    goal:
      'Build a cinematic identity for the Bespoke range that could scale from a 15-second cinema cut down to a 6-inch in-store wobbler — without losing its premium feel.',
    myRole: [
      'Art-directed the full Bespoke campaign system across cinema, transport, in-store and digital',
      'Built the 3D product hero scenes in Cinema 4D, replacing stock-style product photography',
      'Defined the typographic and motion language reused across all subsequent IVG launches',
    ],
    result: [
      'Deployed across 8 UK cities — Odeon & Vue cinemas alongside Deadpool vs Wolverine',
      'Full London bus & Black Cab fleet wrapped for 2 months · 10 private vehicles for 6 months',
      'Now expanding into Germany, Poland, France and Czechia',
      'IVG became the creators of the UK’s Big Puff category',
      'Won Vapouround Global Awards — Innovation of the Decade 2025',
      'Best UK E-Liquid Brand at Eccie ClickVape Awards: 2019, 2021, 2022',
    ],
  },

  /* ─────────────────────────────────────────────────────────── */
  'ivg-homepage': {
    sector: 'E-commerce · UI/UX',
    year:   '2024',
    role:   'Lead UI Designer',
    problem:
      'IVG’s homepage was structured as a static category dump — heavy on product imagery, weak on storytelling, and not optimised for the buyer journey from awareness to conversion.',
    goal:
      'Architect a brand-led e-commerce homepage that elevated IVG’s identity and improved the path-to-purchase across desktop and mobile.',
    myRole: [
      'Spearheaded the full Figma redesign — wireframes, high-fidelity UI, responsive component system',
      'Restructured information architecture around three buyer personas (new vapers, brand-loyal, premium upgraders)',
      'Built the component library the in-house dev team continues to use across sub-brand collection pages',
    ],
    result: [
      'Now live at ivapegreat.com',
      '+38% conversion rate post-launch',
      '‒63% bounce rate',
      '+70% time-on-page',
      '+42% click-through rate on featured product blocks',
      '38% repeat-customer rate',
      'Component library powering the IVG Pro 2 collection pages',
    ],
    links: [
      { label: 'View live site', href: 'https://ivapegreat.com/' },
      { label: 'IVG Pro 2 Collection', href: 'https://ivapegreat.com/collections/ivg-pro-2-starter-kits-and-refill-pods' },
    ],
  },

  /* ─────────────────────────────────────────────────────────── */
  'viosimos': {
    sector: 'Digital Marketplace + CRM',
    year:   '2021 – 2023',
    role:   'UI/UX & Visual Designer',
    problem:
      'Viosimos operated with a fragmented visual identity — the marketplace, CRM tool, and marketing site all looked like they belonged to different companies.',
    goal:
      'Unify the brand into a single visual system covering product UI, CRM and marketing, while improving the user conversion path on the marketplace.',
    myRole: [
      'Redesigned the marketplace using user research — surveys, interviews and usability testing',
      'Built a unified design system in Figma covering logo, type, colour and component library',
      'Owned the marketing site and social campaign visuals using the new system',
    ],
    result: [
      '+12% user conversion rate on the marketplace',
      '+22% social media engagement through the new visual campaign system',
      '+14% brand recognition (internal brand survey)',
      'Design system still in production use across all Viosimos digital surfaces',
    ],
  },

  /* ─────────────────────────────────────────────────────────── */
  'br01-customs': {
    sector: 'Automotive Performance & Modification',
    year:   '2024',
    role:   'Brand Lead',
    problem:
      'BR01 Customs needed an identity that signalled premium performance engineering — not generic biker/automotive branding — and could carry through every touchpoint from Instagram to sponsored events.',
    goal:
      'Build a complete brand system editorial enough to sit alongside high-end automotive culture, while functioning as a lead-generation engine for the workshop’s bookings.',
    myRole: [
      'Developed the core identity — logo, type system, colour palette, art direction',
      'Designed the multi-channel brand system: Instagram-first social, print ads, web banners, sponsorship collateral and merch',
      'Built the visual playbook the founder continues to scale as the brand expands across Facebook and YouTube',
    ],
    result: [
      '1,200+ leads generated via @br01_customs Instagram',
      '70%+ conversion rate from leads to paying customers',
      '6,500+ Instagram followers — now expanding to Facebook & YouTube',
      'Sponsored Bankipore Club Ltd. events 2025 in Patna',
      'Leading core group member of BNI Bihar — using the brand as a strategic networking asset',
      'Identity scales across website, socials, print, web ads, sponsorship and merch',
    ],
    links: [
      { label: 'Follow @br01_customs', href: 'https://www.instagram.com/br01_customs/' },
    ],
  },

  /* ─────────────────────────────────────────────────────────── */
  'nanis-chutney': {
    sector: 'FMCG · Heritage Food',
    year:   '2020 – 2021',
    role:   'Brand & Packaging Lead',
    problem:
      'A small heritage chutney brand entering a crowded Indian supermarket shelf needed a visual identity that could compete with established condiment players without losing its hand-made, heritage-led story.',
    goal:
      'Build a complete identity and packaging system that signalled premium small-batch on shelf — and create a brand world the founder could continue to use across social, market stalls and DTC channels.',
    myRole: [
      'Created the core brand identity from scratch — name treatment, mark, type system, illustration language',
      'Designed the full packaging range: 2 SKUs × 3 variants each (6 SKUs total)',
      'Built supporting brand guidelines and social asset templates',
    ],
    result: [
      '+25% sales within the first 3 months of launch',
      'Now stocked across local independents and major retailers including D-Mart in Mumbai and Pune',
      'Continued retainer with the client for 2 years post-launch',
    ],
  },
}

export function getCaseStudy(slug) {
  return caseStudies[slug] || null
}
