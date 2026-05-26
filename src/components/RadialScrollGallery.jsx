import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, {
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import './RadialScrollGallery.css'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

function useMergeRefs(...refs) {
  return useMemo(() => {
    if (refs.every((ref) => ref == null)) return null
    return (node) => {
      refs.forEach((ref) => {
        if (typeof ref === 'function') {
          ref(node)
        } else if (ref != null) {
          ref.current = node
        }
      })
    }
  }, [refs])
}

function useResponsiveValue(baseValue, mobileValue) {
  const [value, setValue] = useState(baseValue)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleResize = () => {
      setValue(window.innerWidth < 768 ? mobileValue : baseValue)
    }

    handleResize()

    let timeoutId
    const debouncedResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(handleResize, 100)
    }

    window.addEventListener('resize', debouncedResize)
    return () => {
      window.removeEventListener('resize', debouncedResize)
      clearTimeout(timeoutId)
    }
  }, [baseValue, mobileValue])

  return value
}

export const RadialScrollGallery = forwardRef(
  (
    {
      children,
      scrollDuration = 2500,
      visiblePercentage = 45,
      baseRadius = 550,
      mobileRadius = 220,
      className = '',
      startTrigger = 'center center',
      onItemSelect,
      direction = 'ltr',
      disabled = false,
      ...rest
    },
    ref
  ) => {
    const pinRef = useRef(null)
    const containerRef = useRef(null)
    const childRef = useRef(null)

    const mergedRef = useMergeRefs(ref, pinRef)

    const [hoveredIndex, setHoveredIndex] = useState(null)
    const [childSize, setChildSize] = useState(null)
    const [isMounted, setIsMounted] = useState(false)

    const currentRadius = useResponsiveValue(baseRadius, mobileRadius)
    const circleDiameter = currentRadius * 2

    const { visibleDecimal, hiddenDecimal } = useMemo(() => {
      const clamped = Math.max(10, Math.min(100, visiblePercentage))
      const v = clamped / 100
      return { visibleDecimal: v, hiddenDecimal: 1 - v }
    }, [visiblePercentage])

    const childrenNodes = useMemo(
      () => React.Children.toArray(children(hoveredIndex)),
      [children, hoveredIndex]
    )
    const childrenCount = childrenNodes.length

    useEffect(() => {
      setIsMounted(true)

      if (!childRef.current) return

      const observer = new ResizeObserver((entries) => {
        let hasChanged = false
        for (const entry of entries) {
          setChildSize({
            w: entry.contentRect.width,
            h: entry.contentRect.height,
          })
          hasChanged = true
        }
        if (hasChanged) {
          ScrollTrigger.refresh()
        }
      })

      observer.observe(childRef.current)
      return () => observer.disconnect()
    }, [childrenCount])

    useGSAP(
      () => {
        if (!pinRef.current || !containerRef.current || childrenCount === 0)
          return

        const prefersReducedMotion = window.matchMedia(
          '(prefers-reduced-motion: reduce)'
        ).matches

        if (!prefersReducedMotion) {
          gsap.fromTo(
            containerRef.current.children,
            { scale: 0, autoAlpha: 0 },
            {
              scale: 1,
              autoAlpha: 1,
              duration: 1.2,
              ease: 'back.out(1.2)',
              stagger: 0.05,
              scrollTrigger: {
                trigger: pinRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          )

          gsap.to(containerRef.current, {
            rotation: 360,
            ease: 'none',
            scrollTrigger: {
              trigger: pinRef.current,
              pin: true,
              start: startTrigger,
              end: `+=${scrollDuration}`,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          })
        }
      },
      {
        scope: pinRef,
        dependencies: [
          scrollDuration,
          currentRadius,
          startTrigger,
          childrenCount,
        ],
      }
    )

    if (childrenCount === 0) return null

    const scaleFactor = 1.25
    const calculatedBuffer = childSize
      ? childSize.h * scaleFactor - childSize.h + 60
      : 150

    const visibleAreaHeight = childSize
      ? circleDiameter * visibleDecimal + childSize.h / 2 + calculatedBuffer
      : circleDiameter * visibleDecimal + 200

    return (
      <div
        ref={mergedRef}
        className={`rsg-root ${className}`}
        {...rest}
      >
        <div
          className="rsg-mask"
          style={{
            height: `${visibleAreaHeight}px`,
            maskImage:
              'linear-gradient(to top, transparent 0%, black 40%, black 100%)',
            WebkitMaskImage:
              'linear-gradient(to top, transparent 0%, black 40%, black 100%)',
          }}
        >
          <ul
            ref={containerRef}
            className="rsg-wheel"
            dir={direction}
            style={{
              width: circleDiameter,
              height: circleDiameter,
              bottom: -(circleDiameter * hiddenDecimal),
              opacity: disabled ? 0.5 : isMounted ? 1 : 0,
              pointerEvents: disabled ? 'none' : 'auto',
              filter: disabled ? 'grayscale(1)' : 'none',
            }}
          >
            {childrenNodes.map((child, index) => {
              const angle = (index / childrenCount) * 2 * Math.PI
              let x = currentRadius * Math.cos(angle)
              const y = currentRadius * Math.sin(angle)

              if (direction === 'rtl') {
                x = -x
              }

              const rotationAngle = (angle * 180) / Math.PI
              const isHovered = hoveredIndex === index
              const isAnyHovered = hoveredIndex !== null

              return (
                <li
                  key={index}
                  ref={index === 0 ? childRef : null}
                  className="rsg-item"
                  style={{
                    zIndex: isHovered ? 100 : 10,
                    transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) rotate(${
                      rotationAngle + 90
                    }deg)`,
                  }}
                >
                  <div
                    role="button"
                    tabIndex={disabled ? -1 : 0}
                    onClick={() => !disabled && onItemSelect?.(index)}
                    onKeyDown={(e) => {
                      if (disabled) return
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        onItemSelect?.(index)
                      }
                    }}
                    onMouseEnter={() => !disabled && setHoveredIndex(index)}
                    onMouseLeave={() => !disabled && setHoveredIndex(null)}
                    onFocus={() => !disabled && setHoveredIndex(index)}
                    onBlur={() => !disabled && setHoveredIndex(null)}
                    className="rsg-item-inner"
                    style={{
                      transform: isHovered
                        ? 'scale(1.25) translateY(-8px)'
                        : 'scale(1)',
                      filter:
                        isAnyHovered && !isHovered
                          ? 'blur(2px) grayscale(1)'
                          : 'blur(0) grayscale(0)',
                      opacity: isAnyHovered && !isHovered ? 0.4 : 1,
                    }}
                  >
                    {child}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
)

RadialScrollGallery.displayName = 'RadialScrollGallery'
