import '../styles/IvgHomepageContent.css'

const BASE = '/assets/projects/ivg-homepage'

function IvgHomepageContent() {
  return (
    <div className="ivg">

      {/* ── 01 PROJECT HEADER ── */}
      <section className="ivg__header">
        <div className="ivg__header-eyebrow">Case Study</div>
        <h2 className="ivg__header-title">IVG Homepage<br /><span>Redesign</span></h2>
        <p className="ivg__header-desc">
          A complete UI redesign of IVG's flagship e-commerce homepage — bringing
          award-winning vape products to life through bold visuals, intuitive
          navigation, and purposeful motion design.
        </p>
        <div className="ivg__meta">
          <div className="ivg__meta-item">
            <span className="ivg__meta-label">Role</span>
            <span className="ivg__meta-value">UI Design</span>
          </div>
          <div className="ivg__meta-item">
            <span className="ivg__meta-label">Tools</span>
            <span className="ivg__meta-value">Figma</span>
          </div>
          <div className="ivg__meta-item">
            <span className="ivg__meta-label">Type</span>
            <span className="ivg__meta-value">E-Commerce Homepage</span>
          </div>
          <div className="ivg__meta-item">
            <span className="ivg__meta-label">Year</span>
            <span className="ivg__meta-value">2025</span>
          </div>
        </div>
      </section>

      <div className="ivg__divider" />

      {/* ── 02 WIREFRAME ── */}
      <section className="ivg__section ivg__section--dark">
        <div className="ivg__label">01 — Structure</div>
        <h3 className="ivg__heading">Wireframe</h3>
        <p className="ivg__subtext">
          Before any colour or imagery, the page was mapped structurally —
          establishing hierarchy, scroll rhythm, and content density across
          14 distinct sections.
        </p>
        <div className="ivg__wf-grid">
          <img src={`${BASE}/wf-01-header-hero.png`} alt="Wireframe: Header and Hero" className="ivg__wf-full" />
          <img src={`${BASE}/wf-02-categories.png`} alt="Wireframe: Categories" />
          <img src={`${BASE}/wf-03-latest- products.png`} alt="Wireframe: Latest Products" />
          <img src={`${BASE}/wf-04-best-sellers.png`} alt="Wireframe: Best Sellers" />
          <img src={`${BASE}/wf-05-testimonials.png`} alt="Wireframe: Testimonials" />
          <img src={`${BASE}/wf-06-awards.png`} alt="Wireframe: Awards" />
          <img src={`${BASE}/wf-07-verify-why.png`} alt="Wireframe: Verify and Why" />
          <img src={`${BASE}/wf-08-blogs.png`} alt="Wireframe: Blogs" className="ivg__wf-wide" />
          <img src={`${BASE}/wf-09-newsletter-footer.png`} alt="Wireframe: Footer" />
        </div>
      </section>

      <div className="ivg__divider" />

      {/* ── 03 WIREFRAME TO FINAL ── */}
      <section className="ivg__section">
        <div className="ivg__label">02 — Transformation</div>
        <h3 className="ivg__heading">Wireframe to Final</h3>
        <p className="ivg__subtext">
          From greyscale structure to full-colour design — each section was
          refined with brand identity, product photography, and micro-interactions.
        </p>

        {/* Hero */}
        <div className="ivg__comparison">
          <div className="ivg__comparison-label">Hero Banner</div>
          <div className="ivg__comparison-grid">
            <div className="ivg__comparison-card">
              <span className="ivg__badge ivg__badge--wire">Wireframe</span>
              <img src={`${BASE}/wf-01-header-hero.png`} alt="Wireframe: Hero" />
            </div>
            <div className="ivg__comparison-card">
              <span className="ivg__badge ivg__badge--final">Final</span>
              <img src={`${BASE}/hero-crop.png`} alt="Final: Hero" />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="ivg__comparison">
          <div className="ivg__comparison-label">Product Categories</div>
          <div className="ivg__comparison-grid">
            <div className="ivg__comparison-card">
              <span className="ivg__badge ivg__badge--wire">Wireframe</span>
              <img src={`${BASE}/wf-02-categories.png`} alt="Wireframe: Categories" />
            </div>
            <div className="ivg__comparison-card">
              <span className="ivg__badge ivg__badge--final">Final</span>
              <img src={`${BASE}/categories-crop.png`} alt="Final: Categories" />
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="ivg__comparison">
          <div className="ivg__comparison-label">Product Grid</div>
          <div className="ivg__comparison-grid">
            <div className="ivg__comparison-card">
              <span className="ivg__badge ivg__badge--wire">Wireframe</span>
              <img src={`${BASE}/wf-03-latest- products.png`} alt="Wireframe: Products" />
            </div>
            <div className="ivg__comparison-card">
              <span className="ivg__badge ivg__badge--final">Final</span>
              <img src={`${BASE}/products-crop.png`} alt="Final: Products" />
            </div>
          </div>
        </div>
      </section>

      <div className="ivg__divider" />

      {/* ── 04 SECTION DEEP DIVES ── */}
      <section className="ivg__section ivg__section--dark">
        <div className="ivg__label">03 — Closer Look</div>
        <h3 className="ivg__heading">Section Deep Dives</h3>
        <p className="ivg__subtext">
          Key areas of the homepage explored in detail — the design decisions,
          interaction patterns, and visual language behind each component.
        </p>

        {/* Hero */}
        <div className="ivg__deepdive">
          <div className="ivg__deepdive-row">
            <div className="ivg__deepdive-image">
              <img src={`${BASE}/hero-crop.png`} alt="Hero Banner" />
            </div>
            <div className="ivg__deepdive-text">
              <div className="ivg__deepdive-number">01</div>
              <div className="ivg__deepdive-title">Hero Carousel</div>
              <div className="ivg__deepdive-desc">
                A full-width rotating banner showcasing IVG's flagship products.
                Three slides auto-rotate on a 5-second interval with opacity
                crossfade transitions, creating smooth visual storytelling.
              </div>
              <div className="ivg__tags">
                <span className="ivg__tag">3 Slides</span>
                <span className="ivg__tag">5s Auto-Rotate</span>
                <span className="ivg__tag">Crossfade</span>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="ivg__deepdive">
          <div className="ivg__deepdive-row ivg__deepdive-row--reverse">
            <div className="ivg__deepdive-image">
              <img src={`${BASE}/categories-crop.png`} alt="Product Categories" />
            </div>
            <div className="ivg__deepdive-text">
              <div className="ivg__deepdive-number">02</div>
              <div className="ivg__deepdive-title">Product Category Cards</div>
              <div className="ivg__deepdive-desc">
                Six colour-coded product lines, each with a unique gradient
                identity — from IVG Pro's purple to E-Liquid's green. The
                horizontal scroll pattern invites exploration while the lift
                animation on hover signals interactivity.
              </div>
              <div className="ivg__tags">
                <span className="ivg__tag">6 Categories</span>
                <span className="ivg__tag">Gradient Coded</span>
                <span className="ivg__tag">Hover Lift</span>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="ivg__deepdive">
          <div className="ivg__deepdive-row">
            <div className="ivg__deepdive-image">
              <img src={`${BASE}/testimonials-crop.png`} alt="Testimonials" />
            </div>
            <div className="ivg__deepdive-text">
              <div className="ivg__deepdive-number">03</div>
              <div className="ivg__deepdive-title">Testimonial Marquee</div>
              <div className="ivg__deepdive-desc">
                An infinite horizontal scroll of customer reviews creates ambient
                social proof. The continuous motion draws the eye without demanding
                attention — duplicated cards ensure a seamless loop.
              </div>
              <div className="ivg__tags">
                <span className="ivg__tag">Infinite Loop</span>
                <span className="ivg__tag">20s Cycle</span>
                <span className="ivg__tag">CSS Keyframes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Awards */}
        <div className="ivg__deepdive">
          <div className="ivg__deepdive-row ivg__deepdive-row--reverse">
            <div className="ivg__deepdive-image">
              <img src={`${BASE}/awards-crop.png`} alt="Awards Section" />
            </div>
            <div className="ivg__deepdive-text">
              <div className="ivg__deepdive-number">04</div>
              <div className="ivg__deepdive-title">Award-Winning Credibility</div>
              <div className="ivg__deepdive-desc">
                A two-column layout pairs brand narrative with visual proof —
                award badges and retail partner logos build trust through
                association. The split reveal animation rewards scrolling.
              </div>
              <div className="ivg__tags">
                <span className="ivg__tag">Split Layout</span>
                <span className="ivg__tag">Scroll Reveal</span>
                <span className="ivg__tag">Trust Signals</span>
              </div>
            </div>
          </div>
        </div>

        {/* Blog */}
        <div className="ivg__deepdive">
          <div className="ivg__deepdive-row">
            <div className="ivg__deepdive-image">
              <img src={`${BASE}/blog-crop.png`} alt="Blog Section" />
            </div>
            <div className="ivg__deepdive-text">
              <div className="ivg__deepdive-number">05</div>
              <div className="ivg__deepdive-title">Blog Cards</div>
              <div className="ivg__deepdive-desc">
                Content marketing meets clean UI. Each card uses a hover-triggered
                slide-up overlay to reveal the article title and excerpt — keeping
                the grid visually clean while communicating content depth.
              </div>
              <div className="ivg__tags">
                <span className="ivg__tag">Hover Reveal</span>
                <span className="ivg__tag">Slide Up</span>
                <span className="ivg__tag">Content Marketing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="ivg__divider" />

      {/* ── 05 ANIMATION SYSTEM ── */}
      <section className="ivg__section">
        <div className="ivg__label">04 — Motion</div>
        <h3 className="ivg__heading">Animation System</h3>
        <p className="ivg__subtext">
          Purposeful motion guides the user's eye and rewards interaction.
          Every animation serves a function — nothing moves for decoration alone.
        </p>

        <div className="ivg__anim-grid">
          <div className="ivg__anim-card">
            <div className="ivg__anim-visual ivg__anim-visual--hero">
              <span className="ivg__anim-icon">↔</span>
              <span className="ivg__anim-motion-label">Opacity Crossfade</span>
            </div>
            <div className="ivg__anim-body">
              <div className="ivg__anim-title">Banner Carousel</div>
              <div className="ivg__anim-desc">Three hero slides auto-rotate with smooth opacity crossfade. Timer-driven, no user action required.</div>
              <div className="ivg__anim-specs">
                <span className="ivg__anim-spec">Duration: <span>1s</span></span>
                <span className="ivg__anim-spec">Interval: <span>5s</span></span>
                <span className="ivg__anim-spec">Trigger: <span>Auto</span></span>
              </div>
            </div>
          </div>

          <div className="ivg__anim-card">
            <div className="ivg__anim-visual ivg__anim-visual--scroll">
              <span className="ivg__anim-icon">↑</span>
              <span className="ivg__anim-motion-label">Fade + TranslateY</span>
            </div>
            <div className="ivg__anim-body">
              <div className="ivg__anim-title">Scroll Reveal Cards</div>
              <div className="ivg__anim-desc">Product cards fade up with staggered delays as they enter the viewport via IntersectionObserver.</div>
              <div className="ivg__anim-specs">
                <span className="ivg__anim-spec">Duration: <span>0.6s</span></span>
                <span className="ivg__anim-spec">Stagger: <span>0.1s</span></span>
                <span className="ivg__anim-spec">Trigger: <span>Scroll</span></span>
              </div>
            </div>
          </div>

          <div className="ivg__anim-card">
            <div className="ivg__anim-visual ivg__anim-visual--marquee">
              <span className="ivg__anim-icon">← ← ←</span>
              <span className="ivg__anim-motion-label">CSS Keyframes</span>
            </div>
            <div className="ivg__anim-body">
              <div className="ivg__anim-title">Testimonial Marquee</div>
              <div className="ivg__anim-desc">Infinite horizontal scroll using translateX keyframes. Duplicated cards create a seamless loop.</div>
              <div className="ivg__anim-specs">
                <span className="ivg__anim-spec">Duration: <span>20s</span></span>
                <span className="ivg__anim-spec">Easing: <span>Linear</span></span>
                <span className="ivg__anim-spec">Trigger: <span>Continuous</span></span>
              </div>
            </div>
          </div>

          <div className="ivg__anim-card">
            <div className="ivg__anim-visual ivg__anim-visual--hover">
              <span className="ivg__anim-icon">↕</span>
              <span className="ivg__anim-motion-label">TranslateY Reveal</span>
            </div>
            <div className="ivg__anim-body">
              <div className="ivg__anim-title">Blog Hover Overlay</div>
              <div className="ivg__anim-desc">Dark overlay slides up from bottom on hover to reveal article title and excerpt.</div>
              <div className="ivg__anim-specs">
                <span className="ivg__anim-spec">Duration: <span>0.4s</span></span>
                <span className="ivg__anim-spec">Easing: <span>Ease</span></span>
                <span className="ivg__anim-spec">Trigger: <span>Hover</span></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="ivg__divider" />

      {/* ── 06 COLOR & TYPE ── */}
      <section className="ivg__section ivg__section--dark">
        <div className="ivg__label">05 — Visual System</div>
        <h3 className="ivg__heading">Colour & Typography</h3>
        <p className="ivg__subtext">
          A restrained palette anchored by IVG's signature red, extended with
          six product-line gradients for instant category recognition.
        </p>

        <div className="ivg__system-grid">
          {/* Colors */}
          <div>
            <div style={{ marginTop: 30 }}>
              <div className="ivg__color-group-label">Brand Core</div>
              <div className="ivg__color-row">
                <div className="ivg__swatch">
                  <div className="ivg__swatch-circle ivg__swatch-circle--lg" style={{ background: '#ee1b2b' }} />
                  <span className="ivg__swatch-label">IVG Red</span>
                  <span className="ivg__swatch-hex">#ee1b2b</span>
                </div>
                <div className="ivg__swatch">
                  <div className="ivg__swatch-circle ivg__swatch-circle--lg" style={{ background: '#000000' }} />
                  <span className="ivg__swatch-label">Black</span>
                  <span className="ivg__swatch-hex">#000000</span>
                </div>
                <div className="ivg__swatch">
                  <div className="ivg__swatch-circle ivg__swatch-circle--lg" style={{ background: '#ffffff', borderColor: 'rgba(255,255,255,0.2)' }} />
                  <span className="ivg__swatch-label">White</span>
                  <span className="ivg__swatch-hex">#ffffff</span>
                </div>
              </div>
            </div>

            <div>
              <div className="ivg__color-group-label">Product Line Gradients</div>
              <div className="ivg__gradient-row">
                <div className="ivg__gradient-swatch" style={{ background: 'linear-gradient(135deg, #8b5cf6, #6366f1)' }}>
                  <span className="ivg__gradient-label">Pro</span>
                </div>
                <div className="ivg__gradient-swatch" style={{ background: 'linear-gradient(135deg, #06b6d4, #3b82f6)' }}>
                  <span className="ivg__gradient-label">Smart Max</span>
                </div>
                <div className="ivg__gradient-swatch" style={{ background: 'linear-gradient(135deg, #ef4444, #f97316)' }}>
                  <span className="ivg__gradient-label">XL35</span>
                </div>
              </div>
              <div className="ivg__gradient-row">
                <div className="ivg__gradient-swatch" style={{ background: 'linear-gradient(135deg, #eab308, #f59e0b)' }}>
                  <span className="ivg__gradient-label">Reload</span>
                </div>
                <div className="ivg__gradient-swatch" style={{ background: 'linear-gradient(135deg, #ec4899, #d946ef)' }}>
                  <span className="ivg__gradient-label">2400</span>
                </div>
                <div className="ivg__gradient-swatch" style={{ background: 'linear-gradient(135deg, #10b981, #14b8a6)' }}>
                  <span className="ivg__gradient-label">E-Liquid</span>
                </div>
              </div>
            </div>

            <div className="ivg__neutrals">
              <div className="ivg__color-group-label">UI Neutrals</div>
              <div className="ivg__color-row">
                <div className="ivg__swatch">
                  <div className="ivg__swatch-circle" style={{ background: '#f9f9f9', borderColor: 'rgba(255,255,255,0.15)' }} />
                  <span className="ivg__swatch-hex">#f9f9f9</span>
                </div>
                <div className="ivg__swatch">
                  <div className="ivg__swatch-circle" style={{ background: '#f0f0f0', borderColor: 'rgba(255,255,255,0.15)' }} />
                  <span className="ivg__swatch-hex">#f0f0f0</span>
                </div>
                <div className="ivg__swatch">
                  <div className="ivg__swatch-circle" style={{ background: '#666666' }} />
                  <span className="ivg__swatch-hex">#666666</span>
                </div>
                <div className="ivg__swatch">
                  <div className="ivg__swatch-circle" style={{ background: '#333333' }} />
                  <span className="ivg__swatch-hex">#333333</span>
                </div>
              </div>
            </div>
          </div>

          {/* Typography */}
          <div>
            <div style={{ marginTop: 30 }}>
              <div className="ivg__type-samples">
                <div>
                  <div className="ivg__type-weight">Extra Bold — 800</div>
                  <div className="ivg__type-800">Discover</div>
                </div>
                <div>
                  <div className="ivg__type-weight">Bold — 700</div>
                  <div className="ivg__type-700">IVG Smart Max</div>
                </div>
                <div>
                  <div className="ivg__type-weight">Semi Bold — 600</div>
                  <div className="ivg__type-600">Award Winning Excellence</div>
                </div>
                <div>
                  <div className="ivg__type-weight">Regular — 400</div>
                  <div className="ivg__type-400">Experience up to 10K puffs with our premium range.</div>
                </div>
                <div>
                  <div className="ivg__type-weight">Light — 300</div>
                  <div className="ivg__type-300">Customer service is exceptional and delivery is always fast.</div>
                </div>
              </div>

              <div className="ivg__type-family">
                <div className="ivg__type-family-name">Poppins</div>
                <div className="ivg__type-family-source">Google Fonts — Weights 300–800</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="ivg__divider" />

      {/* ── 07 FULL HOMEPAGE SCROLL ── */}
      <section className="ivg__section">
        <div className="ivg__label">06 — Final Design</div>
        <h3 className="ivg__heading">The Full Picture</h3>
        <p className="ivg__subtext">
          The complete homepage in a single scroll — every section, every detail,
          every pixel considered.
        </p>

        <div className="ivg__fullscroll-frame">
          <div className="ivg__browser-bar">
            <div className="ivg__browser-dot ivg__browser-dot--red" />
            <div className="ivg__browser-dot ivg__browser-dot--yellow" />
            <div className="ivg__browser-dot ivg__browser-dot--green" />
            <div className="ivg__browser-url">ivgvape.com</div>
          </div>
          <img src={`${BASE}/homepage-full.jpg`} alt="IVG Homepage — Full Design" />
        </div>
      </section>

      {/* ── 08 CLOSING ── */}
      <section className="ivg__closing">
        <div className="ivg__closing-logo">Thank you for viewing</div>
        <div className="ivg__closing-text">Ayeshna Vinayak</div>
      </section>

    </div>
  )
}

export default IvgHomepageContent
