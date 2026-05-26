import { motion } from 'framer-motion'

/* ==========================================================================
   GradientDots — subtle animated hexagonal dot grid background
   Adapted from 21st.dev (TypeScript + Tailwind) → plain JS + inline styles
   Colours tuned to #08090C bg + #00FF41 accent palette
   ========================================================================== */

function GradientDots({
  dotSize = 8,
  spacing = 12,
  duration = 40,
  colorCycleDuration = 20,
  backgroundColor = '#08090C',
}) {
  const hexSpacing = spacing * 1.732

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        backgroundColor,
        backgroundImage: `
          radial-gradient(circle at 50% 50%, transparent 1.5px, ${backgroundColor} 0 ${dotSize}px, transparent ${dotSize}px),
          radial-gradient(circle at 50% 50%, transparent 1.5px, ${backgroundColor} 0 ${dotSize}px, transparent ${dotSize}px),
          radial-gradient(circle at 50% 50%, rgba(0, 255, 65, 0.12), transparent 60%),
          radial-gradient(circle at 50% 50%, rgba(90, 255, 21, 0.08), transparent 60%),
          radial-gradient(circle at 50% 50%, rgba(104, 183, 222, 0.06), transparent 60%),
          radial-gradient(ellipse at 50% 50%, rgba(0, 255, 65, 0.05), transparent 60%)
        `,
        backgroundSize: `
          ${spacing}px ${hexSpacing}px,
          ${spacing}px ${hexSpacing}px,
          200% 200%,
          200% 200%,
          200% 200%,
          200% ${hexSpacing}px
        `,
        backgroundPosition: `
          0px 0px, ${spacing / 2}px ${hexSpacing / 2}px,
          0% 0%,
          0% 0%,
          0% 0px
        `,
      }}
      animate={{
        backgroundPosition: [
          `0px 0px, ${spacing / 2}px ${hexSpacing / 2}px, 800% 400%, 1000% -400%, -1200% -600%, 400% ${hexSpacing}px`,
          `0px 0px, ${spacing / 2}px ${hexSpacing / 2}px, 0% 0%, 0% 0%, 0% 0%, 0% 0%`,
        ],
        filter: ['hue-rotate(0deg)', 'hue-rotate(360deg)'],
      }}
      transition={{
        backgroundPosition: {
          duration,
          ease: 'linear',
          repeat: Infinity,
        },
        filter: {
          duration: colorCycleDuration,
          ease: 'linear',
          repeat: Infinity,
        },
      }}
    />
  )
}

export default GradientDots
