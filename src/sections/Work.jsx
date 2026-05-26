import { useState, useEffect } from 'react'
import { ArrowUpRight, FolderOpen } from 'lucide-react'
import { RadialScrollGallery } from '../components/RadialScrollGallery'
import MobileWorkGallery from '../components/MobileWorkGallery'
import { featuredProjects, archiveProjects } from '../data/projects'
import '../styles/Work.css'

function Work({ onProjectClick, onArchiveOpen }) {
  /* ── Mobile detection — swap gallery below 768 px ── */
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < 768
  )

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <section className="work" id="work">
      <div className="work__header">
        <span className="work__label">Selected Work</span>
        <h2 className="work__heading">Projects</h2>
        <div className="work__scroll-hint">
          <span className="work__scroll-arrow" aria-hidden="true">↓</span>
          {isMobile ? 'Tap to explore' : 'Scroll to explore'}
        </div>
      </div>

      {/* ── Mobile: vertical accordion gallery ── */}
      {isMobile && (
        <MobileWorkGallery
          projects={featuredProjects}
          onProjectClick={onProjectClick}
        />
      )}

      {/* ── Desktop: GSAP radial wheel ── */}
      {!isMobile && (
        <RadialScrollGallery
          baseRadius={500}
          mobileRadius={220}
          visiblePercentage={48}
          scrollDuration={2500}
          direction="ltr"
          onItemSelect={(index) => onProjectClick(featuredProjects[index])}
        >
          {(hoveredIndex) =>
            featuredProjects.map((project, index) => {
              const isActive = hoveredIndex === index
              return (
                <div key={project.id} className="work__card-wrap">
                  <span className="work__plus work__plus--tl" aria-hidden="true">+</span>
                  <span className="work__plus work__plus--tr" aria-hidden="true">+</span>
                  <span className="work__plus work__plus--bl" aria-hidden="true">+</span>
                  <span className="work__plus work__plus--br" aria-hidden="true">+</span>
                  <div
                    className={
                      'work__card' +
                      (project.featured ? ' work__card--featured' : '')
                    }
                  >
                    <div className="work__card-thumb">
                      <img
                        src={project.thumb}
                        alt={project.title}
                        loading="lazy"
                        onError={(e) => { e.target.style.display = 'none' }}
                      />
                      <div
                        className="work__card-arrow"
                        style={{ opacity: isActive ? 1 : 0 }}
                      >
                        <ArrowUpRight size={12} />
                      </div>
                      <div
                        className="work__card-hint"
                        style={{ opacity: isActive ? 1 : 0 }}
                      >
                        Click to view more
                      </div>
                    </div>
                    <div className="work__card-info">
                      <h3 className="work__card-title">
                        {project.title}
                        <span
                          className="work__card-underline"
                          style={{ width: isActive ? '100%' : '0%' }}
                        />
                      </h3>
                      <p className="work__card-category">{project.category}</p>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </RadialScrollGallery>
      )}

      {/* ── Archive CTA — sits below both gallery types ── */}
      <div className="work__archive-cta-wrap">
        <button
          type="button"
          className="work__archive-cta"
          onClick={onArchiveOpen}
          aria-label="Open the project archive"
        >
          <FolderOpen size={14} strokeWidth={2} />
          <span>
            Explore the Archive
            <span className="work__archive-cta-count">
              · {archiveProjects.length} more projects
            </span>
          </span>
          <ArrowUpRight size={14} strokeWidth={2.2} />
        </button>
      </div>
    </section>
  )
}

export default Work
