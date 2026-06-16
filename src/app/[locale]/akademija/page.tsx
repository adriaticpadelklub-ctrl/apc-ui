import { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { PageHero } from '@/components/sections/PageHero';

export const metadata: Metadata = {
  title: 'Padel Akademija',
  description:
    'Pridružite se našoj padel akademiji. Profesionalni treninzi za sve razine - od početnika do naprednih igrača. Certificirani treneri i individualni pristup.',
  openGraph: {
    title: 'Padel Akademija | Adriatic Padel Club',
    description: 'Profesionalni padel treninzi za sve razine igrača.',
  },
};

const BOOKING_URL = 'https://playtomic.io/tenant/8a79dede-5d90-4063-b037-84d3ca17c09d?utm_source=app_ios&utm_campaign=share';

const coaches = [
  {
    name: 'Matija Selak',
    image: '/images/trainers/matija-selak.jpg',
    achievements: [
      'Višestruki prvak Hrvatske u padelu',
      'Licencirani padel trener s više od 9 godina iskustva',
      'Prvak Central European Tour ciklusa',
    ],
  },
  {
    name: 'Grgo Dujmović',
    image: '/images/trainers/grgo-dujmović.jpg',
    achievements: [
      'Bivši tenisač s 16 godina natjecateljskog iskustva',
      'Državni prvak Hrvatske u padelu 2025.',
      'Spoj teniskog znanja i moderne padel igre',
    ],
  },
  {
    name: 'Jerko Brkić',
    image: '/images/trainers/jerko-brkić.JPG',
    achievements: [
      'Državni prvak Hrvatske u tenisu i padelu',
      'Licencirani teniski i padel trener',
      'U sportu od svoje 6. godine',
    ],
  },
];

const programs = [
  {
    title: 'Početnici',
    description: 'Savršeno za one koji tek počinju s padelom. Naučite osnove tehnike, pravila igre i taktike.',
    features: ['Osnove tehnike', 'Pravila igre', 'Pozicioniranje na terenu', 'Grupni i individualni treninzi'],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    ),
  },
  {
    title: 'Srednja razina',
    description: 'Za igrače koji žele unaprijediti svoju igru i usavršiti tehniku.',
    features: ['Napredne tehnike', 'Taktička igra', 'Rad na slabostima', 'Priprema za turnire'],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    title: 'Napredni',
    description: 'Intenzivni programi za natjecatelje i ambiciozne igrače.',
    features: ['Natjecateljska priprema', 'Video analiza', 'Fizička priprema', 'Mentalni trening'],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
];

export default function AcademyPage() {
  return (
    <>
      <PageHero
        title="Padel Akademija"
        subtitle="Profesionalni treninzi za sve razine igrača. Razvijte svoju igru uz naše certificirane trenere."
        backgroundImage="/images/academy.png"
      />

      {/* Programs Section */}
      <section className="py-24 bg-beige">
        <div className="container-main">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-semibold uppercase tracking-widest text-teal/60 mb-4 block">
              Programi
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-teal leading-tight mb-6">
              Treninzi za svaku razinu
            </h2>
            <p className="text-lg text-teal/70">
              Bez obzira jeste li početnik ili iskusan igrač, imamo program prilagođen vašim potrebama.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program) => (
              <div
                key={program.title}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 rounded-xl bg-lime/20 flex items-center justify-center text-teal mb-6">
                  {program.icon}
                </div>
                <h3 className="font-heading text-2xl font-bold text-teal mb-3">
                  {program.title}
                </h3>
                <p className="text-teal/70 mb-6">{program.description}</p>
                <ul className="space-y-2">
                  {program.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-teal/80">
                      <svg className="w-5 h-5 text-lime flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coaches Section */}
      <section className="py-24 bg-teal">
        <div className="container-main">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-semibold uppercase tracking-widest text-lime mb-4 block">
              Naš tim
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Upoznajte naše trenere
            </h2>
            <p className="text-lg text-white/70">
              Naši certificirani treneri posvećeni su vašem napretku i uspjehu.
            </p>
          </div>

          <div className="space-y-12 max-w-5xl mx-auto">
            {coaches.map((coach, index) => (
              <div
                key={coach.name}
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center bg-white/5 rounded-3xl p-6 md:p-8`}
              >
                <div className="relative w-full md:w-1/3 aspect-square rounded-2xl overflow-hidden flex-shrink-0">
                  <Image
                    src={coach.image}
                    alt={coach.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-3xl font-bold text-white mb-4">
                    {coach.name}
                  </h3>
                  <ul className="space-y-3">
                    {coach.achievements.map((achievement, achIndex) => (
                      <li key={achIndex} className="flex items-start gap-3 text-white/80">
                        <span className="w-2 h-2 rounded-full bg-lime mt-2 flex-shrink-0" />
                        <span className="text-lg">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-lime">
        <div className="container-main text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-teal leading-tight mb-6">
            Spremni za napredak?
          </h2>
          <p className="text-lg text-teal/70 max-w-2xl mx-auto mb-10">
            Rezervirajte svoj prvi trening i započnite put prema boljoj igri.
          </p>
          <Button href={BOOKING_URL} external variant="secondary" size="lg">
            Rezerviraj trening
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Button>
        </div>
      </section>
    </>
  );
}
