import {
  Wifi, GlassWater, BatteryCharging, UserCheck, ShieldCheck, Armchair, Check,
  Phone, MessageCircle,
} from 'lucide-react'

export const defaultRateCardConfig = {
  serviceName: 'RIDE',
  tagline: 'Chauffeur Service',
  validFrom: '2026-07-01',
  note: 'Rates subject to revision. Major event dates may carry separate pricing.',
  contact: { phone: '+971 58 594 1541', methods: ['call', 'whatsapp'] },
  seasons: [
    { id: 'summer', label: 'Summer', range: 'Jun 1 to Sep 30' },
    { id: 'winter', label: 'Winter', range: 'Oct 1 to May 31' },
  ],
  hourlyRates: [
    { type: 'Standard booking', summer: 180, winter: 250 },
    { type: 'Returning client', summer: 160, winter: 220 },
    { type: 'Referral (first booking)', summer: 160, winter: 220 },
    { type: 'Loyalty reward (every 10th trip)', summer: 140, winter: 140 },
  ],
  hourlyRatesNote: 'Returning client rates apply automatically from your second booking onward. Referred guests get returning client pricing on their first ride.',
  surcharges: [
    { destination: 'Sharjah / Ajman', amount: 150 },
    { destination: 'Ras Al Khaimah / Umm Al Quwain / Fujairah', amount: 250 },
    { destination: 'Abu Dhabi / Al Ain', amount: 350 },
  ],
  surchargesNote: 'Flat, per trip, year round. Covers tolls, fuel and return positioning. Hourly billing applies to time on hire.',
  included: ['Free WiFi', 'Bottled water', 'Professional chauffeur', 'Phone charging'],
  currency: 'AED',
}

function getIncludedIcon(label) {
  const value = label.toLowerCase()
  if (value.includes('wifi')) return Wifi
  if (value.includes('water')) return GlassWater
  if (value.includes('charg') || value.includes('phone')) return BatteryCharging
  if (value.includes('chauffeur') || value.includes('driver')) return UserCheck
  if (value.includes('privacy') || value.includes('safety')) return ShieldCheck
  if (value.includes('comfort') || value.includes('leather') || value.includes('seat')) return Armchair
  return Check
}

function formatCurrency(amount, currency) {
  if (typeof amount !== 'number') return ''
  return `${currency} ${amount}`
}

function formatValidFrom(dateStr) {
  if (!dateStr) return ''
  const [year, month] = dateStr.split('-').map(Number)
  if (!year || !month) return ''
  const date = new Date(year, month - 1, 1)
  const formatted = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date)
  return `Valid from ${formatted}`
}

function lowestSeasonValue(row, seasons) {
  const values = seasons
    .map((season) => row[season.id])
    .filter((value) => typeof value === 'number')
  return values.length ? Math.min(...values) : null
}

function digitsOnly(phone) {
  return phone.replace(/[^\d]/g, '')
}

function ContactButton({ method, phone, serviceName }) {
  const baseClasses = 'inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-3 rounded-sm border border-line text-text text-sm hover:border-accent hover:bg-bg/40 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2'

  if (method === 'call') {
    return (
      <a href={`tel:${digitsOnly(phone)}`} className={baseClasses}>
        <Phone className="text-accent w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
        Call
      </a>
    )
  }

  if (method === 'whatsapp') {
    const message = `Hi, I would like to book a ride with ${serviceName}.`
    const href = `https://wa.me/${digitsOnly(phone)}?text=${encodeURIComponent(message)}`
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={baseClasses}>
        <MessageCircle className="text-accent w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
        WhatsApp
      </a>
    )
  }

  return null
}

export default function RateCard({ config = defaultRateCardConfig }) {
  const {
    serviceName,
    tagline,
    validFrom,
    note,
    contact,
    seasons,
    hourlyRates,
    hourlyRatesNote,
    surcharges,
    surchargesNote,
    included,
    currency,
  } = config

  return (
    <div className="w-full max-w-3xl mx-auto bg-bg-elevated border border-line rounded-sm p-6 sm:p-10">
      <div className="mb-10 text-center sm:text-left">
        <div className="flex items-baseline gap-3 justify-center sm:justify-start">
          <span className="font-serif text-3xl text-accent">{serviceName}</span>
          <span className="text-text-muted text-sm">{tagline}</span>
        </div>
        <p className="text-text-muted text-sm mt-2">{formatValidFrom(validFrom)}</p>
      </div>

      <div className="mb-10">
        <h3 className="font-serif text-xl text-text mb-4">Hourly Rates</h3>

        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="text-left py-3 pr-4 font-normal text-text-muted">
                  Booking type
                </th>
                {seasons.map((season) => (
                  <th key={season.id} scope="col" className="text-left py-3 px-4 font-normal">
                    <span className="block text-text">{season.label}</span>
                    <span className="block text-xs font-normal text-text-muted">{season.range}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {hourlyRates.map((row) => {
                const min = lowestSeasonValue(row, seasons)
                return (
                  <tr key={row.type} className="border-b border-line last:border-0">
                    <th scope="row" className="text-left py-3 pr-4 font-normal text-text">
                      {row.type}
                    </th>
                    {seasons.map((season) => {
                      const value = row[season.id]
                      const isMin = typeof value === 'number' && value === min
                      return (
                        <td
                          key={season.id}
                          className={`py-3 px-4 text-text ${isMin ? 'bg-accent/10 border border-accent rounded-sm' : ''}`}
                        >
                          {formatCurrency(value, currency)}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="md:hidden flex flex-col gap-4">
          {hourlyRates.map((row) => {
            const min = lowestSeasonValue(row, seasons)
            return (
              <div key={row.type} className="border border-line rounded-sm p-4">
                <p className="text-text mb-3">{row.type}</p>
                <div className="flex flex-col gap-2">
                  {seasons.map((season) => {
                    const value = row[season.id]
                    const isMin = typeof value === 'number' && value === min
                    return (
                      <div
                        key={season.id}
                        className={`flex items-center justify-between rounded-sm px-3 py-2 ${isMin ? 'bg-accent/10 border border-accent' : ''}`}
                      >
                        <span className="text-text-muted text-sm">{season.label}</span>
                        <span className="text-text text-sm">{formatCurrency(value, currency)}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {hourlyRatesNote && <p className="text-text-muted text-xs mt-4">{hourlyRatesNote}</p>}
      </div>

      <div className="mb-10">
        <h3 className="font-serif text-xl text-text mb-4">Out of Emirate Surcharges</h3>
        <ul className="flex flex-col">
          {surcharges.map((surcharge) => (
            <li
              key={surcharge.destination}
              className="flex items-center justify-between gap-4 py-3 border-b border-line last:border-0"
            >
              <span className="text-text text-sm">{surcharge.destination}</span>
              <span className="text-accent text-sm font-serif whitespace-nowrap flex-shrink-0">{formatCurrency(surcharge.amount, currency)}</span>
            </li>
          ))}
        </ul>
        {surchargesNote && <p className="text-text-muted text-xs mt-4">{surchargesNote}</p>}
      </div>

      <div className="mb-10">
        <h3 className="font-serif text-xl text-text mb-4">Included</h3>
        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}>
          {included.map((item) => {
            const Icon = getIncludedIcon(item)
            return (
              <div key={item} className="flex items-center gap-3">
                <Icon className="text-accent w-5 h-5 flex-shrink-0" strokeWidth={1.5} />
                <span className="text-text text-sm">{item}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="pt-6 border-t border-line">
        <div className="flex flex-col sm:flex-row gap-3">
          {contact.methods.map((method) => (
            <ContactButton key={method} method={method} phone={contact.phone} serviceName={serviceName} />
          ))}
        </div>
        {note && <p className="text-text-muted text-xs mt-4">{note}</p>}
      </div>
    </div>
  )
}
