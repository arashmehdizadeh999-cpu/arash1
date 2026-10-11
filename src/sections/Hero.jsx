import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

/**
 * Scroll-Driven Video Hero — کابینتو
 *
 * The user's vertical scroll position directly controls the video's timeline.
 * The video never autoplays — it is SCRUBBED via `video.currentTime`.
 *
 * Architecture:
 *   - `.hero-scroll` is a tall container (300vh) that creates scroll distance.
 *   - `.hero-scroll-sticky` is a 100vh sticky viewport pinned at top: 0.
 *   - A passive scroll listener only computes `targetTime` (cheap).
 *   - A single `requestAnimationFrame` loop interpolates `currentTime` toward
 *     `targetTime` with a smoothing factor, then writes `video.currentTime`.
 *   - No React state is used during scrolling — all updates go through refs.
 *
 * Video encoding notes (for smooth random-access seeking):
 *   - Prefer H.264 MP4 with web-optimized moov atom (fast-start)
 *   - Frequent keyframes (every 1-2s) for fast seeking
 *   - Reasonable bitrate, 1080p or lower
 *   - A WebM/VP9 alternate source can be added for Chromium browsers
 */

const HERO_VIDEO_URL =
  'https://media.base44.com/videos/public/6aca4bfee62bdb89b7fe8afc/611cc41f3_video5933651173742485564.mp4'
const HERO_FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=80'

const HERO_SCROLL_VH = 300       // total scroll distance for the hero section
const SMOOTHING = 0.15           // interpolation factor (higher = more responsive, lower = smoother)
const MIN_SEEK_DELTA = 0.016    // ~1 frame at 60fps — skip seeks smaller than this

export default function Hero() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const contentRef = useRef(null)
  const scrollIndicatorRef = useRef(null)

  const [videoReady, setVideoReady] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  // Detect prefers-reduced-motion once on mount
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Main scroll-driven video scrubbing effect
  useEffect(() => {
    if (reducedMotion) return

    const video = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    let targetTime = 0
    let currentTime = 0
    let duration = 0
    let rafId = null
    let animationStarted = false

    // Compute scroll progress (0→1) and update target time + text opacity.
    // Called from the passive scroll listener — must stay cheap.
    const updateTarget = () => {
      const rect = section.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      if (scrollable <= 0) return

      const progress = Math.max(0, Math.min(1, -rect.top / scrollable))
      targetTime = progress * duration

      // Fade hero text + scroll indicator during the first ~25% of scroll
      const textOpacity = Math.max(0, 1 - progress * 4)
      const textY = progress * 60
      if (contentRef.current) {
        contentRef.current.style.opacity = String(textOpacity)
        contentRef.current.style.transform = `translateY(${textY}px)`
      }
      if (scrollIndicatorRef.current) {
        scrollIndicatorRef.current.style.opacity = String(textOpacity)
      }
    }

    // rAF loop — smooth interpolation + seek. This is the ONLY place
    // we write video.currentTime, preventing seek flooding.
    const tick = () => {
      const diff = targetTime - currentTime
      if (Math.abs(diff) > MIN_SEEK_DELTA) {
        currentTime += diff * SMOOTHING
        currentTime = Math.max(0, Math.min(currentTime, duration))
        video.currentTime = currentTime
      } else if (Math.abs(diff) > 0.001) {
        currentTime = targetTime
        video.currentTime = currentTime
      }
      rafId = requestAnimationFrame(tick)
    }

    const start = () => {
      if (animationStarted) return
      duration = video.duration
      if (!duration || !isFinite(duration)) {
        // Can't scrub without a valid duration — fall back to image
        setVideoFailed(true)
        return
      }
      animationStarted = true
      setVideoReady(true)
      // Show first frame immediately
      video.currentTime = 0
      currentTime = 0
      updateTarget()
      rafId = requestAnimationFrame(tick)
    }

    const onScroll = () => updateTarget()
    const onResize = () => updateTarget()

    // Wait for first frame + metadata before starting
    if (video.readyState >= 2) {
      // HAVE_CURRENT_DATA or higher — metadata + first frame available
      start()
    } else {
      video.addEventListener('loadeddata', start, { once: true })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      video.removeEventListener('loadeddata', start)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [reducedMotion])

  const handleVideoError = () => {
    setVideoFailed(true)
    setVideoReady(true) // hide loading state, show fallback
  }

  const showVideo = !reducedMotion && !videoFailed
  const sectionHeight = reducedMotion ? '100vh' : `${HERO_SCROLL_VH}vh`

  return (
    <section
      className="hero-scroll"
      ref={sectionRef}
      style={{ height: sectionHeight }}
    >
      <div className="hero-scroll-sticky">
        {/* Video background — no autoplay, no loop, scroll-controlled */}
        {showVideo && (
          <video
            ref={videoRef}
            className={`hero-video ${videoReady ? 'hero-video--ready' : ''}`}
            src={HERO_VIDEO_URL}
            poster={HERO_FALLBACK_IMAGE}
            preload="auto"
            muted
            playsInline
            aria-hidden="true"
            onError={handleVideoError}
          />
        )}

        {/* Fallback image (reduced motion or video failure) */}
        {(reducedMotion || videoFailed) && (
          <div
            className="hero-bg"
            style={{ backgroundImage: `url('${HERO_FALLBACK_IMAGE}')` }}
          />
        )}

        {/* Subtle gradient for text readability — video remains dominant */}
        <div className="hero-overlay" />

        {/* Minimal loading indicator */}
        {showVideo && !videoReady && (
          <div className="hero-loading">
            <div className="hero-loading-bar" />
          </div>
        )}

        {/* Hero content — fades out as user scrolls */}
        <div className="hero-content container" ref={contentRef}>
          <span className="hero-eyebrow">کابینتو — طراحی معمارانه آشپزخانه</span>
          <h1 className="hero-title">
            آشپزخانه‌ای<br />فراتر از انتظار
          </h1>
          <p className="hero-subtitle">
            طراحی، ساخت و اجرای کابینت‌های سفارشی با نگاهی معمارانه به جزئیات، متریال و زیبایی.
          </p>
          <div className="hero-actions">
            <Link to="/portfolio" className="btn btn-primary">مشاهده نمونه‌کارها</Link>
            <Link to="/consultation" className="btn btn-outline">شروع سفارش اختصاصی</Link>
          </div>
          <div className="hero-label">
            <span className="label-line" />
            <span>کالکسیون تانگو مینیمال — TG-ML-01</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator" ref={scrollIndicatorRef}>
          <span className="scroll-text">اسکرول کنید</span>
          <span className="scroll-line" />
        </div>
      </div>
    </section>
  )
}
