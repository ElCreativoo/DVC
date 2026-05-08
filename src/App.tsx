import { useState, useEffect, useRef } from 'react'

const IMAGES = {
  outdoor:   '/images/img1.webp',
  bar:       '/images/img2.webp',
  disco:     '/images/img3.webp',
  beers:     '/images/img4.webp',
  vault:     '/images/img5.webp',
  beer2:     '/images/img6.webp',
  barFull:   '/images/img7.webp',
  owner:     '/images/img8.webp',
  cellar:    '/images/img9.webp',
  terrace:   '/images/img10.webp',
  porch:     '/images/img11.webp',
  interior1: '/images/img12.webp',
  wallpaper: '/images/img13.webp',
  lantern:   '/images/img14.webp',
  interior2: '/images/img15.webp',
  interior3: '/images/img16.webp',
  corner:    '/images/img17.webp',
  disco2:    '/images/img18.webp',  // Freefall bottle + disco helmet
  helmetGirl: '/images/img19.webp', // woman wearing disco helmet
  outdoor2:   '/images/img20.webp', // red sofa porch, outdoor seating
  terraceWide: '/images/img21.webp', // wide outdoor terrace with building
  logoRound: '/images/logo-round.png',
  logoText:  '/images/logo-text.png',
  logoText2: '/images/logo-text2.png',   // white wordmark, transparent bg
}

const testimonials = [
  { text: 'Augustiner offen, kreatives Essen, gutes Ambiente, Live-Musik. Einfach ein sehr cooler Schuppen.' },
  { text: 'Hier trifft sich Engelberg und Stockholm. Mix aus Locals, Touristen, Musikliebhaber und Barhänger.' },
  { text: 'Qualitativ hochwertige Drinks und Food im gemütlichen Lokal. Alles frisch, handgemacht und mit Abstand das beste Lokal im Dorf.' },
  { text: 'Sehr willkommen gefühlt. Lockere Atmosphäre, regionales Essen und unglaublich sympathischer Service.' },
]

const highlights = [
  { emoji: '🎸', title: 'Live Musik & DJ Nächte', desc: 'Legendäre Live-Bands, kultige DJ-Sets und echte Après-Ski Energie bis spät in die Nacht.' },
  { emoji: '🍺', title: 'Craft Beer & Drinks', desc: 'Premium Cocktails, kaltes Augustiner vom Hahn und Locher Craft Beer in einzigartigen Sorten.' },
  { emoji: '🏔️', title: 'Gemütlicher Gewölbekeller', desc: 'Ruhige Ecken im historischen Steingewölbe – warm, einzigartig und zum Wohlfühlen gemacht.' },
  { emoji: '🍽️', title: 'Kreative Küche', desc: 'Frische Zutaten, regionale Produkte und ehrliches Food mit modernem Twist.' },
]

function IgIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  )
}

function useIntersection(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true)
    }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function FadeIn({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string
}) {
  const { ref, visible } = useIntersection()
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </div>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', date: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="bg-cream text-bark overflow-x-hidden">

      {/* ─── NAV ─────────────────────────────────────────────── */}
      {/* When atBottom: slides to the bottom of viewport via translateY */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-[900ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
          scrolled ? 'bg-cream/97 backdrop-blur-xl border-bark/8' : 'bg-transparent border-transparent'
        }`}
      >
        <div className={`max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between ${
          scrolled ? 'py-0' : 'py-3'
        }`} style={{ transition: 'padding 900ms cubic-bezier(0.4,0,0.2,1)' }}>
          <a href="#" className="flex items-center gap-2 group">
            {/* Logo only visible when scrolled — on dark hero the big hero logo takes this role */}
            <img
              src={IMAGES.logoRound}
              alt="Das verrückte Café zum Hoheneck"
              style={{ transition: 'width 700ms cubic-bezier(0.4,0,0.2,1), height 700ms cubic-bezier(0.4,0,0.2,1), opacity 600ms cubic-bezier(0.4,0,0.2,1)' }}
              className={`object-contain flex-shrink-0 ${
                scrolled
                  ? 'w-24 h-24 opacity-100'
                  : 'w-0 h-0 opacity-0 pointer-events-none'
              }`}
            />
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {[['Atmosphäre','#atmosphare'],['Erlebnis','#erlebnis'],['Galerie','#galerie'],['Über uns','#uber-uns']].map(([l,h]) => (
              <a key={l} href={h} className={`transition-colors hover:text-caramel ${scrolled ? 'text-bark/70' : 'text-white/80'}`}>
                {l}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a href="#reservierung" className={`hidden md:inline-flex px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              scrolled
                ? 'bg-bark text-cream hover:bg-caramel'
                : 'bg-white/15 text-white border border-white/35 hover:bg-white/25 backdrop-blur-sm'
            }`}>
              Reservieren
            </a>
            <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Menü"
              className={`md:hidden w-8 h-8 flex flex-col justify-center gap-[5px] ${scrolled ? 'text-bark' : 'text-white'}`}>
              <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </button>
          </div>
        </div>

        <div className={`md:hidden bg-cream/98 backdrop-blur-xl transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-72 border-b border-bark/10' : 'max-h-0'}`}>
          <div className="px-5 pb-6 space-y-4 pt-3">
            {[['Atmosphäre','#atmosphare'],['Erlebnis','#erlebnis'],['Galerie','#galerie'],['Über uns','#uber-uns'],['Reservieren','#reservierung']].map(([l,h]) => (
              <a key={l} href={h} onClick={() => setMenuOpen(false)}
                className="block text-bark font-medium hover:text-caramel transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </header>

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-between overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.bar} alt="Das verrückte Café zum Hoheneck" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-bark/95 via-bark/60 to-bark/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-bark/50 via-transparent to-transparent" />
        </div>

        {/* TOP — empty spacer, keeps hero balanced */}
        <div className="pt-28 md:pt-36" />

        {/* BOTTOM — main hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 w-full pb-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/30 bg-white/12 backdrop-blur-sm text-white text-xs tracking-widest uppercase mb-6 animate-fadeUp" style={{ animationDelay: '80ms' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-caramel animate-pulse" />
              Engelbergs kultigstes Lokal
            </div>

            <h1 className="font-display text-white text-5xl md:text-7xl lg:text-[82px] font-bold leading-[0.93] tracking-tight mb-6 drop-shadow-[0_2px_20px_rgba(0,0,0,0.7)] animate-fadeUp" style={{ animationDelay: '120ms' }}>
              Craft Beer.<br />
              Live Musik.<br />
              <em className="not-italic" style={{ color: '#e8a455' }}>Echter Vibe.</em>
            </h1>

            <p className="text-white/85 text-lg md:text-xl leading-relaxed max-w-xl mb-10 drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)] animate-fadeUp" style={{ animationDelay: '200ms' }}>
              Ein verrücktes Café, in dem kaum Kaffee getrunken wird – dafür Craft Beer vom Fass, Live-Musik und Nächte, die bleiben.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-12 animate-fadeUp" style={{ animationDelay: '270ms' }}>
              <a href="#reservierung"
                className="bg-caramel text-white px-8 py-4 rounded-full text-sm font-semibold tracking-wide hover:bg-amber-500 transition-all duration-300 hover:scale-105 text-center shadow-lg shadow-caramel/30">
                Tisch reservieren
              </a>
              <a href="#erlebnis"
                className="border-2 border-white/40 text-white px-8 py-4 rounded-full text-sm font-semibold tracking-wide hover:bg-white/15 transition-all duration-300 text-center backdrop-blur-sm">
                Mehr entdecken
              </a>
            </div>

            {/* Stats row + oversized wordmark */}
            <div className="flex flex-wrap items-center gap-5 md:gap-8 animate-fadeUp" style={{ animationDelay: '350ms' }}>
              <div>
                <p className="text-white text-2xl md:text-3xl font-display font-bold drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">Live</p>
                <p className="text-white/60 text-xs mt-0.5 tracking-wide">Bands jede Woche</p>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div>
                <p className="text-white text-2xl md:text-3xl font-display font-bold drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">Kult</p>
                <p className="text-white/60 text-xs mt-0.5 tracking-wide">Bar in Engelberg</p>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div>
                <p className="text-white text-2xl md:text-3xl font-display font-bold drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">2023</p>
                <p className="text-white/60 text-xs mt-0.5 tracking-wide">Gegründet</p>
              </div>
              <div className="w-px h-8 bg-white/20 hidden sm:block" />
              <img
                src={IMAGES.logoText2}
                alt="Das verrückte Café zum Hoheneck"
                className="hidden sm:block h-48 md:h-60 object-contain object-left drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)] -ml-4 md:-ml-6 translate-y-3"
              />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-10 hidden md:flex flex-col items-center gap-2 opacity-60 animate-fadeUp" style={{ animationDelay: '500ms' }}>
          <p className="text-white text-[10px] tracking-[0.2em] uppercase rotate-90 mb-3">Scroll</p>
          <svg className="w-5 h-7 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 36">
            <rect x="4" y="2" width="16" height="28" rx="8" strokeWidth="2"/>
            <line x1="12" y1="8" x2="12" y2="14" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </div>
      </section>

      {/* ─── ATMOSPHÄRE ───────────────────────────────────────── */}
      <section id="atmosphare" className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <p className="text-caramel text-xs tracking-widest uppercase font-semibold mb-5">Atmosphäre</p>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-8">
              Zwischen Après-Ski,<br />
              <em>Kultbar</em> und<br />
              Wohnzimmer.
            </h2>
            <p className="text-bark/65 text-lg leading-relaxed mb-6">
              Das verrückte Café ist kein gewöhnliches Lokal — das stimmt, wir sind nicht ganz dicht. Hier treffen sich Locals, Musikliebhaber, Reisende und Nachtschwärmer in einem Raum, der seinesgleichen sucht.
            </p>
            <p className="text-bark/65 text-lg leading-relaxed mb-10">
              Disco-Kugeln neben Weinflaschen-Lampenschirmen, William-Morris-Tapete neben Gitarren-Postern, ein Flamingo auf dem Zapfhahn – jedes Detail hat seinen Grund, jede Ecke ihre Geschichte.
            </p>
            <a href="#erlebnis" className="inline-flex items-center gap-2 text-caramel font-semibold hover:gap-4 transition-all duration-300">
              Mehr erfahren <span>→</span>
            </a>
          </FadeIn>

          <FadeIn delay={150}>
            <div className="grid grid-cols-2 gap-4">
              <img src={IMAGES.wallpaper} alt="Atmosphäre" className="rounded-2xl w-full h-60 object-cover shadow-lg" />
              <img src={IMAGES.vault} alt="Gewölbekeller" className="rounded-2xl w-full h-60 object-cover shadow-lg mt-10" />
              <img src={IMAGES.porch} alt="Terrasse" className="rounded-2xl w-full h-48 object-cover shadow-lg" />
              <img src={IMAGES.beers} alt="Craft Beer auf dem Tisch" className="rounded-2xl w-full h-48 object-cover object-bottom shadow-lg mt-6" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── ERLEBNIS / HIGHLIGHTS ────────────────────────────── */}
      <section id="erlebnis" className="bg-bark text-cream py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <p className="text-caramel text-xs tracking-widest uppercase font-semibold mb-4">Erlebnis</p>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight max-w-2xl">
                Mehr als eine Bar.<br />
                <em className="text-caramel">Viel mehr.</em>
              </h2>
              <p className="text-white/50 text-lg max-w-sm md:text-right">
                Alles hier ist darauf ausgelegt, dass du dich sofort willkommen fühlst.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-5 mb-12">
            {highlights.map((h, i) => (
              <FadeIn key={h.title} delay={i * 80}>
                <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-3xl p-8 md:p-10 transition-all duration-300 group hover:-translate-y-1 h-full">
                  <div className="w-14 h-14 rounded-2xl bg-caramel/20 flex items-center justify-center text-2xl mb-7 group-hover:scale-110 transition-transform">
                    {h.emoji}
                  </div>
                  <h3 className="font-display text-xl md:text-2xl font-semibold mb-3 tracking-tight">{h.title}</h3>
                  <p className="text-white/55 leading-relaxed">{h.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="relative rounded-3xl overflow-hidden mb-12">
              <img src={IMAGES.interior1} alt="Innenraum Bar" className="w-full h-72 md:h-96 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-bark/75 via-bark/30 to-transparent" />
              <div className="absolute bottom-8 left-8 md:left-12">
                <p className="font-display text-white text-2xl md:text-4xl font-bold leading-tight">Hier spielt die Musik.</p>
                <p className="text-white/65 mt-2">Jeden Abend ein bisschen Magie.</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="bg-caramel/15 border border-caramel/25 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <p className="text-caramel text-xs tracking-widest uppercase font-semibold mb-2">Öffnungszeiten</p>
                <p className="font-display text-2xl md:text-3xl font-bold">Mittwoch – Montag</p>
                <p className="text-white/60 mt-1">Ab 14:00 Uhr · Fr & Sa bis 01:30 Uhr</p>
              </div>
              <div className="h-px md:h-12 w-full md:w-px bg-caramel/25" />
              <div>
                <p className="text-caramel text-xs tracking-widest uppercase font-semibold mb-2">Adresse</p>
                <p className="font-display text-2xl md:text-3xl font-bold">Dorfstrasse 4</p>
                <p className="text-white/60 mt-1">6390 Engelberg, Schweiz</p>
              </div>
              <div className="h-px md:h-12 w-full md:w-px bg-caramel/25" />
              <a href="#reservierung"
                className="bg-caramel text-white px-7 py-4 rounded-full text-sm font-semibold tracking-wide hover:bg-amber-500 hover:scale-105 transition-all duration-300 whitespace-nowrap text-center shadow-lg shadow-caramel/25">
                Tisch reservieren →
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── GALERIE ──────────────────────────────────────────── */}
      <section id="galerie" className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <p className="text-caramel text-xs tracking-widest uppercase font-semibold mb-4">Galerie</p>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-14 max-w-2xl">
              Bilder sagen mehr als<br />tausend Worte.
            </h2>
          </FadeIn>

          {/* Row 1: 3 equal */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
            <FadeIn delay={0}>
              <img src={IMAGES.owner} alt="Ruben, Inhaber" className="rounded-3xl w-full h-72 sm:h-80 object-cover hover:scale-[1.02] transition-transform duration-500 shadow-md" />
            </FadeIn>
            <FadeIn delay={60}>
              <img src={IMAGES.interior1} alt="Innenraum" className="rounded-3xl w-full h-72 sm:h-80 object-cover hover:scale-[1.02] transition-transform duration-500 shadow-md" />
            </FadeIn>
            <FadeIn delay={120}>
              <img src={IMAGES.vault} alt="Steingewölbe" className="rounded-3xl w-full h-72 sm:h-80 object-cover hover:scale-[1.02] transition-transform duration-500 shadow-md" />
            </FadeIn>
          </div>

          {/* Row 2: 2/3 + 1/3 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
            <FadeIn delay={0} className="sm:col-span-2">
              <img src={IMAGES.interior2} alt="Bar Innenraum" className="rounded-3xl w-full h-64 object-cover hover:scale-[1.02] transition-transform duration-500 shadow-md" />
            </FadeIn>
            <FadeIn delay={80}>
              <img src={IMAGES.wallpaper} alt="Tapete & Atmosphäre" className="rounded-3xl w-full h-64 object-cover hover:scale-[1.02] transition-transform duration-500 shadow-md" />
            </FadeIn>
          </div>

          {/* Row 3: 4 detail shots */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
            <FadeIn delay={0}>
              <img src={IMAGES.lantern} alt="Edison Lampe" className="rounded-3xl w-full h-52 object-cover hover:scale-[1.02] transition-transform duration-500 shadow-md" />
            </FadeIn>
            <FadeIn delay={60}>
              <img src={IMAGES.disco} alt="Craft Beer & Disco" className="rounded-3xl w-full h-52 object-cover hover:scale-[1.02] transition-transform duration-500 shadow-md" />
            </FadeIn>
            <FadeIn delay={120}>
              <img src={IMAGES.corner} alt="Gitarren-Ecke" className="rounded-3xl w-full h-52 object-cover hover:scale-[1.02] transition-transform duration-500 shadow-md" />
            </FadeIn>
            <FadeIn delay={180}>
              <img src={IMAGES.helmetGirl} alt="Frau mit Disco-Helm" className="rounded-3xl w-full h-52 object-cover object-[center_20%] hover:scale-[1.02] transition-transform duration-500 shadow-md" />
            </FadeIn>
          </div>

          {/* Row 4: 1/3 + 2/3 — like original */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
            <FadeIn delay={0}>
              <img src={IMAGES.beers} alt="Craft Beer" className="rounded-3xl w-full h-60 object-cover object-bottom hover:scale-[1.02] transition-transform duration-500 shadow-md" />
            </FadeIn>
            <FadeIn delay={80} className="sm:col-span-2">
              <img src={IMAGES.terraceWide} alt="Terrasse Engelberg" className="rounded-3xl w-full h-60 object-cover object-top hover:scale-[1.02] transition-transform duration-500 shadow-md" />
            </FadeIn>
          </div>

        </div>
      </section>

      {/* ─── REZENSIONEN ──────────────────────────────────────── */}
      <section className="bg-[#1a1005] text-white py-12 md:py-16 px-5 md:px-10">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="flex items-baseline gap-4 mb-8">
            <p className="text-caramel text-xs tracking-widest uppercase font-semibold">Vibes</p>
            <div className="h-px flex-1 bg-white/10" />
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
            {testimonials.map((t, i) => (
              <FadeIn key={i} delay={i * 60}>
                <div className="border border-white/8 rounded-2xl p-5 h-full flex flex-col gap-3">
                  <div className="text-caramel text-sm tracking-wider">★★★★★</div>
                  <p className="text-white/75 text-sm leading-relaxed flex-1">
                    "{t.text}"
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ÜBER UNS ─────────────────────────────────────────── */}
      <section id="uber-uns" className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn className="relative order-2 lg:order-1">
            <img
              src={IMAGES.outdoor}
              alt="Wirt auf der Terrasse"
              className="rounded-3xl w-full h-[500px] md:h-[640px] object-cover shadow-2xl"
            />
            <div className="absolute bottom-6 left-6 right-6 bg-cream rounded-2xl p-5 shadow-2xl border border-bark/8 flex items-center gap-4">
              {/* Logo on cream/light background — show naturally (black logo visible) */}
              <img src={IMAGES.logoRound} alt="Logo" className="w-16 h-16 flex-shrink-0 object-contain" />
              <div>
                <p className="font-display text-xl font-bold text-bark leading-snug">Verrückt genug,</p>
                <p className="font-display text-xl font-bold text-caramel leading-snug">um besonders zu sein.</p>
                <p className="text-bark text-sm mt-1 font-medium tracking-wide">Ruben · Inhaber & Gastgeber ❤️</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={150} className="order-1 lg:order-2">
            <p className="text-caramel text-xs tracking-widest uppercase font-semibold mb-5">Über uns</p>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-8">
              Ein Ort mit<br />echtem Charakter.
            </h2>
            <div className="space-y-5 text-bark/65 text-lg leading-relaxed">
              <p>
                Das Hoheneck verbindet alpine Gemütlichkeit mit urbaner Energie. Seit 2023 Kultstatus in Engelberg – eine Bar, ein Café und ein Treffpunkt für Menschen, die gute Musik, gutes Bier und echte Atmosphäre lieben.
              </p>
              <p>
                Vom historischen Steingewölbe bis zum letzten Deko-Stück: hier wurde nichts dem Zufall überlassen.
              </p>
              <p>
                Viele unserer Bands spielen seit der Eröffnung bei uns. Genau diese Mischung aus Geschichte, Hingabe und echter Energie macht das Hoheneck zu etwas Besonderem.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-10">
              <div className="bg-warm rounded-2xl p-6 border border-bark/5">
                <p className="font-display text-3xl font-bold text-bark">Mi–Mo</p>
                <p className="text-bark/50 text-sm mt-1">Ab 14:00 Uhr</p>
              </div>
              <div className="bg-warm rounded-2xl p-6 border border-bark/5">
                <p className="font-display text-3xl font-bold text-bark">Live!</p>
                <p className="text-bark/50 text-sm mt-1">Musik jede Woche</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── INSTAGRAM / STAY UPDATED — creative section ─────── */}
      <section className="py-0 overflow-hidden">
        {/* Full-bleed image strip with dark overlay and CTA */}
        <div className="relative">
          {/* Tiled photo collage background */}
          <div className="grid grid-cols-3 md:grid-cols-5 h-[360px] md:h-[440px]">
            {[IMAGES.barFull, IMAGES.interior3, IMAGES.cellar, IMAGES.corner, IMAGES.owner].map((src, i) => (
              <div key={i} className={`overflow-hidden ${i >= 3 ? 'hidden md:block' : ''}`}>
                <img src={src} alt="" className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-[3s]" />
              </div>
            ))}
          </div>

          {/* Overlay + content */}
          <div className="absolute inset-0 bg-gradient-to-r from-bark/95 via-bark/80 to-bark/50 flex items-center">
            <div className="max-w-7xl mx-auto px-5 md:px-10 w-full">
              <FadeIn>
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    {/* Logo on dark overlay — invert to white */}
                    <img src={IMAGES.logoRound} alt="" className="w-10 h-10 object-contain flex-shrink-0 [filter:invert(1)]" />
                    <IgIcon className="w-6 h-6 text-white/60" />
                    <span className="text-white/70 text-sm font-medium tracking-wide">@das_verrueckte_cafe</span>
                  </div>

                  <h2 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
                    Immer als Erster dabei.<br />
                    <em className="text-caramel not-italic">Folge uns auf Instagram.</em>
                  </h2>

                  <p className="text-white/65 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
                    Neue Veranstaltungen, Live-Musik-Abende, Craft-Beer-Neuheiten und Überraschungen — wer folgt, verpasst nichts. Immer aktuell, immer mittendrin.
                  </p>

                  <a
                    href="https://instagram.com/das_verrueckte_cafe"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 bg-white text-bark px-7 py-4 rounded-full text-sm font-bold tracking-wide hover:bg-caramel hover:text-white transition-all duration-300 hover:scale-105 shadow-xl"
                  >
                    <IgIcon className="w-5 h-5" />
                    Jetzt folgen
                  </a>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ─── RESERVIERUNG ─────────────────────────────────────── */}
      <section id="reservierung" className="py-20 md:py-28 px-5 md:px-10 bg-warm/40">
        <div className="max-w-7xl mx-auto">
          <div className="bg-bark rounded-[40px] overflow-hidden relative">
            <div className="absolute inset-0 opacity-10">
              <img src={IMAGES.interior3} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-caramel/20 rounded-full blur-3xl" />

            <div className="relative z-10 p-8 md:p-16 grid lg:grid-cols-2 gap-14 items-start">
              <FadeIn>
                <p className="text-caramel text-xs tracking-widest uppercase font-semibold mb-5">Reservierung</p>
                <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight text-white mb-6">
                  Dein Abend<br />beginnt hier.
                </h2>
                <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-sm">
                  Reserviere deinen Tisch für Drinks, Gute Musik oder den perfekten verrückten Abend.
                </p>
                <div className="space-y-4 text-white/70">
                  <div className="flex items-start gap-3">
                    <span className="text-caramel mt-0.5">📍</span>
                    <p>Dorfstrasse 4, 6390 Engelberg</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-caramel mt-0.5">🕒</span>
                    <div>
                      <p>Mittwoch – Montag ab 14:00 Uhr</p>
                      <p className="text-white/40 text-sm">Freitag & Samstag bis 01:30 Uhr</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-caramel mt-0.5">✉️</span>
                    <a href="mailto:info@verruecktescafe.ch" className="hover:text-caramel transition-colors">
                      info@verruecktescafe.ch
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <IgIcon className="w-5 h-5 text-caramel mt-0.5 flex-shrink-0" />
                    <a href="https://instagram.com/das_verrueckte_cafe" target="_blank" rel="noreferrer"
                      className="hover:text-caramel transition-colors">
                      @das_verrueckte_cafe
                    </a>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={150}>
                <div className="bg-cream rounded-3xl p-8 shadow-2xl">
                  {submitted ? (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-4">🎉</div>
                      <h3 className="font-display text-2xl font-bold text-bark mb-2">Anfrage gesendet!</h3>
                      <p className="text-bark/60">Wir melden uns so schnell wie möglich bei dir.</p>
                      <button onClick={() => setSubmitted(false)}
                        className="mt-6 text-caramel font-medium hover:underline text-sm">
                        Neue Anfrage
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <h3 className="font-display text-2xl font-bold text-bark mb-6">Tisch anfragen</h3>
                      <input type="text" placeholder="Dein Name *" required
                        value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-warm/50 border border-bark/10 rounded-2xl px-5 py-4 text-bark placeholder-bark/40 outline-none focus:ring-2 focus:ring-caramel/30 focus:border-caramel/50 transition-all" />
                      <input type="email" placeholder="E-Mail *" required
                        value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-warm/50 border border-bark/10 rounded-2xl px-5 py-4 text-bark placeholder-bark/40 outline-none focus:ring-2 focus:ring-caramel/30 focus:border-caramel/50 transition-all" />
                      <input type="text" placeholder="Datum & Uhrzeit"
                        value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-warm/50 border border-bark/10 rounded-2xl px-5 py-4 text-bark placeholder-bark/40 outline-none focus:ring-2 focus:ring-caramel/30 focus:border-caramel/50 transition-all" />
                      <textarea placeholder="Nachricht (Personenanzahl, Anlass...)" rows={4}
                        value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-warm/50 border border-bark/10 rounded-2xl px-5 py-4 text-bark placeholder-bark/40 outline-none focus:ring-2 focus:ring-caramel/30 focus:border-caramel/50 transition-all resize-none" />
                      <button type="submit"
                        className="w-full bg-bark text-cream py-4 rounded-2xl text-sm font-semibold tracking-wide hover:bg-caramel transition-colors duration-300 hover:scale-[1.01] active:scale-[0.99]">
                        Anfrage senden →
                      </button>
                    </form>
                  )}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ───────────────────────────────────────────── */}
      <footer className="bg-bark text-white py-14 px-5 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-5 mb-12 pb-12 border-b border-white/10">
            <img src={IMAGES.logoRound} alt="Logo" className="w-20 h-20 object-contain flex-shrink-0" />
            <div>
              <p className="font-display text-xl font-bold text-white leading-tight">Das verrückte Café</p>
              <p className="text-white/40 text-sm">zum Hoheneck · Engelberg</p>
              <p className="text-caramel text-xs mt-1 tracking-widest uppercase">ESTD 2023 ❤️</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <p className="text-caramel text-xs tracking-widest uppercase font-semibold mb-4">Öffnungszeiten</p>
              <div className="space-y-2 text-white/60 text-sm">
                <p>Mi – Mo: 14:00 – 23:00 Uhr</p>
                <p>Fr & Sa: 14:00 – 01:30 Uhr</p>
                <p className="text-white/30">Di: geschlossen</p>
              </div>
            </div>
            <div>
              <p className="text-caramel text-xs tracking-widest uppercase font-semibold mb-4">Adresse</p>
              <div className="space-y-1 text-white/60 text-sm">
                <p>Dorfstrasse 4</p>
                <p>6390 Engelberg, Schweiz</p>
              </div>
            </div>
            <div>
              <p className="text-caramel text-xs tracking-widest uppercase font-semibold mb-4">Kontakt</p>
              <div className="space-y-3 text-white/60 text-sm">
                <a href="mailto:info@verruecktescafe.ch" className="block hover:text-caramel transition-colors">
                  info@verruecktescafe.ch
                </a>
                <a href="https://instagram.com/das_verrueckte_cafe" target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 hover:text-caramel transition-colors">
                  <IgIcon className="w-4 h-4" />
                  @das_verrueckte_cafe
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-white/25 text-xs">
            <p>© {new Date().getFullYear()} Das verrückte Café zum Hoheneck · Engelberg, Schweiz</p>
            <p>Mit ❤️ aus den Alpen</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
