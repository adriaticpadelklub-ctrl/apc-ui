import { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { PageHero } from '@/components/sections/PageHero';
import { FAQ } from '@/components/sections/FAQ';

export const metadata: Metadata = {
  title: 'Tereni',
  description:
    'Pogledajte naše vrhunske padel terene u Planu blizu Trogira. 6 premium indoor terena s LED rasvjetom i najmodernijom opremom. Rezervirajte online.',
  openGraph: {
    title: 'Tereni | Adriatic Padel Club',
    description: 'Vrhunski padel tereni u Planu blizu Trogira. Rezervirajte online.',
  },
};

const BOOKING_URL = 'https://playtomic.io/tenant/8a79dede-5d90-4063-b037-84d3ca17c09d?utm_source=app_ios&utm_campaign=share';

interface Court {
  id: number;
  name: string;
  type: 'indoor' | 'outdoor';
  surface: string;
  dimensions: string;
  image: string;
  features: string[];
  pricePerHour: number;
}

const courts: Court[] = [
  {
    id: 1,
    name: 'Teren 1 - Premium Indoor',
    type: 'indoor',
    surface: 'Umjetna trava PRO',
    dimensions: '20m x 10m',
    image: '/images/vincenzo-morelli-Cj35lHL4atY-unsplash.jpg',
    features: ['LED rasvjeta', 'Panoramski pogled', 'Tribine za 50 gledatelja'],
    pricePerHour: 30,
  },
  {
    id: 2,
    name: 'Teren 2 - Premium Indoor',
    type: 'indoor',
    surface: 'Umjetna trava PRO',
    dimensions: '20m x 10m',
    image: '/images/vincenzo-morelli-WnxmzCNuDmU-unsplash.jpg',
    features: ['LED rasvjeta', 'Live streaming', 'Za natjecanja'],
    pricePerHour: 30,
  },
  {
    id: 3,
    name: 'Teren 3 - Indoor',
    type: 'indoor',
    surface: 'Umjetna trava',
    dimensions: '20m x 10m',
    image: '/images/vincenzo-morelli-aYTK2HNocNw-unsplash.jpg',
    features: ['LED rasvjeta', 'Besplatan parking'],
    pricePerHour: 25,
  },
  {
    id: 4,
    name: 'Teren 4 - Indoor',
    type: 'indoor',
    surface: 'Umjetna trava',
    dimensions: '20m x 10m',
    image: '/images/vincenzo-morelli-rg2ilw8QSdw-unsplash.jpg',
    features: ['LED rasvjeta', 'Za početnike', 'Obiteljski prijateljski'],
    pricePerHour: 25,
  },
  {
    id: 5,
    name: 'Teren 5 - Indoor Premium',
    type: 'indoor',
    surface: 'Umjetna trava PRO',
    dimensions: '20m x 10m',
    image: '/images/cal-gao-CA3laY8sok0-unsplash.jpg',
    features: ['LED rasvjeta', 'Za turnire', 'Tribine', 'VIP pristup'],
    pricePerHour: 28,
  },
  {
    id: 6,
    name: 'Teren 6 - 1v1 Teren',
    type: 'indoor',
    surface: 'Umjetna trava',
    dimensions: '20m x 10m',
    image: '/images/vincenzo-morelli-Cj35lHL4atY-unsplash.jpg',
    features: ['LED rasvjeta', 'Za solo vježbu', 'Video analiza'],
    pricePerHour: 22,
  },
];

const amenities = [
  { name: 'Svlačionice', icon: '🚿' },
  { name: 'Besplatan parking', icon: '🅿️' },
  { name: 'Cafe bar', icon: '☕' },
  { name: 'Pro shop', icon: '🎾' },
  { name: 'WiFi', icon: '📶' },
  { name: 'Najam opreme', icon: '🏓' },
];

export default function CourtsPage() {
  return (
    <>
      <PageHero
        title="Naši Tereni"
        subtitle="6 premium indoor terena opremljenih najmodernijom tehnologijom za vrhunsko padel iskustvo."
        backgroundImage="/images/hero-player.jpg"
      />

      {/* Courts Grid */}
      <section className="py-24 bg-beige">
        <div className="container-main">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-semibold uppercase tracking-widest text-teal/60 mb-4 block">
              Tereni
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-teal leading-tight mb-6">
              Odaberite svoj teren
            </h2>
            <p className="text-lg text-teal/70">
              Svi naši tereni zadovoljavaju najviše standarde kvalitete i održavaju se
              svakodnevno za optimalno iskustvo igre.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courts.map((court) => (
              <div
                key={court.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative p-6 bg-teal">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-xl bg-lime flex items-center justify-center">
                      <span className="font-heading text-2xl font-bold text-teal">{court.id}</span>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                        court.type === 'indoor'
                          ? 'bg-white/20 text-white'
                          : 'bg-white/90 text-teal'
                      }`}
                    >
                      {court.type === 'indoor' ? 'Indoor' : 'Outdoor'}
                    </div>
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-white mt-4">
                    {court.name}
                  </h3>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-teal/60 mb-4">
                    <span>{court.surface}</span>
                    <span>•</span>
                    <span>{court.dimensions}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {court.features.map((feature, index) => (
                      <span
                        key={index}
                        className="text-xs bg-beige px-2 py-1 rounded-full text-teal/70"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-teal/10">
                    <div>
                      <span className="font-heading text-2xl font-bold text-teal">
                        {court.pricePerHour}€
                      </span>
                      <span className="text-teal/60 text-sm">/sat</span>
                    </div>
                    <Button href={BOOKING_URL} external variant="primary" size="sm">
                      Rezerviraj
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-24 bg-teal">
        <div className="container-main">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-semibold uppercase tracking-widest text-lime mb-4 block">
              Sadržaji
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white leading-tight">
              Sve što trebate na jednom mjestu
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {amenities.map((amenity, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
              >
                <span className="text-4xl mb-3 block">{amenity.icon}</span>
                <span className="text-white font-medium">{amenity.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Info */}
      <section className="py-24 bg-beige">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-teal/60 mb-4 block">
                Rezervacije
              </span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-teal leading-tight mb-6">
                Kako rezervirati?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-lime flex items-center justify-center font-heading font-bold text-teal flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-teal mb-1">
                      Odaberite termin
                    </h3>
                    <p className="text-teal/70">
                      Pregledajte dostupne termine putem naše online platforme.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-lime flex items-center justify-center font-heading font-bold text-teal flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-teal mb-1">
                      Rezervirajte online
                    </h3>
                    <p className="text-teal/70">
                      Potvrdite rezervaciju i izvršite plaćanje online ili na licu mjesta.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-lime flex items-center justify-center font-heading font-bold text-teal flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-teal mb-1">
                      Dođite i igrajte
                    </h3>
                    <p className="text-teal/70">
                      Prijavite se na recepciji 10 minuta prije početka termina.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button href={BOOKING_URL} external variant="primary" size="lg">
                  Rezerviraj sada
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="font-heading text-2xl font-bold text-teal mb-6">
                Radno vrijeme
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-teal/10">
                  <span className="text-teal">Ponedjeljak - Petak</span>
                  <span className="font-semibold text-teal">08:00 - 24:00</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-teal/10">
                  <span className="text-teal">Subota</span>
                  <span className="font-semibold text-teal">08:00 - 24:00</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-teal/10">
                  <span className="text-teal">Nedjelja</span>
                  <span className="font-semibold text-teal">08:00 - 24:00</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-teal">Praznici</span>
                  <span className="font-semibold text-teal">08:00 - 24:00</span>
                </div>
              </div>

                          </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-teal">
        <div className="container-main text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            Spremni za igru?
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Rezervirajte svoj termin i uživajte u vrhunskom padel iskustvu.
          </p>
          <Button href={BOOKING_URL} external variant="lime" size="lg">
            Rezerviraj Teren
          </Button>
        </div>
      </section>
    </>
  );
}
