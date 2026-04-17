import { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { PageHero } from '@/components/sections/PageHero';

export const metadata: Metadata = {
  title: 'Akademija',
  description:
    'Padel akademija Adriatic Padel Cluba nudi profesionalne treninge za sve razine. Od početnika do naprednih igrača - naši certificirani treneri pomoći će vam napredovati.',
  openGraph: {
    title: 'Akademija | Adriatic Padel Club',
    description: 'Profesionalni padel treninzi za sve razine. Pridružite se našoj akademiji.',
  },
};

interface Program {
  name: string;
  level: string;
  description: string;
  features: string[];
  price: string;
  duration: string;
}

const programs: Program[] = [
  {
    name: 'Početnik',
    level: 'Level 1',
    description: 'Idealan program za one koji tek počinju s padelom. Naučite osnove i zaljubite se u ovaj sport.',
    features: [
      'Osnove tehnike (forehand, backhand)',
      'Pravila igre i bodovanja',
      'Pozicioniranje na terenu',
      'Osnovni udarci',
      'Grupni treninzi (4-6 igrača)',
    ],
    price: '80€',
    duration: '4 tjedna / 8 termina',
  },
  {
    name: 'Srednji',
    level: 'Level 2',
    description: 'Za igrače koji poznaju osnove i žele unaprijediti svoju igru na višu razinu.',
    features: [
      'Napredne tehnike udaraca',
      'Taktika igre u paru',
      'Rad na mreži',
      'Lob i bandeja',
      'Grupni treninzi (4 igrača)',
    ],
    price: '120€',
    duration: '4 tjedna / 8 termina',
  },
  {
    name: 'Napredni',
    level: 'Level 3',
    description: 'Program za iskusne igrače koji žele usavršiti svoju igru i pripremiti se za natjecanja.',
    features: [
      'Vibora i smash tehnike',
      'Napredna taktika',
      'Mentalna priprema',
      'Video analiza igre',
      'Mali grupni treninzi (2-4 igrača)',
    ],
    price: '160€',
    duration: '4 tjedna / 8 termina',
  },
  {
    name: 'Privatni',
    level: 'Individual',
    description: 'Individualni pristup s našim trenerom za maksimalan napredak u kratkom vremenu.',
    features: [
      'Personalizirani program',
      '1-na-1 s trenerom',
      'Fleksibilni termini',
      'Video analiza',
      'Praćenje napretka',
    ],
    price: '50€',
    duration: 'Po terminu (60 min)',
  },
];

interface Coach {
  name: string;
  title: string;
  specialization: string;
  image: string;
  certifications: string[];
}

const coaches: Coach[] = [
  {
    name: 'Marko Horvat',
    title: 'Glavni trener',
    specialization: 'Napredna tehnika i taktika',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    certifications: ['FIP Level 3', 'WPT Coach Certificate'],
  },
  {
    name: 'Ana Kovačević',
    title: 'Trener akademije',
    specialization: 'Početnici i djeca',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    certifications: ['FIP Level 2', 'Youth Development'],
  },
  {
    name: 'Ivan Perić',
    title: 'Fitness trener',
    specialization: 'Kondicija i snaga',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    certifications: ['NSCA-CPT', 'Sports Performance'],
  },
  {
    name: 'Petra Babić',
    title: 'Trener natjecatelja',
    specialization: 'Turnirska priprema',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
    certifications: ['FIP Level 3', 'Mental Coaching'],
  },
];

const schedule = [
  { day: 'Ponedjeljak', classes: ['Početnici 18:00', 'Napredni 19:30'] },
  { day: 'Utorak', classes: ['Djeca 17:00', 'Srednji 18:30'] },
  { day: 'Srijeda', classes: ['Početnici 18:00', 'Napredni 19:30'] },
  { day: 'Četvrtak', classes: ['Djeca 17:00', 'Srednji 18:30'] },
  { day: 'Petak', classes: ['Početnici 18:00', 'Open play 19:30'] },
  { day: 'Subota', classes: ['Svi nivoi 09:00', 'Turniri 14:00'] },
  { day: 'Nedjelja', classes: ['Open play 10:00'] },
];

export default function AcademyPage() {
  return (
    <>
      <PageHero
        title="Padel Akademija"
        subtitle="Profesionalni treninzi za sve razine igrača. Od početnika do profesionalaca."
        backgroundImage="/images/vincenzo-morelli-aYTK2HNocNw-unsplash.jpg"
      />

      {/* Programs Section */}
      <section className="py-24 bg-beige">
        <div className="container-main">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-semibold uppercase tracking-widest text-teal/60 mb-4 block">
              Programi
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-teal leading-tight mb-6">
              Odaberite svoj program
            </h2>
            <p className="text-lg text-teal/70">
              Svaki program je pažljivo dizajniran da vam pomogne napredovati kroz strukturirane
              treninge s našim certificiranim trenerima.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                <div className="mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-lime bg-lime/10 px-2 py-1 rounded-full">
                    {program.level}
                  </span>
                </div>

                <h3 className="font-heading text-2xl font-bold text-teal mb-2">
                  {program.name}
                </h3>

                <p className="text-teal/70 text-sm mb-6">{program.description}</p>

                <ul className="space-y-2 mb-6 flex-grow">
                  {program.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-teal/70">
                      <svg
                        className="w-4 h-4 text-lime flex-shrink-0 mt-0.5"
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
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-teal/10">
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="font-heading text-3xl font-bold text-teal">
                      {program.price}
                    </span>
                  </div>
                  <p className="text-sm text-teal/60 mb-4">{program.duration}</p>
                  <Button href="/kontakt" variant="primary" fullWidth>
                    Prijavi se
                  </Button>
                </div>
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
              Naši treneri
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Učite od najboljih
            </h2>
            <p className="text-lg text-white/70">
              Naš tim certificiranih trenera posvećen je vašem napretku i razvoju vaše igre.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coaches.map((coach, index) => (
              <div key={index} className="group">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-6">
                  <Image
                    src={coach.image}
                    alt={coach.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal via-transparent to-transparent opacity-80" />

                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex flex-wrap gap-1">
                      {coach.certifications.map((cert, i) => (
                        <span
                          key={i}
                          className="text-xs bg-lime/90 text-teal px-2 py-0.5 rounded-full"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <h3 className="font-heading text-xl font-bold text-white mb-1 group-hover:text-lime transition-colors">
                  {coach.name}
                </h3>
                <p className="text-lime text-sm mb-1">{coach.title}</p>
                <p className="text-white/60 text-sm">{coach.specialization}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-24 bg-beige">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-teal/60 mb-4 block">
                Raspored
              </span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-teal leading-tight mb-6">
                Tjedni raspored treninga
              </h2>
              <p className="text-lg text-teal/70 mb-8">
                Nudimo treninge tijekom cijelog tjedna kako bismo se prilagodili vašem rasporedu.
                Grupni treninzi imaju ograničen broj mjesta pa preporučujemo ranu prijavu.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-lime" />
                  <span className="text-teal">Početnici</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-teal" />
                  <span className="text-teal">Srednji</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-teal-light" />
                  <span className="text-teal">Napredni</span>
                </div>
              </div>

              <div className="mt-8">
                <Button href="/kontakt" variant="primary" size="lg">
                  Prijavi se na trening
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="space-y-4">
                {schedule.map((day, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 py-4 border-b border-teal/10 last:border-0"
                  >
                    <div className="w-24 flex-shrink-0">
                      <span className="font-heading font-bold text-teal">{day.day}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {day.classes.map((cls, i) => (
                        <span
                          key={i}
                          className="text-sm bg-beige px-3 py-1 rounded-full text-teal"
                        >
                          {cls}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kids Program */}
      <section className="py-24 bg-teal">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/vincenzo-morelli-WnxmzCNuDmU-unsplash.jpg"
                alt="Djeca igraju padel"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-lime mb-4 block">
                Junior program
              </span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                Padel za djecu i mlade
              </h2>
              <p className="text-lg text-white/70 mb-6">
                Posebno dizajniran program za mlade igrače od 6 do 16 godina. Kroz igru i zabavu
                razvijamo ljubav prema sportu, koordinaciju i timski duh.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  'Mini Padel (6-9 godina)',
                  'Junior Padel (10-13 godina)',
                  'Teen Padel (14-16 godina)',
                  'Natjecateljski program',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-white/80">
                    <svg
                      className="w-5 h-5 text-lime flex-shrink-0"
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
                    {item}
                  </li>
                ))}
              </ul>

              <Button href="/kontakt" variant="lime" size="lg">
                Saznaj više
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-beige">
        <div className="container-main text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-teal leading-tight mb-6">
            Spremni za napredak?
          </h2>
          <p className="text-lg text-teal/70 max-w-2xl mx-auto mb-8">
            Pridružite se našoj akademiji i otkrijte svoj puni potencijal uz profesionalno
            vodstvo naših trenera.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/kontakt" variant="primary" size="lg">
              Prijavi se
            </Button>
            <Button href="https://playtomic.io" external variant="outline" size="lg">
              Probni trening
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
