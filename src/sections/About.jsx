import { useRef, useState } from 'react'
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useInView,
} from 'framer-motion'
import {
  Camera,
  Tv,
  Gamepad2,
  PenTool,
  Box,
  Wand2,
  Briefcase,
  GraduationCap,
  ArrowRight,
  TrendingUp,
  Smartphone,
  Award,
  Monitor,
  Crown,
} from 'lucide-react'
import '../styles/About.css'

/* ==========================================================================
   AboutBentoGrid
   Dark Glass · #08090C bg · #00FF41 accent · Heavitas + Lato
   Row 1:  A(6) + B(3) + C(3)  = 12
   Row 2:  D(8) + F(4)         = 12    (height-matched)
   Row 3:  E×3                 = 12
   ========================================================================== */

/* ---------- BentoCard — universal dark glass wrapper ---------- */

function BentoCard({ children, className = '', wrapperClass = '', glow = false }) {
  return (
    <div className={`bento-card-wrap ${wrapperClass}`}>
      <span className="bento-plus bento-plus--tl" aria-hidden="true">+</span>
      <span className="bento-plus bento-plus--tr" aria-hidden="true">+</span>
      <span className="bento-plus bento-plus--bl" aria-hidden="true">+</span>
      <span className="bento-plus bento-plus--br" aria-hidden="true">+</span>
      <div className={`bento-card ${glow ? 'bento-card--glow' : ''} ${className}`}>
        {children}
        <div className="bento-card__sheen" aria-hidden="true" />
        <div className="bento-card__glow" aria-hidden="true" />
      </div>
    </div>
  )
}

/* ==========================================================================
   Card [A] — Portrait  (6 cols)
   3D mouse-tilt, glare, glass info overlay
   ========================================================================== */

function AboutPortrait() {
  const cardRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [6, -6]), {
    stiffness: 220,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-6, 6]), {
    stiffness: 220,
    damping: 30,
  })
  const glareX = useTransform(mouseX, [0, 1], ['0%', '100%'])
  const glareY = useTransform(mouseY, [0, 1], ['0%', '100%'])

  function handleMouseMove(e) {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
  }

  function handleMouseLeave() {
    setIsHovering(false)
    mouseX.set(0.5)
    mouseY.set(0.5)
  }

  return (
    <div className="about-portrait-wrap bc-portrait">
      <span className="bento-plus bento-plus--tl" aria-hidden="true">+</span>
      <span className="bento-plus bento-plus--tr" aria-hidden="true">+</span>
      <span className="bento-plus bento-plus--bl" aria-hidden="true">+</span>
      <span className="bento-plus bento-plus--br" aria-hidden="true">+</span>
      <motion.div
        ref={cardRef}
        className="bento-card bento-card--glow about-portrait"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformPerspective: 800 }}
      >
        <div className="about-portrait__bg" />

        <motion.div
          className="about-portrait__glare"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([x, y]) =>
                `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.1) 0%, transparent 55%)`
            ),
            opacity: isHovering ? 1 : 0,
          }}
          aria-hidden="true"
        />

        <motion.div
          className="about-portrait__info"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="about-portrait__name">AYESHNA VINAYAK</h2>
          <p className="about-portrait__role">Senior Visual Designer</p>
        </motion.div>

        <div className="bento-card__sheen" aria-hidden="true" />
        <div className="bento-card__glow" aria-hidden="true" />
      </motion.div>
    </div>
  )
}

/* ==========================================================================
   Card [B] — Origin  (3 cols)
   Education: NIFT → UK
   ========================================================================== */

function AboutOrigin() {
  const steps = [
    { school: 'NIFT, India', degree: 'B.Des Communication Design', year: '2013 – 2017' },
    { school: 'MMU, Manchester', degree: 'MFA Business Management', year: '2018 – 2019' },
    { school: 'Edinburgh Napier', degree: 'MFA Interactive Arts', year: '2023 – 2024' },
  ]

  return (
    <BentoCard className="about-origin" wrapperClass="bc-origin" glow>
      <div className="about-label-row">
        <GraduationCap size={14} className="about-icon" />
        <p className="about-micro-label">Origin</p>
      </div>
      <h2 className="about-card-heading">NIFT → UK</h2>
      <p className="about-card-sub">A design journey across continents</p>
      <motion.div
        className="about-origin__steps"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        {steps.map((s, i) => (
          <motion.div
            key={i}
            className="about-origin__step"
            variants={{
              hidden: { opacity: 0, x: -12 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <ArrowRight size={11} className="about-icon" />
            <div>
              <p className="about-origin__school">{s.school}</p>
              <p className="about-origin__degree">{s.degree}</p>
              <p className="about-origin__year">{s.year}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </BentoCard>
  )
}

/* ==========================================================================
   Card [C] — Stats / Weaving Paths Infographic  (3 cols)
   Three discipline paths converge into a unified arrow
   ========================================================================== */

function AboutStats() {
  const weaveRef = useRef(null)
  const isInView = useInView(weaveRef, { once: true, margin: '-40px' })

  /*
   * Three paths inside a 260 × 180 viewBox.
   * All start at x=-15 (bleeds past left edge of card).
   * Each path weaves with 2 full crossovers before converging at x=245.
   *
   * Path 1 (Branding):  starts top → dips to bottom → rises to top → converges mid
   * Path 2 (UI/UX):     starts mid → rises to top → dips to bottom → converges mid
   * Path 3 (3D):        starts bot → rises to top → dips to bottom → converges mid
   */
  const pathBranding =
    'M -15,30 C 15,30 35,140 65,140 C 95,140 105,40 135,40 C 165,40 180,90 220,90 L 245,90'
  const pathUiux =
    'M -15,90 C 15,90 35,25 65,30 C 95,35 105,150 135,145 C 165,140 180,90 220,90 L 245,90'
  const path3d =
    'M -15,150 C 15,150 35,80 65,75 C 95,70 105,115 135,110 C 165,105 180,90 220,90 L 245,90'

  /* Discipline labels positioned along the left side of the paths */
  const disciplines = [
    { label: 'Branding', icon: PenTool, y: 30, color: '#00FF41' },
    { label: 'UI/UX', icon: Monitor, y: 90, color: 'rgba(0, 255, 65, 0.55)' },
    { label: '3D', icon: Box, y: 150, color: 'rgba(0, 255, 65, 0.3)' },
  ]

  return (
    <BentoCard className="about-stats" wrapperClass="bc-stats" glow>
      <div className="about-label-row">
        <Briefcase size={14} className="about-icon" />
        <p className="about-micro-label">Experience</p>
      </div>

      <div className="about-stats__header">
        <div>
          <motion.span
            className="about-stats__value"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            7+
          </motion.span>
          <span className="about-stats__postfix"> Years</span>
        </div>
        <TrendingUp size={16} className="about-icon" />
      </div>

      <p className="about-stats__desc">
        Brand systems, product UI, 3D and motion — shipped across e-commerce, gaming and lifestyle sectors.
      </p>

      {/* Weaving paths infographic */}
      <div className="about-weave" ref={weaveRef}>
        <svg
          className="about-weave__svg"
          viewBox="0 0 260 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="weave-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Arrow marker at convergence point */}
            <marker
              id="weave-arrow"
              viewBox="0 0 12 10"
              refX="11"
              refY="5"
              markerWidth="10"
              markerHeight="8"
              orient="auto"
            >
              <path d="M 0,0 L 12,5 L 0,10 Z" fill="#00FF41" />
            </marker>
          </defs>

          {/* ── Bloom layer (faint, blurred duplicates) ── */}
          <motion.path
            d={pathBranding}
            stroke="#00FF41"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
            opacity="0.08"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
          />
          <motion.path
            d={pathUiux}
            stroke="#00FF41"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
            opacity="0.06"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.6, ease: 'easeInOut', delay: 0.1 }}
          />
          <motion.path
            d={path3d}
            stroke="#00FF41"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
            opacity="0.04"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.6, ease: 'easeInOut', delay: 0.2 }}
          />

          {/* ── Main crisp paths ── */}
          <motion.path
            d={pathBranding}
            stroke="#00FF41"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            filter="url(#weave-glow)"
            markerEnd="url(#weave-arrow)"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
          />
          <motion.path
            d={pathUiux}
            stroke="rgba(0, 255, 65, 0.55)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            filter="url(#weave-glow)"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.1 }}
          />
          <motion.path
            d={path3d}
            stroke="rgba(0, 255, 65, 0.3)"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            filter="url(#weave-glow)"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.2 }}
          />

          {/* Convergence dot */}
          <motion.circle
            cx="245"
            cy="90"
            r="4"
            fill="#00FF41"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 1.5, duration: 0.4, ease: 'backOut' }}
          />
          <motion.circle
            cx="245"
            cy="90"
            r="8"
            fill="none"
            stroke="#00FF41"
            strokeWidth="1"
            opacity="0.3"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 0.3, scale: 1 } : {}}
            transition={{ delay: 1.6, duration: 0.4, ease: 'backOut' }}
          />
        </svg>

        {/* Discipline labels along the left edge */}
        {disciplines.map((d, i) => {
          const Icon = d.icon
          return (
            <motion.div
              key={i}
              className="about-weave__tag"
              style={{ top: `${(d.y / 180) * 100}%` }}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.4 }}
            >
              <span className="about-weave__tag-dot" style={{ background: d.color }} />
              <Icon size={10} style={{ color: d.color, flexShrink: 0 }} />
              <span className="about-weave__tag-text">{d.label}</span>
            </motion.div>
          )
        })}

        {/* "Unified" label at the convergence point */}
        <motion.div
          className="about-weave__converge"
          initial={{ opacity: 0, x: 8 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 1.7, duration: 0.4 }}
        >
          <span className="about-weave__converge-text">Today</span>
        </motion.div>
      </div>
    </BentoCard>
  )
}

/* ==========================================================================
   Card [D] — Professional Evolution  (8 cols)
   Edge-to-edge S-curve, triple bloom waves, floating glass pods
   ========================================================================== */

function AboutTimeline() {
  const waveRef = useRef(null)
  const isInView = useInView(waveRef, { once: true, margin: '-60px' })

  const journey = [
    { year: '2016', title: 'REAP APP',         desc: 'UI/UX Intern',              icon: Smartphone, above: true  },
    { year: '2017', title: 'OML Entertainment',desc: 'Event & Brand Design',      icon: Award,      above: false },
    { year: '2021', title: 'Viosimos United',  desc: 'UI/UX & Visual Designer',   icon: Monitor,    above: true  },
    { year: '2023', title: 'Red Ox Fashion',   desc: 'Lead Designer · Web & Brand', icon: Crown,    above: false },
    { year: 'Present', title: 'IVG',           desc: 'Senior Visual Designer',    icon: Briefcase,  above: true  },
  ]

  /*
   * SVG viewBox: 1000 × 280
   * Gentle wave — peaks at y=80, valleys at y=150 (70px amplitude).
   * Shifted upward so valley labels have ~130px of space below them.
   * Extends past both edges (-40 … 1040) for seamless continuity.
   */
  const wavePath =
    'M -40,150 C 30,150 60,80 120,80 C 180,80 210,150 280,150 C 350,150 380,80 460,80 C 540,80 570,150 660,150 C 750,150 780,80 860,80 C 920,80 950,150 1040,150'

  /* Offset bloom layers — ±8px vertical shift */
  const wavePathUp =
    'M -40,142 C 30,142 60,72 120,72 C 180,72 210,142 280,142 C 350,142 380,72 460,72 C 540,72 570,142 660,142 C 750,142 780,72 860,72 C 920,72 950,142 1040,142'
  const wavePathDown =
    'M -40,158 C 30,158 60,88 120,88 C 180,88 210,158 280,158 C 350,158 380,88 460,88 C 540,88 570,158 660,158 C 750,158 780,88 860,88 C 920,88 950,158 1040,158'

  /* Node positions matching the main path peaks/valleys */
  const nodes = [
    { x: 120, y: 80 },   /* 2016 — peak */
    { x: 280, y: 150 },  /* 2017 — valley */
    { x: 460, y: 80 },   /* 2021 — peak */
    { x: 660, y: 150 },  /* 2023 — valley */
    { x: 860, y: 80 },   /* Present — peak */
  ]

  return (
    <BentoCard className="about-timeline-v2" wrapperClass="bc-timeline" glow>
      <div className="about-label-row" style={{ marginBottom: '0.15rem' }}>
        <Briefcase size={14} className="about-icon" />
        <p className="about-micro-label">Professional Evolution</p>
      </div>

      {/* Mobile-only summary (hidden via CSS on desktop) */}
      <div className="about-timeline__mobile" aria-hidden="true">
        <span className="about-timeline__mobile-num">5+</span>
        <span className="about-timeline__mobile-label">Roles since 2016</span>
      </div>

      <div className="about-wave" ref={waveRef}>
        <svg
          className="about-wave__svg"
          viewBox="0 0 1000 280"
          fill="none"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Soft bloom filter */}
            <filter id="wave-bloom" x="-20%" y="-40%" width="140%" height="180%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Wide glow for offset waves */}
            <filter id="wave-outer-glow" x="-20%" y="-40%" width="140%" height="180%">
              <feGaussianBlur stdDeviation="14" />
            </filter>
          </defs>

          {/* ── Layer 1: Outermost bloom (widest, faintest) ── */}
          <motion.path
            d={wavePathUp}
            stroke="#00FF41"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            filter="url(#wave-outer-glow)"
            opacity="0.15"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 2.2, ease: 'easeInOut' }}
          />
          <motion.path
            d={wavePathDown}
            stroke="#00FF41"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            filter="url(#wave-outer-glow)"
            opacity="0.15"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 2.2, ease: 'easeInOut' }}
          />

          {/* ── Layer 2: Inner offset glow waves ── */}
          <motion.path
            d={wavePathUp}
            stroke="#00FF41"
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
            opacity="0.25"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 2.1, ease: 'easeInOut', delay: 0.05 }}
          />
          <motion.path
            d={wavePathDown}
            stroke="#00FF41"
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
            opacity="0.25"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 2.1, ease: 'easeInOut', delay: 0.05 }}
          />

          {/* ── Layer 3: Main crisp path ── */}
          <motion.path
            d={wavePath}
            stroke="#00FF41"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            filter="url(#wave-bloom)"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
        </svg>

        {/* ── Floating pods + labels ── */}
        {journey.map((item, i) => {
          const node = nodes[i]
          const isPresent = item.year === 'Present'
          const Icon = item.icon
          const left = `${(node.x / 1000) * 100}%`
          const top = `${(node.y / 280) * 100}%`

          return (
            <motion.div
              key={i}
              className="about-wave__node"
              style={{ left, top }}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                delay: (i * 2) / 5 + 0.4,
                duration: 0.5,
                ease: 'backOut',
              }}
            >
              {/* Glass pod */}
              <div
                className={
                  'about-wave__pod' + (isPresent ? ' about-wave__pod--active' : '')
                }
              >
                <Icon size={16} />
              </div>

              {/* Pulse rings for Present */}
              {isPresent && (
                <>
                  <span className="about-wave__pulse" aria-hidden="true" />
                  <span className="about-wave__pulse about-wave__pulse--d2" aria-hidden="true" />
                  <span className="about-wave__pulse about-wave__pulse--d3" aria-hidden="true" />
                </>
              )}

              {/* Text — alternates above / below the wave */}
              <div
                className={
                  'about-wave__label' +
                  (item.above ? ' about-wave__label--above' : ' about-wave__label--below')
                }
              >
                <span
                  className={
                    'about-wave__year' +
                    (isPresent ? ' about-wave__year--active' : '')
                  }
                >
                  {item.year}
                </span>
                <h4 className="about-wave__title">{item.title}</h4>
                <p className="about-wave__desc">{item.desc}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </BentoCard>
  )
}

/* ==========================================================================
   Card [F] — Creative Fuel  (4 cols, height = Card D)
   ========================================================================== */

function AboutSecret() {
  const hobbies = [
    { icon: <Camera size={20} />, name: 'Photography', detail: 'Capturing perspectives' },
    { icon: <Tv size={20} />, name: 'Anime', detail: 'Visual inspiration & style' },
    { icon: <Gamepad2 size={20} />, name: 'Gaming', detail: 'UI/UX & Interactive design' },
  ]

  return (
    <BentoCard className="about-secret" wrapperClass="bc-creative" glow>
      <p className="about-micro-label">The Secret Sauce</p>
      <h2 className="about-secret__heading">Creative Fuel</h2>
      <motion.ul
        className="about-secret__list"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      >
        {hobbies.map((h, i) => (
          <motion.li
            key={i}
            className="about-secret__item"
            variants={{
              hidden: { opacity: 0, y: 8 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <div className="about-secret__item-icon">{h.icon}</div>
            <div>
              <p className="about-secret__item-name">{h.name}</p>
              <p className="about-secret__item-detail">{h.detail}</p>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </BentoCard>
  )
}

/* ==========================================================================
   Section [E] — Tools  (3 × equal, full width)
   ========================================================================== */

function AboutToolGroup({ title, icon: Icon, skills, wrapperClass = '' }) {
  return (
    <BentoCard className="about-tools" wrapperClass={wrapperClass} glow>
      <div className="about-tools__header">
        <Icon size={18} className="about-icon" />
        <h3 className="about-tools__title">{title}</h3>
      </div>
      <div className="about-tools__list">
        {skills.map((s) => (
          <div key={s.name} className="about-tools__skill">
            <div className="about-tools__skill-meta">
              <span>{s.name}</span>
              <span>{s.level}/5</span>
            </div>
            <div className="about-tools__bar">
              <motion.div
                className="about-tools__bar-fill"
                initial={{ width: 0 }}
                whileInView={{ width: `${(s.level / 5) * 100}%` }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                viewport={{ once: true }}
              />
            </div>
          </div>
        ))}
      </div>
    </BentoCard>
  )
}

/* ==========================================================================
   Grid assembly
   ========================================================================== */

function About() {
  return (
    <section className="about" id="about">
      <div className="about__container">
        {/* Single grid — CSS controls desktop & mobile layouts via named areas */}
        <div className="about__grid">
          <AboutPortrait />
          <AboutOrigin />
          <AboutStats />
          <AboutTimeline />
          <AboutSecret />
          <AboutToolGroup
            wrapperClass="bc-adobe"
            title="Adobe Suite"
            icon={PenTool}
            skills={[
              { name: 'Photoshop', level: 5 },
              { name: 'Illustrator', level: 5 },
              { name: 'InDesign', level: 4.5 },
              { name: 'After Effects', level: 3.5 },
            ]}
          />
          <AboutToolGroup
            wrapperClass="bc-3d"
            title="3D Design"
            icon={Box}
            skills={[
              { name: 'Cinema 4D', level: 4 },
              { name: 'Blender', level: 3.5 },
              { name: 'Sketch', level: 4 },
              { name: 'Adobe Dimension', level: 4.5 },
            ]}
          />
          <AboutToolGroup
            wrapperClass="bc-ai"
            title="AI-Integrated Workflow"
            icon={Wand2}
            skills={[
              { name: 'Midjourney',  level: 5 },
              { name: 'Firefly',     level: 4.5 },
              { name: 'Claude Code', level: 4 },
              { name: 'Sora',        level: 3.5 },
            ]}
          />
        </div>
      </div>
    </section>
  )
}

export default About
