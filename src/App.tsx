import { useState, useEffect, useRef } from 'react'

const IMAGES = {
  outdoor: '/images/img1.webp',       // outdoor terrace, guy with beer
  bar: '/images/img2.webp',           // bar interior with disco balls
  disco: '/images/img3.webp',         // bar with freefall beer + disco helmet
  beers: '/images/img4.webp',         // craft beer bottles on bar
  vault: '/images/img5.webp',         // stone vault cellar seating
  beer2: '/images/img6.webp',         // craft beer bottles close-up
  barFull: '/images/img7.webp',       // full bar with flamingo tap
  owner: '/images/img8.webp',         // owner pouring beer
  cellar: '/images/img9.webp',        // cellar bar view
  terrace: '/images/img10.webp',      // outdoor terrace building
}

const testimonials = [
  {
    name: 'Markus Mahler',
    text: 'Augustiner offen, kreatives Essen, gutes Ambiente, Live-Musik. Einfach ein sehr cooler Schuppen.',
  },
  {
    name: 'Joe Kretz',
    text: 'Hier trifft sich Engelberg und Stockholm. Mix aus Locals, Touristen, Musikliebhaber und Barhänger.',
  },
  {
    name: 'Google User',
    text: 'Qualitativ hochwertige Drinks und Food im gemütlichen Lokal. Alles frisch, handgemacht und mit Abstand das beste Lokal im Dorf.',
  },
  {
    name: 'Claudia Steinmann',
    text: 'Sehr willkommen gefühlt. Lockere Atmosphäre, regionales Essen und unglaublich sympathischer Service.',
  },
]

const highlights = [
  { emoji: '🎸', title: 'Live Musik & DJ Nächte', desc: 'Legendäre Live-Bands, kultige DJ-Sets und echte Après-Ski Energie bis spät in die Nacht.' },
  { emoji: '🍺', title: 'Craft Beer & Drinks', desc: 'Premium Cocktails, kaltes Augustiner vom Hahn und Locher Craft Beer in einzigartigen Sorten.' },
  { emoji: '🏔️', title: 'Gemütlicher Gewölbekeller', desc: 'Ruhige Ecken im historischen Steingewölbe – warm, einzigartig und zum Wohlfühlen gemacht.' },
  { emoji: '🍽️', title: 'Kreative Küche', desc: 'Frische Zutaten, regionale Produkte und ehrliches Food mit modernem Twist.' },
]

function useIntersection(threshold = 0.15) {
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

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
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
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const marqueeItems = ['Live Musik', 'Craft Beer', 'Après-Ski', 'Gewölbekeller', 'Engelberg', 'Locher Craft', 'DJ Nächte', 'Outdoor Terrasse']

  return (
    <div className="bg-cream text-bark overflow-x-hidden">

      {/* ─── NAV ─────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-cream/95 backdrop-blur-xl shadow-sm border-b border-bark/10' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-bark flex items-center justify-center text-cream text-lg font-display font-bold group-hover:bg-caramel transition-colors">
              H
            </div>
            <div>
              <p className={`text-xs tracking-widest uppercase transition-colors ${scrolled ? 'text-bark/50' : 'text-white/60'}`}>
                Engelberg
              </p>
              <p className={`font-display font-semibold text-sm leading-tight transition-colors ${scrolled ? 'text-bark' : 'text-white'}`}>
                Das verrückte Café
              </p>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {['Atmosphäre', 'Erlebnis', 'Galerie', 'Über uns'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace('ü', 'u')}`}
                className={`transition-colors hover:text-caramel ${scrolled ? 'text-bark/70' : 'text-white/80'}`}
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#reservierung"
              className="hidden md:inline-flex bg-bark text-cream px-5 py-2.5 rounded-full text-sm font-medium hover:bg-caramel transition-colors duration-300"
            >
              Reservieren
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`md:hidden w-8 h-8 flex flex-col justify-center gap-1.5 ${scrolled ? 'text-bark' : 'text-white'}`}
            >
              <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden bg-cream/98 backdrop-blur-xl transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-64 border-b border-bark/10' : 'max-h-0'}`}>
          <div className="px-5 pb-6 space-y-4 pt-2">
            {['Atmosphäre', 'Erlebnis', 'Galerie', 'Über uns', 'Reservieren'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace('ü', 'u').replace(' ', '-')}`}
                onClick={() => setMenuOpen(false)}
                className="block text-bark font-medium hover:text-caramel transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-end pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={IMAGES.bar}
            alt="Das verrückte Café zum Hoheneck – Bar"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bark/90 via-bark/40 to-bark/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-bark/30 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm text-white/90 text-xs tracking-widest uppercase mb-8 animate-fadeUp">
              <span className="w-1.5 h-1.5 rounded-full bg-caramel animate-pulse" />
              Engelbergs kultigstes Lokal
            </div>

            <h1 className="font-display text-white text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.92] tracking-tight mb-6 animate-fadeUp" style={{ animationDelay: '100ms' }}>
              Das verrückte<br />
              <em className="text-caramel not-italic">Café</em> zum<br />
              Hoheneck.
            </h1>

            <p className="text-white/75 text-lg md:text-xl leading-relaxed max-w-xl mb-10 animate-fadeUp" style={{ animationDelay: '200ms' }}>
              Ein verrücktes Café, in dem erstaunlich wenig Kaffee getrunken wird. Dafür umso lieber Craft Beer, Live-Musik und Nächte voller Stimmung.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 animate-fadeUp" style={{ animationDelay: '300ms' }}>
              <a
                href="#reservierung"
                className="bg-caramel text-white px-8 py-4 rounded-full text-sm font-semibold tracking-wide hover:bg-amber-600 transition-all duration-300 hover:scale-105 text-center"
              >
                Tisch reservieren
              </a>
              <a
                href="#erlebnis"
                className="border border-white/30 text-white px-8 py-4 rounded-full text-sm font-semibold tracking-wide hover:bg-white/10 transition-all duration-300 text-center backdrop-blur-sm"
              >
                Mehr entdecken
              </a>
            </div>

            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 animate-fadeUp" style={{ animationDelay: '400ms' }}>
              {[
                { value: '4.7★', label: 'Google Bewertung' },
                { value: 'Live', label: 'Bands jede Woche' },
                { value: '1.2K+', label: 'Instagram Fans' },
                { value: 'Kultstatus', label: 'seit Jahren' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-white text-2xl md:text-3xl font-display font-bold">{stat.value}</p>
                  <p className="text-white/55 text-xs mt-1 tracking-wide">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-10 text-white/40 text-xs tracking-widest uppercase rotate-90 hidden md:block animate-fadeUp">
          Scroll
        </div>
      </section>

      {/* ─── MARQUEE ──────────────────────────────────────────── */}
      <div className="bg-bark text-cream py-4 overflow-hidden border-y border-caramel/30">
        <div className="flex animate-marquee whitespace-nowrap gap-0">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-4 px-8 text-sm font-medium tracking-widest uppercase">
              <span className="text-caramel">✦</span>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ─── ATMOSPHÄRE ───────────────────────────────────────── */}
      <section id="atmosphare" className="py-24 md:py-32 px-5 md:px-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <p className="text-caramel text-xs tracking-widest uppercase font-semibold mb-5">Atmosphäre</p>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-8">
              Zwischen Après-Ski,<br />
              <em>Kultbar</em> und<br />
              Wohnzimmer.
            </h2>
            <p className="text-bark/65 text-lg leading-relaxed mb-6">
              Das verrückte Café zum Hoheneck ist kein gewöhnliches Lokal. Hier treffen sich Locals, Musikliebhaber, Reisende und Nachtschwärmer – in einem Raum mit echtem Charakter.
            </p>
            <p className="text-bark/65 text-lg leading-relaxed mb-10">
              Disco-Kugeln neben Weinflaschen-Lampenschirmen, Blumentapeten im Steingewölbekeller, ein Flamingo auf dem Zapfhahn – so entsteht eine Energie, die man anderswo nicht findet.
            </p>
            <a href="#erlebnis" className="inline-flex items-center gap-2 text-caramel font-semibold hover:gap-4 transition-all duration-300">
              Mehr erfahren <span>→</span>
            </a>
          </FadeIn>

          <FadeIn delay={150} className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img
                src={IMAGES.barFull}
                alt="Bar mit Disco-Kugel"
                className="rounded-2xl w-full h-64 object-cover shadow-lg"
              />
              <img
                src={IMAGES.vault}
                alt="Gewölbekeller"
                className="rounded-2xl w-full h-64 object-cover shadow-lg mt-8"
              />
              <img
                src={IMAGES.outdoor}
                alt="Terrasse"
                className="rounded-2xl w-full h-52 object-cover shadow-lg"
              />
              <img
                src={IMAGES.cellar}
                alt="Kellerbar"
                className="rounded-2xl w-full h-52 object-cover shadow-lg mt-4"
              />
            </div>

            <div className="absolute -bottom-6 -left-6 bg-bark text-cream rounded-2xl px-6 py-5 shadow-2xl animate-float hidden md:block">
              <p className="font-display text-3xl font-bold text-caramel">4.7★</p>
              <p className="text-white/60 text-xs mt-1 max-w-[140px]">Beste Bar in Engelberg</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── ERLEBNIS / HIGHLIGHTS ────────────────────────────── */}
      <section id="erlebnis" className="bg-bark text-cream py-24 md:py-32 px-5 md:px-10">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <p className="text-caramel text-xs tracking-widest uppercase font-semibold mb-4">Erlebnis</p>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
              <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight max-w-2xl">
                Mehr als eine Bar.<br />
                <em className="text-caramel">Viel mehr.</em>
              </h2>
              <p className="text-white/50 text-lg max-w-sm md:text-right">
                Jedes Detail ist darauf ausgelegt, dass du dich sofort willkommen fühlst.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-5 mb-16">
            {highlights.map((h, i) => (
              <FadeIn key={h.title} delay={i * 80}>
                <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-3xl p-8 md:p-10 transition-all duration-400 group hover:-translate-y-1">
                  <div className="w-14 h-14 rounded-2xl bg-caramel/20 flex items-center justify-center text-2xl mb-7 group-hover:scale-110 transition-transform">
                    {h.emoji}
                  </div>
                  <h3 className="font-display text-xl md:text-2xl font-semibold mb-3 tracking-tight">{h.title}</h3>
                  <p className="text-white/55 leading-relaxed">{h.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Opening hours strip */}
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
              <a
                href="#reservierung"
                className="bg-caramel text-white px-7 py-4 rounded-2xl text-sm font-semibold tracking-wide hover:bg-amber-600 transition-colors whitespace-nowrap text-center"
              >
                Tisch reservieren
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── GALERIE ──────────────────────────────────────────── */}
      <section id="galerie" className="py-24 md:py-32 px-5 md:px-10">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <p className="text-caramel text-xs tracking-widest uppercase font-semibold mb-4">Galerie</p>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-16 max-w-2xl">
              Bilder sagen mehr als<br />tausend Worte.
            </h2>
          </FadeIn>

          {/* Masonry-style grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {/* Big hero image */}
            <FadeIn className="col-span-2 row-span-2">
              <img
                src={IMAGES.owner}
                alt="Wirt zapft Bier"
                className="rounded-3xl w-full h-80 md:h-[480px] object-cover hover:scale-[1.02] transition-transform duration-500 shadow-lg"
              />
            </FadeIn>

            <FadeIn delay={60}>
              <img
                src={IMAGES.bar}
                alt="Bar Innenraum"
                className="rounded-3xl w-full h-52 md:h-[232px] object-cover hover:scale-[1.02] transition-transform duration-500 shadow-lg"
              />
            </FadeIn>

            <FadeIn delay={90}>
              <img
                src={IMAGES.vault}
                alt="Steingewölbe"
                className="rounded-3xl w-full h-52 md:h-[232px] object-cover hover:scale-[1.02] transition-transform duration-500 shadow-lg"
              />
            </FadeIn>

            <FadeIn delay={120}>
              <img
                src={IMAGES.cellar}
                alt="Kellerbar"
                className="rounded-3xl w-full h-52 md:h-[232px] object-cover hover:scale-[1.02] transition-transform duration-500 shadow-lg"
              />
            </FadeIn>

            <FadeIn delay={150}>
              <img
                src={IMAGES.barFull}
                alt="Vollständige Bar"
                className="rounded-3xl w-full h-52 md:h-[232px] object-cover hover:scale-[1.02] transition-transform duration-500 shadow-lg"
              />
            </FadeIn>

            <FadeIn delay={60} className="col-span-2">
              <img
                src={IMAGES.terrace}
                alt="Terrasse Engelberg"
                className="rounded-3xl w-full h-56 md:h-64 object-cover hover:scale-[1.02] transition-transform duration-500 shadow-lg object-top"
              />
            </FadeIn>

            <FadeIn delay={90}>
              <img
                src={IMAGES.disco}
                alt="Craft Beer"
                className="rounded-3xl w-full h-56 md:h-64 object-cover hover:scale-[1.02] transition-transform duration-500 shadow-lg"
              />
            </FadeIn>

            <FadeIn delay={120}>
              <img
                src={IMAGES.beer2}
                alt="Locher Craft Beer"
                className="rounded-3xl w-full h-56 md:h-64 object-cover hover:scale-[1.02] transition-transform duration-500 shadow-lg"
              />
            </FadeIn>

            <FadeIn delay={150}>
              <img
                src={IMAGES.beers}
                alt="Craft Beer Sortiment"
                className="rounded-3xl w-full h-56 md:h-64 object-cover hover:scale-[1.02] transition-transform duration-500 shadow-lg"
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── REZENSIONEN ──────────────────────────────────────── */}
      <section className="bg-[#1a1005] text-white py-24 md:py-32 px-5 md:px-10">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <p className="text-caramel text-xs tracking-widest uppercase font-semibold mb-4">Rezensionen</p>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-16 max-w-3xl">
              "Die Stimmung kann man nicht erklären.<br />
              <em className="text-caramel">Man muss sie erleben."</em>
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-5">
            {testimonials.map((t, i) => (
              <FadeIn key={t.name} delay={i * 80}>
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 hover:bg-white/8 transition-all duration-300 h-full flex flex-col">
                  <div className="text-caramel text-xl mb-6 tracking-wider">★★★★★</div>
                  <p className="font-display text-xl md:text-2xl leading-relaxed text-white/90 flex-1 tracking-tight">
                    "{t.text}"
                  </p>
                  <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-caramel/30 flex items-center justify-center text-caramel font-bold font-display">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{t.name}</p>
                      <p className="text-white/40 text-xs mt-0.5">Google Rezension</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ÜBER UNS ─────────────────────────────────────────── */}
      <section id="uber-uns" className="py-24 md:py-32 px-5 md:px-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn className="relative order-2 lg:order-1">
            <img
              src={IMAGES.outdoor}
              alt="Wirt auf der Terrasse"
              className="rounded-3xl w-full h-[500px] md:h-[650px] object-cover shadow-2xl"
            />
            <div className="absolute bottom-6 left-6 right-6 bg-cream/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
              <p className="font-display text-2xl font-bold text-bark">Verrückt genug,</p>
              <p className="font-display text-2xl font-bold text-caramel">um besonders zu sein.</p>
              <p className="text-bark/60 text-sm mt-2">Das Hoheneck, Engelberg ❤️</p>
            </div>
          </FadeIn>

          <FadeIn delay={150} className="order-1 lg:order-2">
            <p className="text-caramel text-xs tracking-widest uppercase font-semibold mb-5">Über uns</p>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-8">
              Ein Ort mit<br />echtem Charakter.
            </h2>
            <div className="space-y-5 text-bark/65 text-lg leading-relaxed">
              <p>
                Das Hoheneck verbindet alpine Gemütlichkeit mit urbaner Energie. Seit Jahren Kultstatus in Engelberg – eine Bar, ein Café und ein Treffpunkt für Menschen, die gute Musik, ehrliche Drinks und echte Atmosphäre lieben.
              </p>
              <p>
                Unser historisches Steingewölbe im Keller, die eigenwillige Deko mit Disco-Kugeln und Vintage-Leuchten, der Flamingo auf dem Zapfhahn – alles hat seinen Grund, alles hat seine Geschichte.
              </p>
              <p>
                Viele unserer Bands spielen seit Jahren bei uns und haben Kultstatus erreicht. Genau diese Mischung aus Tradition, Charakter und Offenheit macht das Hoheneck einzigartig.
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

            <div className="flex gap-4 mt-8">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-bark/70 hover:text-caramel transition-colors font-medium"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Instagram
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── RESERVIERUNG ─────────────────────────────────────── */}
      <section id="reservierung" className="py-24 md:py-32 px-5 md:px-10 bg-warm/40">
        <div className="max-w-7xl mx-auto">
          <div className="bg-bark rounded-[40px] overflow-hidden relative">
            {/* Background image overlay */}
            <div className="absolute inset-0 opacity-10">
              <img src={IMAGES.barFull} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-caramel/20 rounded-full blur-3xl" />

            <div className="relative z-10 p-8 md:p-16 grid lg:grid-cols-2 gap-14 items-start">
              <FadeIn>
                <p className="text-caramel text-xs tracking-widest uppercase font-semibold mb-5">Reservierung</p>
                <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight text-white mb-6">
                  Dein Abend<br />beginnt hier.
                </h2>
                <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-sm">
                  Reserviere deinen Tisch für Drinks, Live-Musik oder den perfekten Abend mit Freunden.
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
                    <p>info@hoheneck-engelberg.ch</p>
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
                      <button
                        onClick={() => setSubmitted(false)}
                        className="mt-6 text-caramel font-medium hover:underline text-sm"
                      >
                        Neue Anfrage
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <h3 className="font-display text-2xl font-bold text-bark mb-6">Tisch anfragen</h3>
                      <input
                        type="text"
                        placeholder="Dein Name *"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-warm/50 border border-bark/10 rounded-2xl px-5 py-4 text-bark placeholder-bark/40 outline-none focus:ring-2 focus:ring-caramel/30 focus:border-caramel/50 transition-all"
                      />
                      <input
                        type="email"
                        placeholder="E-Mail *"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-warm/50 border border-bark/10 rounded-2xl px-5 py-4 text-bark placeholder-bark/40 outline-none focus:ring-2 focus:ring-caramel/30 focus:border-caramel/50 transition-all"
                      />
                      <input
                        type="text"
                        placeholder="Datum & Uhrzeit"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-warm/50 border border-bark/10 rounded-2xl px-5 py-4 text-bark placeholder-bark/40 outline-none focus:ring-2 focus:ring-caramel/30 focus:border-caramel/50 transition-all"
                      />
                      <textarea
                        placeholder="Nachricht (Personenanzahl, Anlass...)"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-warm/50 border border-bark/10 rounded-2xl px-5 py-4 text-bark placeholder-bark/40 outline-none focus:ring-2 focus:ring-caramel/30 focus:border-caramel/50 transition-all resize-none"
                      />
                      <button
                        type="submit"
                        className="w-full bg-bark text-cream py-4 rounded-2xl text-sm font-semibold tracking-wide hover:bg-caramel transition-colors duration-300 hover:scale-[1.01] active:scale-[0.99]"
                      >
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
      <footer className="bg-bark text-white py-12 px-5 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-caramel flex items-center justify-center font-display font-bold text-white text-lg">
                  H
                </div>
                <div>
                  <p className="font-display font-bold text-white">Das verrückte Café</p>
                  <p className="text-white/40 text-xs">zum Hoheneck</p>
                </div>
              </div>
              <p className="text-white/50 text-sm leading-relaxed">
                Engelbergs kultigstes Lokal für Live-Musik, Craft Beer und unvergessliche Nächte.
              </p>
            </div>

            <div>
              <p className="text-caramel text-xs tracking-widest uppercase font-semibold mb-4">Öffnungszeiten</p>
              <div className="space-y-2 text-white/60 text-sm">
                <p>Mi – Mo: 14:00 – 23:00 Uhr</p>
                <p>Fr & Sa: 14:00 – 01:30 Uhr</p>
                <p className="text-white/30">Di: geschlossen</p>
              </div>
            </div>

            <div>
              <p className="text-caramel text-xs tracking-widest uppercase font-semibold mb-4">Kontakt</p>
              <div className="space-y-2 text-white/60 text-sm">
                <p>Dorfstrasse 4</p>
                <p>6390 Engelberg, Schweiz</p>
                <a href="https://instagram.com" className="flex items-center gap-2 text-white/60 hover:text-caramel transition-colors mt-3">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  @dasverrucktecafe
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-white/30 text-xs">
            <p>© {new Date().getFullYear()} Das verrückte Café zum Hoheneck · Engelberg, Schweiz</p>
            <p>Mit ❤️ aus den Alpen</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
