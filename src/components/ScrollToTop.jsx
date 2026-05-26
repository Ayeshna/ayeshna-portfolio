import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import '../styles/ScrollToTop.css'

/* ==========================================================================
   ScrollToTop
   Reusable floating "back to top" pill.
   – Pass a `scrollerRef` to track a custom container (e.g. overlay body)
   – No props → tracks window scroll (default behaviour for the main page)
   – Appears after the user crosses `threshold` (default 0.5 = halfway)
   ========================================================================== */

function ScrollToTop({ scrollerRef = null, threshold = 0.5 }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const isWindow = !scrollerRef
    const el = isWindow ? window : scrollerRef.current
    if (!el) return

    const handler = () => {
      const target = isWindow ? scrollerRef?.current : scrollerRef.current
      const scrollTop  = isWindow ? window.scrollY : el.scrollTop
      const maxScroll  = isWindow
        ? document.documentElement.scrollHeight - window.innerHeight
        : el.scrollHeight - el.clientHeight

      if (maxScroll <= 0) {
        setVisible(false)
        return
      }
      setVisible(scrollTop / maxScroll >= threshold)
    }

    el.addEventListener('scroll', handler, { passive: true })
    handler()  /* initial check */
    return () => el.removeEventListener('scroll', handler)
  }, [scrollerRef, threshold])

  const handleClick = () => {
    const target = !scrollerRef ? window : scrollerRef.current
    if (!target) return
    target.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      className={`scroll-top${visible ? ' scroll-top--visible' : ''}`}
      onClick={handleClick}
      aria-label="Scroll to top"
      tabIndex={visible ? 0 : -1}
    >
      <ArrowUp size={18} strokeWidth={2.2} />
    </button>
  )
}

export default ScrollToTop
