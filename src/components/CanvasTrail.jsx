import { useEffect, useRef } from 'react'
import { renderCanvas } from './canvas'

function CanvasTrail() {
  // Guard against React 18 StrictMode double-invoking the effect in dev.
  // The imperative canvas module holds global state and attaches its own
  // document listeners, so we want renderCanvas() to run exactly once.
  const initRef = useRef(false)

  useEffect(() => {
    if (initRef.current) return
    initRef.current = true
    renderCanvas()
  }, [])

  return <canvas id="canvas" className="canvas-trail" aria-hidden="true" />
}

export default CanvasTrail
