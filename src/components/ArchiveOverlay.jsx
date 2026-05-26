import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { archiveProjects } from '../data/projects'
import '../styles/ArchiveOverlay.css'

/* ==========================================================================
   ArchiveOverlay
   Full-screen grid of the 6 archive projects (the non-featured ones).
   Mirrors the ProjectOverlay open/close pattern so users feel at home.
   Tapping any card calls onProjectClick(project), which opens the standard
   ProjectOverlay for that project — no case-study hero (those are reserved
   for the featured 5).
   ========================================================================== */

function ArchiveOverlay({ onClose, onProjectClick }) {
  const backdropRef = useRef(null)

  /* Body scroll lock */
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  /* ESC to close */
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  /* Open transition */
  useEffect(() => {
    requestAnimationFrame(() => {
      backdropRef.current?.classList.add('archive--open')
    })
  }, [])

  const handleClose = () => {
    backdropRef.current?.classList.remove('archive--open')
    setTimeout(onClose, 200)
  }

  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current) handleClose()
  }

  return (
    <div
      className="archive"
      ref={backdropRef}
      onClick={handleBackdropClick}
    >
      <div className="archive__frame">
        <span className="archive__plus archive__plus--tl" aria-hidden="true">+</span>
        <span className="archive__plus archive__plus--tr" aria-hidden="true">+</span>
        <span className="archive__plus archive__plus--bl" aria-hidden="true">+</span>
        <span className="archive__plus archive__plus--br" aria-hidden="true">+</span>

        <div className="archive__container">

          {/* Header */}
          <div className="archive__header">
            <div className="archive__header-text">
              <span className="archive__label">The Archive</span>
              <h2 className="archive__title">More Work</h2>
              <p className="archive__sub">
                {archiveProjects.length} additional projects · brand, packaging &amp; campaigns
              </p>
            </div>
            <button
              className="archive__close"
              onClick={handleClose}
              aria-label="Close archive"
              type="button"
            >
              ×
            </button>
          </div>

          {/* Grid of archive cards */}
          <div className="archive__grid">
            {archiveProjects.map((project) => (
              <button
                key={project.id}
                type="button"
                className="archive__card"
                onClick={() => {
                  onProjectClick(project)
                  handleClose()
                }}
                aria-label={`Open ${project.title}`}
              >
                <span className="archive__card-plus archive__card-plus--tl" aria-hidden="true">+</span>
                <span className="archive__card-plus archive__card-plus--tr" aria-hidden="true">+</span>
                <span className="archive__card-plus archive__card-plus--bl" aria-hidden="true">+</span>
                <span className="archive__card-plus archive__card-plus--br" aria-hidden="true">+</span>

                <div className="archive__card-thumb">
                  <img
                    src={project.thumb}
                    alt={project.title}
                    loading="lazy"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                  <div className="archive__card-scrim" />
                </div>

                <div className="archive__card-info">
                  <div className="archive__card-text">
                    <h3 className="archive__card-title">{project.title}</h3>
                    <p className="archive__card-category">{project.category}</p>
                  </div>
                  <div className="archive__card-arrow">
                    <ArrowUpRight size={14} strokeWidth={2.2} />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArchiveOverlay
