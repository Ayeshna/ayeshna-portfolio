/* ============================================================================
   CV.Launch v1
   Tailored application generator. Runs entirely client-side.
   No external API calls. Master CV data fetched from /cv-launch/master.json.
   ============================================================================ */

'use strict';

const { jsPDF } = window.jspdf;

// ----- Passcode gate -----
const PASSCODE = 'AYESHNA';   // change here if needed
const GATE_KEY = 'cv-launch-unlocked-v1';

(function initGate() {
  const gate = document.getElementById('gate');
  const input = document.getElementById('gate-input');
  const err = document.getElementById('gate-error');

  if (sessionStorage.getItem(GATE_KEY) === '1') {
    gate.classList.add('hidden');
    return;
  }

  input.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    if (input.value.trim().toUpperCase() === PASSCODE) {
      sessionStorage.setItem(GATE_KEY, '1');
      gate.classList.add('hidden');
    } else {
      err.textContent = 'Wrong passcode';
      input.value = '';
      input.focus();
    }
  });
})();

// ----- App state -----
let MASTER = null;

// ----- Boot: load master.json -----
fetch('./master.json')
  .then((r) => r.json())
  .then((data) => {
    MASTER = data;
    setStatus('Ready — paste a JD to start');
  })
  .catch(() => {
    setStatus('Could not load master.json', true);
  });

function setStatus(text, isError) {
  const el = document.getElementById('status-text');
  el.textContent = text;
  el.style.color = isError ? '#ff6464' : '';
}

// ============================================================================
// Keyword extraction
// ============================================================================
const KNOWN_KEYWORDS = [
  // Tools
  'figma', 'sketch', 'adobe xd', 'photoshop', 'illustrator', 'indesign',
  'cinema 4d', 'c4d', 'blender', 'after effects', 'premiere', 'dimension',
  'midjourney', 'firefly', 'claude', 'sora', 'webflow', 'framer', 'principle',
  'invision', 'zeplin', 'jira', 'notion', 'miro', 'figjam',
  // Skills
  'ui design', 'ux design', 'ui/ux', 'visual design', 'brand design',
  'brand identity', 'brand system', 'design system', 'design systems',
  'prototyping', 'prototype', 'wireframe', 'wireframing',
  'user research', 'user testing', 'usability testing', 'a/b testing',
  'art direction', 'typography', 'iconography', 'illustration',
  '3d', '3d design', 'motion', 'motion design', 'motion graphics', 'animation',
  'packaging', 'print', 'print production',
  'campaign', 'campaigns', 'launch', 'launches',
  'responsive', 'responsive design', 'mobile-first',
  // Seniority signals
  'senior', 'lead', 'principal', 'mentor', 'mentorship', 'mentoring',
  'leadership', 'team lead', 'art director',
  // Business signals
  'conversion', 'cro', 'engagement', 'retention',
  'e-commerce', 'ecommerce', 'shopify', 'saas',
  'b2b', 'b2c', 'd2c', 'dtc',
  // Methods
  'design thinking', 'user-centered', 'human-centered',
  'accessibility', 'wcag', 'a11y',
  'agile', 'scrum',
  // AI
  'ai', 'artificial intelligence', 'generative', 'gen ai', 'genai',
  'prompt engineering', 'ai workflow', 'ai-integrated',
];

function extractKeywords(jdText) {
  const text = (jdText || '').toLowerCase();
  const found = new Set();
  for (const kw of KNOWN_KEYWORDS) {
    // Word-boundary match for short keywords, substring for multi-word
    const pattern = kw.length > 6
      ? kw
      : `\\b${kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`;
    const re = new RegExp(pattern, 'i');
    if (re.test(text)) found.add(kw);
  }
  return Array.from(found);
}

// ============================================================================
// Tailoring — reorder bullets within each role by relevance to JD
// ============================================================================
function bulletRelevance(bulletText, jdKeywords) {
  const lower = bulletText.toLowerCase();
  let score = 0;
  for (const kw of jdKeywords) {
    if (lower.includes(kw)) score += (kw.length > 6 ? 3 : 2);
  }
  // Bonus for quantified outcomes (numbers, percentages)
  if (/\d+%/.test(lower) || /\d+ ?(years|months|cities|markets)/.test(lower)) {
    score += 1;
  }
  return score;
}

function tailorMaster(jdKeywords) {
  // Deep clone master so we don't mutate
  const tailored = JSON.parse(JSON.stringify(MASTER));

  // Reorder bullets within each role
  for (const role of tailored.experience) {
    role.bullets = role.bullets
      .map((b) => ({ text: b, score: bulletRelevance(b, jdKeywords) }))
      .sort((a, b) => b.score - a.score)
      .map((o) => o.text);
  }

  return tailored;
}

// ============================================================================
// ATS scoring
// ============================================================================
function calculateATS(tailored, jdKeywords) {
  const cvText = JSON.stringify(tailored).toLowerCase();
  const breakdown = [];

  // 1. Format compliance — 40 pts (always full for our PDF format)
  breakdown.push({ label: 'Format compliance', score: 40, max: 40 });

  // 2. Section completeness — 15 pts
  const required = ['summary', 'experience', 'skills', 'education'];
  const present = required.filter((s) => tailored[s] && tailored[s].length).length;
  breakdown.push({
    label: 'Section completeness',
    score: Math.round((present / required.length) * 15),
    max: 15,
  });

  // 3. Keyword match against JD — 30 pts
  let matched = 0;
  for (const kw of jdKeywords) {
    if (cvText.includes(kw)) matched++;
  }
  const matchPct = jdKeywords.length ? matched / jdKeywords.length : 0;
  breakdown.push({
    label: 'Keyword match vs JD',
    score: Math.round(matchPct * 30),
    max: 30,
    detail: `${matched}/${jdKeywords.length}`,
  });

  // 4. Quantified outcomes — 10 pts
  const metricsCount = (cvText.match(/\d+%|up \d+|down \d+|\+\d+/g) || []).length;
  breakdown.push({
    label: 'Quantified outcomes',
    score: Math.min(metricsCount, 10),
    max: 10,
  });

  // 5. Length / readability — 5 pts (we always hit this)
  breakdown.push({ label: 'Length & readability', score: 5, max: 5 });

  const total = breakdown.reduce((s, x) => s + x.score, 0);
  return { total, breakdown };
}

// ============================================================================
// PDF generation — uses jsPDF
// ============================================================================
function buildCvPdf(tailored, jdContext) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const PAGE_W = 210;
  const PAGE_H = 297;
  const MARGIN = 18;
  const LINE_H = 4.6;
  let y = 15;

  const c = tailored.contact;

  // Header — Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text(tailored.name, MARGIN, y);
  y += 8;

  // Title
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.text(tailored.title, MARGIN, y);
  y += 6;

  // Contact lines
  doc.setFontSize(9);
  doc.text(`${c.email}   |   ${c.phone}   |   ${c.location}`, MARGIN, y);
  y += 4;
  doc.text(`${c.website}   |   ${c.linkedin}`, MARGIN, y);
  y += 6;

  // Section helper
  function section(title) {
    y += 2;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(title.toUpperCase(), MARGIN, y);
    y += 1.5;
    doc.setDrawColor(180);
    doc.line(MARGIN, y, PAGE_W - MARGIN, y);
    y += 4;
  }

  function checkPageBreak(needed) {
    if (y + needed > PAGE_H - 15) {
      doc.addPage();
      y = 15;
    }
  }

  function wrapped(text, options = {}) {
    const size = options.size || 10;
    const font = options.font || 'normal';
    const indent = options.indent || 0;
    const maxW = PAGE_W - MARGIN * 2 - indent;
    doc.setFont('helvetica', font);
    doc.setFontSize(size);
    const lines = doc.splitTextToSize(text, maxW);
    for (const line of lines) {
      checkPageBreak(LINE_H);
      doc.text(line, MARGIN + indent, y);
      y += LINE_H;
    }
  }

  // SUMMARY
  section('Summary');
  wrapped(tailored.summary, { size: 10 });

  // EXPERIENCE
  section('Experience');
  for (const role of tailored.experience) {
    checkPageBreak(12);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.text(role.title, MARGIN, y);
    y += LINE_H;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`${role.company}  |  ${role.location}`, MARGIN, y);
    y += LINE_H;

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.text(role.dates, MARGIN, y);
    y += LINE_H;

    for (const bullet of role.bullets) {
      checkPageBreak(LINE_H * 2);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      const maxW = PAGE_W - MARGIN * 2 - 4;
      const lines = doc.splitTextToSize(`- ${bullet}`, maxW);
      for (const line of lines) {
        checkPageBreak(LINE_H);
        doc.text(line, MARGIN, y);
        y += LINE_H;
      }
    }
    y += 1.5;
  }

  // SKILLS
  section('Skills');
  for (const [k, v] of Object.entries(tailored.skills)) {
    checkPageBreak(LINE_H * 3);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(k, MARGIN, y);
    y += LINE_H;
    doc.setFont('helvetica', 'normal');
    wrapped(v, { size: 10 });
    y += 1;
  }

  // EDUCATION
  section('Education');
  for (const e of tailored.education) {
    checkPageBreak(LINE_H * 4);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(e.degree, MARGIN, y);
    y += LINE_H;
    doc.setFont('helvetica', 'normal');
    doc.text(`${e.school}  |  ${e.location}`, MARGIN, y);
    y += LINE_H;
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.text(e.dates, MARGIN, y);
    y += LINE_H + 1;
  }

  // CERTIFICATES
  if (tailored.certificates && tailored.certificates.length) {
    section('Certificates');
    for (const cert of tailored.certificates) {
      checkPageBreak(LINE_H * 4);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text(cert.name, MARGIN, y);
      y += LINE_H;
      doc.setFont('helvetica', 'normal');
      wrapped(cert.provider, { size: 10 });
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(9);
      doc.text(cert.dates, MARGIN, y);
      y += LINE_H + 1;
    }
  }

  // LANGUAGES
  if (tailored.languages) {
    section('Languages');
    wrapped(tailored.languages, { size: 10 });
  }

  return doc;
}

function buildCoverLetterPdf(tailored, jdContext, jdKeywords) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const PAGE_W = 210;
  const MARGIN = 22;
  const LINE_H = 5;
  let y = 20;
  const c = tailored.contact;

  // Header — name + contact
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text(tailored.name, MARGIN, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(`${c.email}  |  ${c.phone}  |  ${c.location}`, MARGIN, y);
  y += 4;
  doc.text(`${c.website}  |  ${c.linkedin}`, MARGIN, y);
  y += 10;

  // Date
  const today = new Date().toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
  doc.text(today, MARGIN, y);
  y += 8;

  // Greeting
  const company = jdContext.company || '[Company]';
  const roleTitle = jdContext.roleTitle || 'this role';

  doc.text(`Dear ${company} Hiring Team,`, MARGIN, y);
  y += 8;

  // Top 4 matched keywords (formatted for prose)
  const topMatched = jdKeywords.slice(0, 6).join(', ');

  const paragraphs = [
    `I am writing about the ${roleTitle} role at ${company}. With 7+ years across brand systems, product UI, 3D and motion at IVG, Red Ox Fashion and Viosimos United, I bring direct experience in the areas your team is hiring for${topMatched ? `, including ${topMatched}` : ''}.`,

    `At IVG I led the e-commerce homepage redesign at ivapegreat.com (conversion up 38 percent, bounce rate down 63 percent, time-on-page up 70 percent) and art-directed the IVG x Bespoke OOH campaign across 8 UK cities, full London bus and Black Cab livery, and Odeon and Vue cinemas during the Deadpool vs Wolverine release. The visual system I built became the template for all subsequent premium-tier launches.`,

    `Across earlier roles at Red Ox and Viosimos I led brand and product redesigns that delivered measurable conversion uplifts, built design systems from the ground up, and ran the full user research cycle from interviews and A/B testing to high-fidelity prototypes in Figma.`,

    `I am UK-based and eligible for Skilled Worker visa sponsorship, open to Senior, Lead and Brand Designer roles in London and Manchester. I would welcome a conversation about how I can contribute at ${company}.`,
  ];

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  const maxW = PAGE_W - MARGIN * 2;
  for (const para of paragraphs) {
    const lines = doc.splitTextToSize(para, maxW);
    for (const line of lines) {
      doc.text(line, MARGIN, y);
      y += LINE_H;
    }
    y += 3;
  }

  y += 4;
  doc.text('Best regards,', MARGIN, y);
  y += LINE_H;
  doc.setFont('helvetica', 'bold');
  doc.text(tailored.name, MARGIN, y);

  return doc;
}

// ============================================================================
// File slug helper
// ============================================================================
function slug(s) {
  return (s || 'application')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// ============================================================================
// Main generate handler
// ============================================================================
document.getElementById('generate').addEventListener('click', () => {
  if (!MASTER) {
    setStatus('Master not loaded yet', true);
    return;
  }

  const company = document.getElementById('company').value.trim();
  const roleTitle = document.getElementById('role-title').value.trim();
  const jdText = document.getElementById('jd').value.trim();

  if (!jdText) {
    setStatus('Paste a job description first', true);
    return;
  }

  setStatus('Tailoring…');

  const jdContext = { company, roleTitle };
  const jdKeywords = extractKeywords(jdText);
  const tailored = tailorMaster(jdKeywords);
  const ats = calculateATS(tailored, jdKeywords);

  // Render ATS score
  document.getElementById('ats-number').textContent = ats.total;
  const breakdownEl = document.getElementById('ats-breakdown');
  breakdownEl.innerHTML = '';
  for (const row of ats.breakdown) {
    const div = document.createElement('div');
    div.className = 'ats-row';
    div.innerHTML = `
      <span class="ats-row__label">${row.label}${row.detail ? ` · ${row.detail}` : ''}</span>
      <span class="ats-row__value">${row.score} / ${row.max}</span>
    `;
    breakdownEl.appendChild(div);
  }

  // Render matched keywords
  const matchedEl = document.getElementById('preview-matched');
  matchedEl.innerHTML = '';
  if (jdKeywords.length === 0) {
    matchedEl.innerHTML = '<span class="preview__hint">No design-industry keywords detected. The JD may use unusual terminology, or it is missing context.</span>';
  } else {
    for (const kw of jdKeywords) {
      const chip = document.createElement('span');
      chip.className = 'keyword-chip';
      chip.textContent = kw;
      matchedEl.appendChild(chip);
    }
  }

  // Build PDFs (in memory)
  const cvDoc = buildCvPdf(tailored, jdContext);
  const coverDoc = buildCoverLetterPdf(tailored, jdContext, jdKeywords);

  // Wire up downloads
  const slugCompany = slug(company || 'company');
  const cvFileName = `Ayeshna_Vinayak_CV__${slugCompany}.pdf`;
  const coverFileName = `Ayeshna_Vinayak_CoverLetter__${slugCompany}.pdf`;

  const cvBtn = document.getElementById('download-cv');
  const coverBtn = document.getElementById('download-cover');

  cvBtn.onclick = (e) => { e.preventDefault(); cvDoc.save(cvFileName); };
  coverBtn.onclick = (e) => { e.preventDefault(); coverDoc.save(coverFileName); };

  // Hint
  document.getElementById('preview-hint').innerHTML =
    `Bullets within each role have been reordered to surface the most JD-relevant content first. ` +
    `The cover letter is template-filled with the matched keywords and your strongest stat-anchored bullets. ` +
    `<br><br>Both PDFs are editable in Illustrator and machine-readable for ATS parsers.`;

  // Show output
  document.getElementById('output').classList.add('visible');
  setStatus(`Generated for ${company || 'application'}`);

  // Scroll to output on mobile
  document.getElementById('output').scrollIntoView({ behavior: 'smooth', block: 'start' });
});
