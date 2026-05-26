import { useState, useEffect } from 'react'
import {
  Megaphone, Film, Monitor, Package, Award,
  Globe, PenTool, Box, Layers, ArrowUpRight,
} from 'lucide-react'
import '../styles/MobileWorkGallery.css'

/* ==========================================================================
   MobileWorkGallery
   Vertical expanding accordion — replaces the GSAP radial wheel on mobile.
   – Tap a collapsed card  → it expands (bigger thumbnail preview)
   – Tap the "Open Project" CTA → opens the ProjectOverlay
   ========================================================================== */

const CATEGORY_ICONS = {
  'Launch Marketing Campaign':        Megaphone,
  'Bespoke Media & Cinema Ads':       Film,
  'UI Redesign':                      Monitor,
  'Merchandise & Lifestyle Packaging': Package,
  'Branding, Marketing & Merch':      Award,
  'Branding & Web Marketing':         Globe,
  'Branding':                         PenTool,
  'Branding & Packaging':             Box,
  'Rebranding & Web Design':          Layers,
}

function MobileWorkGallery({ projects, onProjectClick }) {
  const [activeIndex, setActiveIndex]   = useState(0)
  const [animated, setAnimated]         = useState([])

  /* Staggered entrance — each card slides up in turn */
  useEffect(() => {
    const timers = projects.map((_, i) =>
      setTimeout(() => setAnimated(prev => [...prev, i]), 60 * i)
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  const handleTap = (index) => {
    if (index === activeIndex) {
      /* Second tap on already-active card → open overlay */
      onProjectClick(projects[index])
    } else {
      setActiveIndex(index)
    }
  }

  return (
    <div className="mgallery">
      {projects.map((project, index) => {
        const isActive = activeIndex === index
        const Icon     = CATEGORY_ICONS[project.category] || ArrowUpRight

        return (
          <div
            key={project.id}
            className={`mgallery__item${isActive ? ' mgallery__item--active' : ''}`}
            style={{
              backgroundImage: `url(${project.thumb})`,
              opacity:   animated.includes(index) ? 1 : 0,
              transform: animated.includes(index) ? 'translateY(0)' : 'translateY(16px)',
            }}
            onClick={() => handleTap(index)}
          >
            {/* Gradient scrim — stronger when collapsed so text stays readable */}
            <div className={`mgallery__scrim${isActive ? ' mgallery__scrim--active' : ''}`} />

            {/* Bottom label row */}
            <div className="mgallery__label">

              {/* Icon pill */}
              <div className="mgallery__icon">
                <Icon size={15} />
              </div>

              {/* Title + category */}
              <div className="mgallery__text">
                <span className="mgallery__title">{project.title}</span>
                <span
                  className="mgallery__category"
                  style={{
                    opacity:   isActive ? 1 : 0,
                    transform: isActive ? 'translateY(0)' : 'translateY(6px)',
                  }}
                >
                  {project.category}
                </span>
              </div>

              {/* "Open Project" CTA — only on active */}
              <button
                className="mgallery__cta"
                style={{
                  opacity:   isActive ? 1 : 0,
                  transform: isActive ? 'translateX(0)' : 'translateX(12px)',
                  pointerEvents: isActive ? 'auto' : 'none',
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  onProjectClick(project)
                }}
                aria-label={`Open ${project.title}`}
              >
                Open <ArrowUpRight size={11} strokeWidth={2.2} />
              </button>
            </div>

            {/* Video badge */}
            {project.video && (
              <span
                className="mgallery__video-badge"
                style={{ opacity: isActive ? 1 : 0 }}
              >
                ▶ VIDEO
              </span>
            )}

            {/* Featured accent line */}
            {project.featured && (
              <div className="mgallery__featured-line" />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default MobileWorkGallery
