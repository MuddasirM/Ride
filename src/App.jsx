import { useEffect, useRef, useState } from 'react'
import {
  Plane, Briefcase, Heart, MapPin,
  ShieldCheck, Clock, Armchair, Phone,
  MessageCircle, Menu, X,
} from 'lucide-react'
import RateCard, { defaultRateCardConfig } from './components/RateCard'

const WA_NUMBER = '971585941541'
const WA_DISPLAY = '+971 58 594 1541'
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi, I'd like to book a ride.")}`
const TEL_URL = `tel:${WA_DISPLAY.replace(/\s/g, '')}`

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Fleet', href: '#fleet' },
  { label: 'Rates', href: '#rates' },
  { label: 'Why Ride', href: '#promise' },
]

const SERVICES = [
  {
    Icon: Plane,
    title: 'Airport Transfers',
    desc: 'Flight-tracked pickups at DXB, DWC, AUH, and SHJ, every trip dispatched from our Dubai base. Your driver arrives early. Your schedule is never at risk.',
  },
  {
    Icon: Briefcase,
    title: 'Corporate & Executive',
    desc: 'Discreet, punctual, and professional. Executive travel for meetings, roadshows, and business across the UAE.',
  },
  {
    Icon: Heart,
    title: 'Weddings & Events',
    desc: 'Make every arrival memorable. We provide luxury transport for weddings, galas, and private occasions.',
  },
  {
    Icon: MapPin,
    title: 'Leisure & City Drives',
    desc: 'Your city, your pace: travel Dubai or anywhere in the UAE in comfort, hourly or point-to-point, your call.',
  },
]

const TRUST_POINTS = [
  { Icon: Clock, label: 'Available 24/7' },
  { Icon: MapPin, label: 'Based in Dubai, UAE-wide' },
  { Icon: ShieldCheck, label: 'Fully private, every trip' },
  { Icon: Plane, label: 'Airport transfers' },
]

const PILLARS = [
  {
    Icon: ShieldCheck,
    title: 'Complete Privacy',
    desc: 'Your trip stays your business. Tinted windows, no in-cabin recording, absolute discretion.',
  },
  {
    Icon: Clock,
    title: 'Always On Time',
    desc: 'We track your flight, read the traffic, and arrive early. Punctuality is non-negotiable.',
  },
  {
    Icon: Armchair,
    title: 'Supreme Comfort',
    desc: 'Full-size SUVs with premium leather, ample legroom, quiet cabins, and climate control.',
  },
  {
    Icon: MessageCircle,
    title: 'Honest Pricing',
    desc: 'Premium quality, competitive rates. No surprises, no hidden fees: the price you agree is the price you pay.',
  },
]

const FLEET_FEATURES = [
  'Full-size SUVs, built for comfort and presence',
  'Premium leather seating for up to seven',
  'Dual-zone climate control',
  'Privacy tinted windows',
  'Generous cargo space for all luggage',
  'Phone charging at every seat',
  'Ultra-quiet, refined cabin',
  'Professional, uniformed chauffeur',
]

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [heroVisible, setHeroVisible] = useState(true)
  const [nearFooter, setNearFooter] = useState(false)
  const heroRef = useRef(null)
  const footerRef = useRef(null)

  useEffect(() => {
    const hero = heroRef.current
    const footer = footerRef.current
    if (!hero || !footer) return

    const heroObserver = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { rootMargin: '-64px 0px 0px 0px' }
    )
    heroObserver.observe(hero)

    const footerObserver = new IntersectionObserver(
      ([entry]) => setNearFooter(entry.isIntersecting),
      { rootMargin: '0px 0px -10% 0px' }
    )
    footerObserver.observe(footer)

    return () => {
      heroObserver.disconnect()
      footerObserver.disconnect()
    }
  }, [])

  const hideFloatingCta = heroVisible || nearFooter

  return (
    <div className="min-h-screen bg-bg text-text font-sans">

      {/* Floating WhatsApp: redundant while the hero's own WhatsApp CTA or the footer's are already in view */}
      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-hidden={hideFloatingCta}
        tabIndex={hideFloatingCta ? -1 : 0}
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-accent hover:bg-accent/90 text-bg px-5 py-3 rounded-sm shadow-2xl transition-opacity motion-reduce:transition-none duration-200 text-sm font-medium ${hideFloatingCta ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <MessageCircle className="w-4 h-4" aria-hidden="true" />
        WhatsApp
      </a>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 border-b border-line bg-bg/90 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="text-accent text-2xl tracking-[0.3em] font-serif font-light">
            RIDE
          </a>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} className="text-xs text-text-muted hover:text-text transition-colors tracking-[0.15em] uppercase">
                {l.label}
              </a>
            ))}
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs border border-accent/60 text-accent px-5 py-2 rounded-sm tracking-[0.1em] uppercase hover:bg-accent hover:text-bg transition-colors duration-200"
            >
              Book Now
            </a>
          </div>
          <button
            className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center -mr-2 text-text-muted hover:text-text transition-colors"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
          </button>
        </div>

        {menuOpen && (
          <div id="mobile-menu" className="md:hidden bg-bg-elevated border-t border-line px-6 pb-6 pt-5 flex flex-col gap-5">
            {NAV_LINKS.map(l => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="text-xs text-text-muted hover:text-text uppercase tracking-[0.15em] transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center text-xs border border-accent/60 text-accent px-5 py-3 rounded-sm tracking-[0.1em] uppercase hover:bg-accent hover:text-bg transition-colors duration-200 mt-1"
            >
              Book Now
            </a>
          </div>
        )}
      </nav>

      <main>
        {/* Hero */}
        <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-16 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />
          </div>
          <div
            role="img"
            aria-label="A chauffeured private vehicle at night in the UAE"
            className="absolute inset-0 bg-[url('/images/hero.jpg')] bg-cover bg-center"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-bg/70 via-bg/85 to-bg" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-line to-transparent" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <p className="text-accent/85 text-[10px] tracking-[0.5em] uppercase mb-10 font-medium">
              Private Chauffeur, United Arab Emirates
            </p>
            <h1
              className="text-[clamp(2.5rem,6vw+1rem,5.5rem)] font-serif font-light leading-[1.1] mb-7 text-text text-balance"
            >
              Travel the way<br />
              <span className="text-accent">you deserve.</span>
            </h1>
            <p className="text-text-muted text-base md:text-lg max-w-lg mx-auto mb-12 leading-relaxed text-pretty">
              A private fleet based in Dubai, every trip starts here and reaches anywhere in the UAE. Quiet comfort, honest pricing, and a ride that arrives on time, every time.
            </p>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-accent text-bg px-8 py-4 rounded-sm font-medium tracking-[0.1em] uppercase text-xs hover:bg-accent/90 transition-colors duration-200 shadow-lg shadow-accent/10"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              Book on WhatsApp
            </a>
            <p className="text-text-muted text-[10px] mt-5 tracking-[0.3em] uppercase">
              Available 24/7, Dubai & All UAE
            </p>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted scroll-cue-motion">
            <div className="w-px h-10 bg-gradient-to-b from-accent/30 to-transparent" />
          </div>
        </section>

        {/* Trust row */}
        <section className="border-y border-line bg-bg-elevated">
          <div className="max-w-4xl mx-auto px-6 py-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {TRUST_POINTS.map(({ Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5 text-text-muted text-xs tracking-[0.1em] uppercase">
                <Icon className="w-4 h-4 text-accent" aria-hidden="true" strokeWidth={1.5} />
                {label}
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-28 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2
                className="text-[clamp(1.75rem,3vw+1rem,2.75rem)] font-serif font-light text-text text-balance"
              >
                Every journey, covered.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line">
              {SERVICES.map(({ Icon, title, desc }) => (
                <div
                  key={title}
                  className="bg-bg p-10 md:p-12 hover:bg-bg-elevated transition-colors duration-300 group"
                >
                  <div className="text-accent/40 group-hover:text-accent/80 transition-colors duration-300 mb-6">
                    <Icon className="w-6 h-6" strokeWidth={1.25} aria-hidden="true" />
                  </div>
                  <h3
                    className="text-xl text-text mb-3 font-serif font-light"
                  >
                    {title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed text-pretty">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Fleet */}
        <section id="fleet" className="py-28 px-6 bg-bg-elevated border-y border-line">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2
                className="text-[clamp(1.75rem,3vw+1rem,2.75rem)] font-serif font-light text-text leading-snug text-balance"
              >
                One standard.<br />Every time.
              </h2>
              <p className="text-text-muted text-sm max-w-sm mx-auto leading-relaxed mt-5 text-pretty">
                Every vehicle is maintained to the same meticulous level. You&apos;ll never notice a difference.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div
                role="img"
                aria-label="Interior of a private chauffeur vehicle"
                className="relative aspect-[16/10] bg-[url('/images/fleet.jpg')] bg-bg-elevated bg-cover bg-center rounded-sm overflow-hidden border border-line"
              >
                <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-accent/30" />
                <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-accent/30" />
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-accent/30" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-accent/30" />
              </div>

              <ul className="flex flex-col gap-4">
                {FLEET_FEATURES.map(f => (
                  <li key={f} className="flex items-center gap-4 text-sm text-text-muted group">
                    <span className="w-5 h-px bg-accent/40 flex-shrink-0 group-hover:bg-accent/70 transition-colors" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Rates */}
        <section id="rates" className="py-28 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2
                className="text-[clamp(1.75rem,3vw+1rem,2.75rem)] font-serif font-light text-text text-balance"
              >
                Clear rates, no surprises.
              </h2>
            </div>
            <RateCard config={defaultRateCardConfig} />
          </div>
        </section>

        {/* Promise */}
        <section id="promise" className="py-28 px-6 bg-bg-elevated border-y border-line">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2
                className="text-[clamp(1.75rem,3vw+1rem,2.75rem)] font-serif font-light text-text text-balance"
              >
                The Ride Promise
              </h2>
            </div>
            <div className="flex flex-col">
              {PILLARS.map(({ Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-6 py-8 border-t border-line first:border-t-0">
                  <Icon className="w-6 h-6 text-accent flex-shrink-0 mt-1" strokeWidth={1.25} aria-hidden="true" />
                  <div>
                    <h3 className="text-lg text-text mb-2 font-serif font-light">
                      {title}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed text-pretty">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Book CTA */}
        <section className="py-28 px-6">
          <div className="max-w-xl mx-auto text-center">
            <h2
              className="text-[clamp(2rem,4vw+1rem,3.5rem)] font-serif font-light text-text mb-4 leading-snug text-balance"
            >
              Your ride is one<br />message away.
            </h2>
            <p className="text-text-muted text-sm mb-10 leading-relaxed max-w-xs mx-auto text-pretty">
              Send us your pickup, destination, and time. We&apos;ll confirm and take care of the rest.
            </p>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-accent text-bg px-10 py-4 rounded-sm font-medium tracking-[0.1em] uppercase text-xs hover:bg-accent/90 transition-colors duration-200 shadow-lg shadow-accent/10"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              Start on WhatsApp
            </a>
            <p className="text-text-muted text-[10px] mt-5 tracking-[0.3em] uppercase">
              Typically responds within minutes
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer ref={footerRef} className="border-t border-line py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <span
            className="text-accent text-xl tracking-[0.3em] font-serif font-light"
          >
            RIDE
          </span>
          <p className="text-text-muted text-[10px] tracking-[0.25em] uppercase">
            Private Chauffeur, United Arab Emirates
          </p>
          <div className="flex items-center gap-5">
            <a
              href={TEL_URL}
              className="flex items-center gap-1.5 text-text-muted hover:text-accent text-[10px] tracking-[0.2em] uppercase transition-colors"
            >
              <Phone className="w-3 h-3" aria-hidden="true" />
              {WA_DISPLAY}
            </a>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-text-muted hover:text-accent text-[10px] tracking-[0.2em] uppercase transition-colors"
            >
              <MessageCircle className="w-3 h-3" aria-hidden="true" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </footer>

    </div>
  )
}
