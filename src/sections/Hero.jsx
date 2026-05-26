import logoWhite from '../assets/Logos/AV LOGO WHITE.png'
import '../styles/Hero.css'

function Hero() {
  return (
    <>
      <nav className="hero-nav">
        <a href="#top" className="hero-nav__brand">
          <img src={logoWhite} alt="Ayeshna Vinayak" />
          <span>Ayeshna Vinayak</span>
        </a>
        <ul className="hero-nav__links">
          <li>
            <a href="#work">Work</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>

      <section className="hero" id="top">
        <div className="hero__vignette" aria-hidden="true" />

        <div className="hero__inner">
          <div className="hero__pill">
            <span className="hero__dot" aria-hidden="true" />
            7+ years building brand systems where identity, product and motion converge.
          </div>

          <div className="hero__frame">
            <div className="hero__name-block">
              <span className="hero__corner hero__corner--tl" aria-hidden="true">
                +
              </span>
              <span className="hero__corner hero__corner--tr" aria-hidden="true">
                +
              </span>
              <span className="hero__corner hero__corner--bl" aria-hidden="true">
                +
              </span>
              <span className="hero__corner hero__corner--br" aria-hidden="true">
                +
              </span>
              <h1 className="hero__name">
                <span className="hero__name-line">AYESHNA</span>
                <span className="hero__name-line hero__name-line--accent">
                  VINAYAK
                </span>
              </h1>
            </div>

            <p className="hero__subtitle">Senior Visual Designer</p>

            <div className="hero__tags">
              {/* Core capabilities — what hiring CDs look for in a Senior Visual Designer */}
              <span className="hero__tag hero__tag--core">Brand Systems</span>
              <span className="hero__tag hero__tag--core">Product &amp; UI</span>
              <span className="hero__tag hero__tag--core">3D · Cinema 4D</span>
              <span className="hero__tag hero__tag--core">Motion</span>
              <span className="hero__tag hero__tag--core">Gaming UI</span>
              {/* Specialist tools / multipliers */}
              <span className="hero__tag hero__tag--secondary">Art Direction</span>
              <span className="hero__tag hero__tag--secondary">Packaging</span>
              <span className="hero__tag hero__tag--secondary">AI-Integrated Workflow</span>
            </div>
          </div>

          <div className="hero__cta">
            <a href="#work" className="hero__btn hero__btn--primary">
              View my work
              <svg className="hero__btn-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 3v10M3 9l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="hero__scroll" aria-hidden="true">
          <span className="hero__scroll-line" />
        </div>
      </section>
    </>
  )
}

export default Hero
