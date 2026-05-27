import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Mail,
  MapPin,
  ExternalLink,
  Phone,
  Send,
  ArrowUpRight,
  Plus,
  Code,
  Palette,
  Download,
} from 'lucide-react'
import '../styles/Contact.css'

/* ==========================================================================
   Contact Section — standalone card (not bento)
   Matches 21st.dev ContactCard layout: 2/3 content + 1/3 form
   Green corner + marks matching the Hero name block
   ========================================================================== */

function Contact() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' })

  /* ── Formspree endpoint — emails submissions to ayeshna19@icloud.com ── */
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xredobbg'

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState('idle')  /* idle | sending | success | error */

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', phone: '', message: '' })
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 5000)
      }
    } catch (err) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  const submitted = status === 'success'

  /* 2×2 grid: top row = Email + Phone, bottom row = Location + LinkedIn */
  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'ayeshna19@icloud.com',
      href: 'mailto:ayeshna19@icloud.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+44 0 7741336021',
      href: 'tel:+4407741336021',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Manchester, UK · Open to relocate',
      href: null,
    },
    {
      icon: ExternalLink,
      label: 'LinkedIn',
      value: 'Connect on LinkedIn',
      href: 'https://www.linkedin.com/in/ayeshna-vinayak/',
    },
    {
      icon: Code,
      label: 'GitHub',
      value: 'github.com/Ayeshna',
      href: 'https://github.com/Ayeshna',
    },
    {
      icon: Palette,
      label: 'Behance',
      value: 'behance.net/ayeshna31',
      href: 'https://www.behance.net/ayeshna31',
    },
  ]

  return (
    <section className="contact" id="contact" ref={sectionRef}>
      <div className="contact__container">
        <motion.div
          className="contact__card"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* 4 corner + marks — OUTSIDE the card, green like Hero */}
          <Plus className="contact__plus contact__plus--tl" size={24} strokeWidth={1} aria-hidden="true" />
          <Plus className="contact__plus contact__plus--tr" size={24} strokeWidth={1} aria-hidden="true" />
          <Plus className="contact__plus contact__plus--bl" size={24} strokeWidth={1} aria-hidden="true" />
          <Plus className="contact__plus contact__plus--br" size={24} strokeWidth={1} aria-hidden="true" />

          {/* ── Left side: content (spans 2 cols on lg) ── */}
          <div className="contact__content">
            <motion.div
              className="contact__content-inner"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              <h2 className="contact__title">Let's Connect</h2>
              <p className="contact__desc">
                Open to Senior Visual Designer, Brand Designer and Product Design roles
                in London &amp; Manchester. <strong style={{ color: 'var(--accent)', fontWeight: 600 }}>
                UK-based — eligible for Skilled Worker visa sponsorship.</strong> Available
                for full-time positions and select consulting briefs.
              </p>

              {/* Info 2×2 grid */}
              <motion.div
                className="contact__info-grid"
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              >
                {contactInfo.map((info, i) => {
                  const Icon = info.icon
                  const Tag = info.href ? 'a' : 'div'
                  const linkProps = info.href
                    ? { href: info.href, target: '_blank', rel: 'noopener noreferrer' }
                    : {}

                  return (
                    <motion.div
                      key={i}
                      variants={{
                        hidden: { opacity: 0, y: 12 },
                        visible: { opacity: 1, y: 0 },
                      }}
                    >
                      <Tag className="contact__info-item" {...linkProps}>
                        <div className="contact__info-icon">
                          <Icon size={20} />
                        </div>
                        <div>
                          <p className="contact__info-label">{info.label}</p>
                          <p className="contact__info-value">
                            {info.value}
                            {info.href && info.label !== 'Email' && info.label !== 'Phone' && (
                              <ArrowUpRight
                                size={11}
                                style={{ display: 'inline', marginLeft: 4, opacity: 0.5 }}
                              />
                            )}
                          </p>
                        </div>
                      </Tag>
                    </motion.div>
                  )
                })}
              </motion.div>

              {/* Download CV button — ATS-friendly editable PDF */}
              <motion.a
                href="/Ayeshna_Vinayak_CV.pdf"
                download="Ayeshna_Vinayak_Senior_Visual_Designer_CV.pdf"
                className="contact__cv-download"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.45 }}
                aria-label="Download Ayeshna Vinayak's CV as PDF"
              >
                <Download size={16} strokeWidth={2} />
                <span>Download CV</span>
                <span className="contact__cv-download-meta">PDF, ATS-ready</span>
              </motion.a>
            </motion.div>
          </div>

          {/* ── Right side: form (spans 1 col) ── */}
          <motion.div
            className="contact__form-panel"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="contact__field">
                <label className="contact__label" htmlFor="c-name">Name</label>
                <input
                  className="contact__input"
                  id="c-name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  minLength={2}
                  maxLength={80}
                />
              </div>

              <div className="contact__field">
                <label className="contact__label" htmlFor="c-email">Email</label>
                <input
                  className="contact__input"
                  id="c-email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  maxLength={120}
                  inputMode="email"
                />
              </div>

              <div className="contact__field">
                <label className="contact__label" htmlFor="c-phone">Phone</label>
                <input
                  className="contact__input"
                  id="c-phone"
                  name="phone"
                  type="tel"
                  placeholder="+44 ..."
                  value={form.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                  maxLength={20}
                  inputMode="tel"
                />
              </div>

              <div className="contact__field">
                <label className="contact__label" htmlFor="c-msg">Message</label>
                <textarea
                  className="contact__input contact__textarea"
                  id="c-msg"
                  name="message"
                  placeholder="Tell me about your project..."
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  required
                  minLength={10}
                  maxLength={2000}
                />
              </div>

              <button
                className="contact__submit"
                type="submit"
                disabled={status === 'sending' || status === 'success'}
              >
                {status === 'sending' && 'Sending…'}
                {status === 'success' && 'Message sent ✓'}
                {status === 'error'   && 'Try again — error sending'}
                {status === 'idle'    && (<>Submit <Send size={14} /></>)}
              </button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
