import { ArrowUpRight } from 'lucide-react'
import '../styles/CaseStudyHero.css'

/* ==========================================================================
   CaseStudyHero
   Editorial Problem → Goal → My Role → Result block.
   Renders at the top of a project overlay if the project has a case study
   entry in `src/data/caseStudies.js`. Archive projects never render this.
   ========================================================================== */

function CaseStudyHero({ data }) {
  if (!data) return null

  return (
    <section className="cs-hero" aria-label="Case study summary">

      {/* Meta line — sector · year · role */}
      <div className="cs-hero__meta">
        <span>{data.sector}</span>
        <span className="cs-hero__sep">·</span>
        <span>{data.year}</span>
        <span className="cs-hero__sep">·</span>
        <span>{data.role}</span>
      </div>

      <div className="cs-hero__grid">

        {/* Problem */}
        <div className="cs-block cs-block--top">
          <div className="cs-block__label">The Problem</div>
          <p className="cs-block__body">{data.problem}</p>
        </div>

        {/* Goal */}
        <div className="cs-block cs-block--top">
          <div className="cs-block__label">The Goal</div>
          <p className="cs-block__body">{data.goal}</p>
        </div>

        {/* My Role — full width on desktop */}
        <div className="cs-block cs-block--wide">
          <div className="cs-block__label">My Role</div>
          <ul className="cs-block__list">
            {data.myRole.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Result — full width, accent treatment */}
        <div className="cs-block cs-block--wide cs-block--result">
          <div className="cs-block__label cs-block__label--accent">The Result</div>
          <ul className="cs-block__list cs-block__list--result">
            {data.result.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          {/* Optional inline links (e.g. live site URL, Instagram) */}
          {data.links && data.links.length > 0 && (
            <div className="cs-block__links">
              {data.links.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cs-block__link"
                >
                  {link.label}
                  <ArrowUpRight size={12} strokeWidth={2.2} />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ───── Tools Used row ───── */}
      {data.tools && data.tools.length > 0 && (
        <div className="cs-tools">
          <span className="cs-tools__label">Tools Used</span>
          <ul className="cs-tools__list">
            {data.tools.map((tool, i) => (
              <li key={i} className="cs-tools__item">
                <span className="cs-tools__dot" aria-hidden="true" />
                {tool}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}

export default CaseStudyHero
