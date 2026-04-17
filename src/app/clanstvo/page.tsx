import { Metadata } from 'next';
import { Button } from '@/components/ui/Button';
import { PageHero } from '@/components/sections/PageHero';
import { FAQ } from '@/components/sections/FAQ';

export const metadata: Metadata = {
  title: 'Članstvo',
  description:
    'Postanite član Adriatic Padel Cluba i uživajte u ekskluzivnim pogodnostima. Odaberite plan koji odgovara vašim potrebama - od povremenog igrača do premium člana.',
  openGraph: {
    title: 'Članstvo | Adriatic Padel Club',
    description: 'Postanite član i uživajte u ekskluzivnim pogodnostima.',
  },
};

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
}

const pricingPlans: PricingPlan[] = [
  {
    name: 'Pay & Play',
    price: '25-30',
    period: '€/sat',
    description: 'Za povremene igrače koji žele fleksibilnost bez obveza.',
    features: [
      'Pristup terenima po dostupnosti',
      'Online rezervacija',
      'Korištenje svlačionica',
      'Osnovne pogodnosti kluba',
    ],
  },
  {
    name: 'Mjesečno',
    price: '99',
    period: '€/mjesec',
    description: 'Idealno za redovite igrače koji igraju nekoliko puta tjedno.',
    features: [
      '10 sati igre mjesečno',
      'Prioritetna rezervacija',
      '10% popust na dodatne sate',
      '15% popust na treninge',
      'Besplatna oprema za posudbu',
      'Pristup Member Events',
    ],
    highlighted: true,
    badge: 'Najpopularnije',
  },
  {
    name: 'Neograničeno',
    price: '199',
    period: '€/mjesec',
    description: 'Za strastvene igrače koji žele igrati bez ograničenja.',
    features: [
      'Neograničen pristup terenima',
      'VIP rezervacija 14 dana unaprijed',
      '25% popust na treninge',
      'Besplatna oprema',
      'Besplatni turniri',
      'VIP pristup događanjima',
      'Gost igra besplatno 2x mjesečno',
    ],
    badge: 'Best Value',
  },
  {
    name: 'Godišnje',
    price: '1.799',
    period: '€/godina',
    description: 'Maksimalne pogodnosti uz značajnu uštedu.',
    features: [
      'Sve iz Neograničenog plana',
      '2 mjeseca besplatno (ušteda 400€)',
      'Besplatna oprema za kupnju',
      'Prioritet na svim turnirima',
      'Ekskluzivna VIP događanja',
      'Osobni account manager',
    ],
  },
];

const benefits = [
  {
    title: 'Prioritetna rezervacija',
    description: 'Rezervirajte termine prije javnosti, do 14 dana unaprijed.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Popusti na treninge',
    description: 'Uživajte u sniženim cijenama za sve programe akademije.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Member Events',
    description: 'Pristup ekskluzivnim događanjima, turnirima i druženjima.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: 'Besplatna oprema',
    description: 'Posudba reketa i loptica bez dodatnih troškova.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
];

const faqItems = [
  {
    question: 'Kako funkcionira mjesečno članstvo?',
    answer: 'Mjesečno članstvo uključuje 10 sati igre koje možete iskoristiti tijekom mjeseca. Neiskorišteni sati se ne prenose u sljedeći mjesec, ali imate mogućnost dokupa dodatnih sati po povlaštenoj cijeni.',
  },
  {
    question: 'Mogu li zamrznuti članstvo?',
    answer: 'Da, članstvo možete zamrznuti do 30 dana godišnje bez dodatnih troškova. Za duža razdoblja kontaktirajte našu podršku.',
  },
  {
    question: 'Postoji li probno razdoblje?',
    answer: 'Nudimo prvi mjesec po promotivnoj cijeni od 69€ za nove članove. Također možete rezervirati probni termin prije učlanjenja.',
  },
  {
    question: 'Kako mogu otkazati članstvo?',
    answer: 'Članstvo možete otkazati u bilo kojem trenutku s otkaznim rokom od 30 dana. Godišnje članstvo može se otkazati nakon isteka prve godine.',
  },
];

export default function MembershipPage() {
  return (
    <>
      <PageHero
        title="Članstvo"
        subtitle="Odaberite plan koji odgovara vašem stilu igre i uživajte u ekskluzivnim pogodnostima."
        backgroundImage="/images/vincenzo-morelli-rg2ilw8QSdw-unsplash.jpg"
      />

      {/* Pricing Section */}
      <section className="py-24 bg-beige">
        <div className="container-main">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-semibold uppercase tracking-widest text-teal/60 mb-4 block">
              Planovi
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-teal leading-tight mb-6">
              Odaberite svoj plan
            </h2>
            <p className="text-lg text-teal/70">
              Bez skrivenih troškova. Jednostavno i transparentno.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`rounded-2xl p-6 flex flex-col ${
                  plan.highlighted
                    ? 'bg-lime text-teal shadow-2xl shadow-lime/30 scale-105 z-10'
                    : 'bg-white text-teal shadow-lg'
                }`}
              >
                {plan.badge && (
                  <div
                    className={`text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full inline-block self-start mb-4 ${
                      plan.highlighted
                        ? 'bg-teal text-white'
                        : 'bg-lime/10 text-lime'
                    }`}
                  >
                    {plan.badge}
                  </div>
                )}

                <h3 className="font-heading text-2xl font-bold mb-2">{plan.name}</h3>

                <div className="mb-4">
                  <span className="font-heading text-4xl font-bold">{plan.price}</span>
                  <span className={plan.highlighted ? 'text-teal/70' : 'text-teal/60'}>
                    {plan.period}
                  </span>
                </div>

                <p
                  className={`text-sm mb-6 ${
                    plan.highlighted ? 'text-teal/70' : 'text-teal/60'
                  }`}
                >
                  {plan.description}
                </p>

                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <svg
                        className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                          plan.highlighted ? 'text-teal' : 'text-lime'
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className={plan.highlighted ? 'text-teal/80' : 'text-teal/70'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  href="/kontakt"
                  variant={plan.highlighted ? 'secondary' : 'primary'}
                  fullWidth
                >
                  {plan.name === 'Pay & Play' ? 'Rezerviraj' : 'Odaberi plan'}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-teal">
        <div className="container-main">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-semibold uppercase tracking-widest text-lime mb-4 block">
              Pogodnosti
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white leading-tight">
              Zašto postati član?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-14 h-14 rounded-xl bg-lime/20 flex items-center justify-center text-lime mx-auto mb-4">
                  {benefit.icon}
                </div>
                <h3 className="font-heading text-lg font-bold text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-white/70 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 bg-beige">
        <div className="container-main">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-semibold uppercase tracking-widest text-teal/60 mb-4 block">
              Usporedba
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-teal leading-tight">
              Usporedite planove
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
              <thead className="bg-teal text-white">
                <tr>
                  <th className="p-4 text-left font-heading">Značajka</th>
                  <th className="p-4 text-center font-heading">Pay & Play</th>
                  <th className="p-4 text-center font-heading">Mjesečno</th>
                  <th className="p-4 text-center font-heading bg-lime text-teal">Neograničeno</th>
                  <th className="p-4 text-center font-heading">Godišnje</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-teal/10">
                {[
                  ['Pristup terenima', 'Po dostupnosti', '10h/mj', 'Neograničeno', 'Neograničeno'],
                  ['Rezervacija unaprijed', '7 dana', '10 dana', '14 dana', '14 dana'],
                  ['Popust na treninge', '-', '15%', '25%', '25%'],
                  ['Oprema za posudbu', 'Naplaćuje se', 'Besplatno', 'Besplatno', 'Besplatno'],
                  ['Member Events', '-', '✓', '✓', '✓'],
                  ['Turniri', 'Naplaćuje se', 'Popust', 'Besplatno', 'Besplatno'],
                  ['Gost igra besplatno', '-', '-', '2x/mj', '4x/mj'],
                ].map((row, index) => (
                  <tr key={index}>
                    <td className="p-4 font-medium text-teal">{row[0]}</td>
                    <td className="p-4 text-center text-teal/70">{row[1]}</td>
                    <td className="p-4 text-center text-teal/70">{row[2]}</td>
                    <td className="p-4 text-center text-teal font-semibold bg-lime/10">
                      {row[3]}
                    </td>
                    <td className="p-4 text-center text-teal/70">{row[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-teal/60 mb-4 block">
                FAQ
              </span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-teal leading-tight mb-6">
                Često postavljana pitanja
              </h2>
              <p className="text-lg text-teal/70 mb-8">
                Imate dodatna pitanja? Slobodno nas kontaktirajte.
              </p>
              <Button href="/kontakt" variant="outline">
                Kontaktirajte nas
              </Button>
            </div>

            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <details
                  key={index}
                  className="group bg-beige rounded-xl overflow-hidden"
                >
                  <summary className="p-6 cursor-pointer flex items-center justify-between font-heading font-semibold text-teal hover:text-lime transition-colors list-none">
                    {item.question}
                    <svg
                      className="w-5 h-5 transition-transform group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                  <div className="px-6 pb-6 text-teal/70">{item.answer}</div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-teal">
        <div className="container-main text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            Spremni postati član?
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Pridružite se našoj rastućoj zajednici i uživajte u svim pogodnostima članstva.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/kontakt" variant="lime" size="lg">
              Postani član
            </Button>
            <Button
              href="https://playtomic.io"
              external
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white hover:text-teal"
            >
              Probaj prvo
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
