import { useEffect, useRef, useState, useCallback } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import '../styles/ProjectOverlay.css'
import IvgHomepageContent from './IvgHomepageContent'
import ScrollToTop from './ScrollToTop'
import CaseStudyHero from './CaseStudyHero'
import { getCaseStudy } from '../data/caseStudies'

/* ==========================================================================
   ProjectOverlay
   – Video-first for ivg-bespoke, ivg-homepage, viosimos
   – ivg-bespoke carries audio → floating mute/unmute toggle in video corner
   – All other videos stay permanently muted
   – Cursor-following "Scroll to Explore" hint (fades after 60 px of scroll)
   – Vertical #00FF41 progress bar (tracks combined video + image height)
   ========================================================================== */

function ProjectOverlay({ project, onClose }) {
  const backdropRef = useRef(null)
  const bodyRef     = useRef(null)
  const videoRef    = useRef(null)

  const [cursor, setCursor]           = useState({ x: -300, y: -300 })
  const [hintOpacity, setHintOpacity] = useState(1)
  const [progress, setProgress]       = useState(0)

  /* Audio toggle — starts muted so autoplay is never blocked */
  const [isMuted, setIsMuted] = useState(true)

  const hasVideo  = Boolean(project?.video)
  const hasAudio  = Boolean(project?.hasAudio)
  const caseStudy = project ? getCaseStudy(project.slug) : null

  /* ── Sync React muted state → video element
     React's `muted` prop is set only on mount and ignored on updates,
     so we drive it imperatively via a ref.                           ── */
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted
    }
  }, [isMuted])

  /* Reset muted to true every time a new project opens */
  useEffect(() => {
    setIsMuted(true)
  }, [project?.id])

  /* ── Body scroll lock ── */
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  /* ── ESC to close ── */
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  /* ── Enter animation ── */
  useEffect(() => {
    requestAnimationFrame(() => {
      backdropRef.current?.classList.add('overlay--open')
    })
  }, [])

  /* ── Cursor tracking ── */
  const handleMouseMove = useCallback((e) => {
    setCursor({ x: e.clientX, y: e.clientY })
  }, [])

  /* ── Scroll: progress bar + hint fade ── */
  const handleBodyScroll = useCallback(() => {
    const el = bodyRef.current
    if (!el) return
    const scrolled  = el.scrollTop
    const maxScroll = el.scrollHeight - el.clientHeight
    setProgress(maxScroll > 0 ? (scrolled / maxScroll) * 100 : 0)
    setHintOpacity(scrolled > 60 ? 0 : 1 - scrolled / 60)
  }, [])

  const handleClose = () => {
    backdropRef.current?.classList.remove('overlay--open')
    setTimeout(onClose, 200)
  }

  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current) handleClose()
  }

  if (!project) return null

  return (
    <div
      className="overlay"
      ref={backdropRef}
      onClick={handleBackdropClick}
      onMouseMove={handleMouseMove}
    >
      {/* ── Floating cursor hint (z-index 1100, above everything) ── */}
      <div
        className="overlay__scroll-hint"
        style={{ left: cursor.x, top: cursor.y, opacity: hintOpacity }}
        aria-hidden="true"
      >
        <span className="overlay__scroll-hint-arrow">↓</span>
        Scroll to Explore
      </div>

      {/* ── Modal frame (centres + anchors plus marks) ── */}
      <div className="overlay__frame">
        <span className="overlay__plus overlay__plus--tl" aria-hidden="true">+</span>
        <span className="overlay__plus overlay__plus--tr" aria-hidden="true">+</span>
        <span className="overlay__plus overlay__plus--bl" aria-hidden="true">+</span>
        <span className="overlay__plus overlay__plus--br" aria-hidden="true">+</span>

      {/* ── Modal ── */}
      <div className="overlay__container">

        {/* Vertical progress bar (z-index 10, above body content) */}
        <div className="overlay__progress" aria-hidden="true">
          <div className="overlay__progress-fill" style={{ height: `${progress}%` }} />
        </div>

        {/* Header */}
        <div className="overlay__header">
          <div className="overlay__header-text">
            <h2 className="overlay__title">{project.title}</h2>
            <span className="overlay__category">{project.category}</span>
          </div>
          {hasVideo && (
            <span className="overlay__video-badge" aria-label="Contains video">
              ▶ VIDEO
            </span>
          )}
          <button
            className="overlay__close"
            onClick={handleClose}
            aria-label="Close project"
            type="button"
          >
            ×
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overlay__body" ref={bodyRef} onScroll={handleBodyScroll}>

          {/* ── CASE STUDY HERO — only for the 5 featured projects ── */}
          {caseStudy && <CaseStudyHero data={caseStudy} />}

          {/* ── VIDEO HERO — only for the 3 video projects ── */}
          {hasVideo && (
            <div className="overlay__video-wrap">
              <video
                ref={videoRef}
                className="overlay__video"
                src={project.video}
                autoPlay
                muted        /* initial attribute — kept muted for autoplay compliance */
                loop
                playsInline
              />

              {/* ── Mute / Unmute toggle — only for bespoke (hasAudio) ── */}
              {hasAudio && (
                <button
                  className="overlay__audio-toggle"
                  onClick={() => setIsMuted((prev) => !prev)}
                  aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                  type="button"
                >
                  {isMuted
                    ? <VolumeX size={16} strokeWidth={1.8} />
                    : <Volume2 size={16} strokeWidth={1.8} />
                  }
                </button>
              )}
            </div>
          )}

          {/* ── CONTENT — custom component for ivg-homepage, image for others ── */}
          {project.slug === 'ivg-homepage'
            ? <IvgHomepageContent />
            : <img
                src={project.project}
                alt={`${project.title} — project detail`}
                className="overlay__image"
                onError={(e) => { e.target.style.display = 'none' }}
              />
          }

        </div>

        {/* Floating scroll-to-top — scrolls the overlay body, not the page */}
        <ScrollToTop scrollerRef={bodyRef} />
      </div>
      </div>{/* end overlay__frame */}
    </div>
  )
}

export default ProjectOverlay
