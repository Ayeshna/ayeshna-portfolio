/* ==========================================================================
   Projects — single source of truth
   `featured: true` → renders in the radial wheel & mobile accordion
   `featured: false` → lives in the Archive overlay
   ========================================================================== */

export const projects = [
  /* ───── ARCHIVE ───── */
  {
    id: 1,
    slug: 'smart-max',
    title: 'IVG Smart Max',
    category: 'Launch Marketing Campaign',
    thumb: '/assets/projects/smart-max/thumb.jpg',
    project: '/assets/projects/smart-max/content.jpg',
    featured: false,
  },
  {
    id: 2,
    slug: 'ivg-pro',
    title: 'IVG Pro',
    category: 'Launch Marketing Campaign',
    thumb: '/assets/projects/ivg-pro/thumb.jpg',
    project: '/assets/projects/ivg-pro/content.jpg',
    featured: false,
  },
  {
    id: 3,
    slug: 'ivg-aromas',
    title: 'IVG Aromas',
    category: 'Launch Marketing Campaign',
    thumb: '/assets/projects/ivg-aromas/thumb.jpg',
    project: '/assets/projects/ivg-aromas/content.jpg',
    featured: false,
  },

  /* ───── FEATURED 1 — Art Direction at scale ───── */
  {
    id: 4,
    slug: 'ivg-bespoke',
    title: 'IVG × Bespoke',
    category: 'Cinema & OOH Campaign',
    thumb: '/assets/projects/ivg-bespoke/thumb.jpg',
    project: '/assets/projects/ivg-bespoke/content.jpg',
    video: 'https://res.cloudinary.com/dw6xbrcbk/video/upload/ivg-bespoke_fbgcx0.mp4',
    hasAudio: true,
    featured: true,
  },

  /* ───── FEATURED 2 — Product & UI ───── */
  {
    id: 5,
    slug: 'ivg-homepage',
    title: 'IVG Homepage',
    category: 'E-commerce UI Redesign',
    thumb: '/assets/projects/ivg-homepage/thumb.jpg',
    project: '/assets/projects/ivg-homepage/content.jpg',
    video: 'https://res.cloudinary.com/dw6xbrcbk/video/upload/ivg-_homepage_n2kcfd.mp4',
    featured: true,
  },

  /* ───── ARCHIVE ───── */
  {
    id: 6,
    slug: 'merch-collective',
    title: 'The Merch Collective',
    category: 'Merchandise & Lifestyle Packaging',
    thumb: '/assets/projects/merch-collective/thumb.jpg',
    project: '/assets/projects/merch-collective/content.jpg',
    featured: false,
  },

  /* ───── FEATURED 3 — Premium brand identity ───── */
  {
    id: 7,
    slug: 'br01-customs',
    title: 'BR01 Customs',
    category: 'Brand Identity · Automotive',
    thumb: '/assets/projects/br01-customs/thumb.jpg',
    project: '/assets/projects/br01-customs/content.jpg',
    featured: true,
  },

  /* ───── ARCHIVE ───── */
  {
    id: 8,
    slug: 'jmojo',
    title: 'JMOJO',
    category: 'Branding & Web Marketing',
    thumb: '/assets/projects/jmojo/thumb.jpg',
    project: '/assets/projects/jmojo/content.jpg',
    featured: false,
  },
  {
    id: 9,
    slug: 'herman-co',
    title: 'Herman & Co',
    category: 'Branding',
    thumb: '/assets/projects/herman-co/thumb.jpg',
    project: '/assets/projects/herman-co/content.jpg',
    featured: false,
  },

  /* ───── FEATURED 4 — Packaging + measurable business result ───── */
  {
    id: 10,
    slug: 'nanis-chutney',
    title: "Nani's Chutney",
    category: 'Brand Identity & Packaging',
    thumb: '/assets/projects/nanis-chutney/thumb.jpg',
    project: '/assets/projects/nanis-chutney/content.jpg',
    featured: true,
  },

  /* ───── FEATURED 5 — Brand Systems thinking ───── */
  {
    id: 11,
    slug: 'viosimos',
    title: 'Viosimos United',
    category: 'Brand System · Product & Marketing',
    thumb: '/assets/projects/viosimos/thumb.jpg',
    project: '/assets/projects/viosimos/content.jpg',
    video: 'https://res.cloudinary.com/dw6xbrcbk/video/upload/Viosimos_fk5quz.mp4',
    featured: true,
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
export const archiveProjects  = projects.filter((p) => !p.featured)
