import { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/sections/PageHero';
import { supabase } from '@/lib/supabase';
import type { Tournament } from '@/types/tournament';

export const metadata: Metadata = {
  title: 'Turniri',
  description:
    'Pregledajte aktivne turnire i njihove rezultate u Adriatic Padel Clubu.',
  openGraph: {
    title: 'Turniri | Adriatic Padel Club',
    description: 'Pregledajte aktivne turnire i njihove rezultate.',
  },
};

export const revalidate = 60;

async function getTournaments(): Promise<Tournament[]> {
  try {
    const { data, error } = await supabase
      .from('tournaments')
      .select('*')
      .in('status', ['active', 'completed'])
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching tournaments:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Failed to fetch tournaments:', err);
    return [];
  }
}

export default async function TournamentsPage() {
  const tournaments = await getTournaments();

  const activeTournaments = tournaments.filter((t) => t.status === 'active');
  const completedTournaments = tournaments.filter((t) => t.status === 'completed');

  return (
    <>
      <PageHero
        title="Turniri"
        subtitle="Pregledajte aktivne turnire i pratite rezultate"
        backgroundImage="/images/turniri.jpg"
      />

      <section className="py-24 bg-beige">
        <div className="container-main">
          {activeTournaments.length > 0 && (
            <div className="mb-16">
              <span className="text-sm font-semibold uppercase tracking-widest text-teal/60 mb-4 block">
                U tijeku
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-teal leading-tight mb-8">
                Aktivni turniri
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeTournaments.map((tournament) => (
                  <Link
                    key={tournament.id}
                    href={`/turniri/${tournament.id}`}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        Aktivan
                      </span>
                      <span className="text-sm text-teal/50">
                        {tournament.bracket_size} timova
                      </span>
                    </div>
                    <h3 className="font-heading text-xl font-bold text-teal mb-2">
                      {tournament.name}
                    </h3>
                    <p className="text-teal/60 text-sm">
                      Kliknite za pregled bracketa →
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {completedTournaments.length > 0 && (
            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-teal/60 mb-4 block">
                Arhiva
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-teal leading-tight mb-8">
                Završeni turniri
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedTournaments.map((tournament) => (
                  <Link
                    key={tournament.id}
                    href={`/turniri/${tournament.id}`}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-teal/10 text-teal">
                        Završen
                      </span>
                      <span className="text-sm text-teal/50">
                        {tournament.bracket_size} timova
                      </span>
                    </div>
                    <h3 className="font-heading text-xl font-bold text-teal mb-2">
                      {tournament.name}
                    </h3>
                    <p className="text-teal/60 text-sm">
                      Pogledaj rezultate →
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {tournaments.length === 0 && (
            <div className="text-center py-16">
              <h2 className="font-heading text-2xl font-bold text-teal mb-4">
                Trenutno nema aktivnih turnira
              </h2>
              <p className="text-teal/60 max-w-md mx-auto">
                Pratite nas za najave novih turnira. Uskoro planiramo organizirati
                nove natjecateljske događaje.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
