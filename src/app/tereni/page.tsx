import { Metadata } from 'next';
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

const courts = [
  { id: 1, name: 'Teren 1', type: 'Premium Indoor', features: ['Full panoramic'], price: '30€/sat • 44€/sat i pol' },
  { id: 2, name: 'Teren 2', type: 'Premium Indoor', features: ['Full panoramic'], price: '30€/sat • 44€/sat i pol' },
  { id: 3, name: 'Teren 3', type: 'Premium Indoor', features: ['Full panoramic'], price: '30€/sat • 44€/sat i pol' },
  { id: 4, name: 'Teren 4', type: 'Premium Indoor', features: ['Full panoramic'], price: '30€/sat • 44€/sat i pol' },
  { id: 5, name: 'Teren 5', type: 'Premium Indoor', features: ['Full panoramic'], price: '30€/sat • 44€/sat i pol' },
  { id: 6, name: 'Teren 6', type: 'Premium 1v1 Teren', features: ['Full panoramic'], price: '22€/sat' },
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
      <section className="py-24 bg-teal">
        <div className="container-main">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-semibold uppercase tracking-widest text-lime mb-4 block">
              Tereni
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Odaberite svoj teren
            </h2>
            <p className="text-lg text-white/70">
              Svi naši tereni zadovoljavaju najviše standarde kvalitete i održavaju se
              svakodnevno za optimalno iskustvo igre.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courts.map((court) => (
              <div
                key={court.id}
                className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 hover:border-lime/30 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-lime flex items-center justify-center font-heading text-xl font-bold text-teal flex-shrink-0">
                    {court.id}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-lg font-bold text-white mb-1">
                      {court.name}
                    </h3>
                    <p className="text-lime text-sm font-medium mb-2">{court.type}</p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {court.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-white/10 text-white/70 px-2 py-0.5 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    <p className="text-white/60 text-sm">{court.price}</p>
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
