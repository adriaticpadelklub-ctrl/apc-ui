import { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { PageHero } from '@/components/sections/PageHero';
import { GallerySection } from '@/components/sections/GallerySection';

export const metadata: Metadata = {
  title: 'O nama',
  description:
    'Saznajte više o Adriatic Padel Clubu - našoj priči i misiji. Smješteni u Planu blizu Trogira, posvećeni smo razvoju padel zajednice na Jadranu.',
  openGraph: {
    title: 'O nama | Adriatic Padel Club',
    description: 'Saznajte više o Adriatic Padel Clubu - našoj priči i misiji.',
  },
};

const values = [
  {
    title: 'Strast',
    description: 'Padel nije samo sport za nas - to je način života koji dijelimo s našom zajednicom.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: 'Kvaliteta',
    description: 'Pružamo vrhunske terene i usluge jer vjerujemo da naši članovi zaslužuju najbolje.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    title: 'Zajednica',
    description: 'Gradimo prijateljstva i povezujemo ljude kroz ljubav prema padelu.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: 'Razvoj',
    description: 'Kontinuirano ulažemo u edukaciju i infrastrukturu za napredak naših članova.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
];

const milestones = [
  { year: '2026', title: 'Otvaranje centra', description: 'Otvorili smo moderne indoor terene.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Naša priča"
        subtitle="Saznajte više o Adriatic Padel Clubu i našoj misiji."
        backgroundImage="/images/about-us.jpg"
      />

      {/* Story Section */}
      <section className="py-24 bg-beige">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-teal/60 mb-4 block">
                Naša priča
              </span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-teal leading-tight mb-6">
                Od strasti do realnosti
              </h2>
              <div className="space-y-4 text-teal/70 leading-relaxed">
                <p>
                  Adriatic Padel Club rođen je iz strasti prema padelu i želje da ovaj
                  dinamični sport dovedemo na obale Jadrana. Smješteni u Planu blizu Trogira,
                  naš klub je središte padel zajednice u regiji.
                </p>
                <p>
                  Iza kluba stoje dva osnivača - srebrni Vatreni i višestruki prvak Hrvatske
                  u padelu. Njihovo iskustvo i strast čine temelj našeg kluba. Uz moderan
                  sportski kompleks s šest profesionalnih indoor terena i timom certificiranih
                  trenera, pružamo vrhunsko padel iskustvo.
                </p>
                <p>
                  Naša misija je jednostavna: učiniti padel dostupnim svima, od potpunih
                  početnika do profesionalnih natjecatelja. Vjerujemo da padel nije samo
                  sport - to je način života koji povezuje ljude i stvara trajnja prijateljstva.
                </p>
              </div>
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image
                src="/images/smash.jpg"
                alt="Padel igrač u akciji"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-teal">
        <div className="container-main">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-semibold uppercase tracking-widest text-lime mb-4 block">
              Naše vrijednosti
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white leading-tight">
              Što nas pokreće
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-xl bg-lime/20 flex items-center justify-center text-lime mx-auto mb-6">
                  {value.icon}
                </div>
                <h3 className="font-heading text-xl font-bold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-white/70">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-beige">
        <div className="container-main">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-semibold uppercase tracking-widest text-teal/60 mb-4 block">
              Naš put
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-teal leading-tight">
              Ključni trenuci
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-8 mb-12 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-lime flex items-center justify-center font-heading font-bold text-teal">
                    {milestone.year}
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 flex-1 bg-teal/20 mt-4" />
                  )}
                </div>
                <div className="pt-3">
                  <h3 className="font-heading text-xl font-bold text-teal mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-teal/70">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <GallerySection />

      {/* CTA Section */}
      <section className="py-24 bg-teal">
        <div className="container-main text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            Postanite dio naše priče
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Pridružite se zajednici koja dijeli strast prema padelu. Rezervirajte
            svoj prvi termin ili nas posjetite kako biste upoznali klub uživo.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="https://playtomic.io/tenant/8a79dede-5d90-4063-b037-84d3ca17c09d?utm_source=app_ios&utm_campaign=share" external variant="lime" size="lg">
              Rezerviraj Teren
            </Button>
            <Button
              href="/kontakt"
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white hover:text-teal"
            >
              Kontaktirajte nas
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
