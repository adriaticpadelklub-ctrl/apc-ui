import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PageHero } from '@/components/sections/PageHero';
import { supabase } from '@/lib/supabase';
import type { TournamentWithDetails } from '@/types/tournament';
import { TournamentBracketClient } from './TournamentBracketClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

export const revalidate = 30;

async function getTournament(id: string): Promise<TournamentWithDetails | null> {
  const [
    { data: tournament, error: tournamentError },
    { data: teams, error: teamsError },
    { data: matches, error: matchesError },
  ] = await Promise.all([
    supabase.from('tournaments').select('*').eq('id', id).single(),
    supabase.from('teams').select('*').eq('tournament_id', id).order('seed'),
    supabase.from('matches').select('*').eq('tournament_id', id).order('round').order('position'),
  ]);

  if (tournamentError || !tournament) {
    console.error('Error fetching tournament:', tournamentError);
    return null;
  }

  if (teamsError || matchesError) {
    console.error('Error fetching details:', teamsError || matchesError);
  }

  return {
    ...tournament,
    teams: teams || [],
    matches: matches || [],
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const tournament = await getTournament(id);

  if (!tournament) {
    return {
      title: 'Turnir nije pronađen',
    };
  }

  return {
    title: tournament.name,
    description: `Pregledajte bracket i rezultate turnira ${tournament.name}`,
    openGraph: {
      title: `${tournament.name} | Adriatic Padel Club`,
      description: `Pregledajte bracket i rezultate turnira ${tournament.name}`,
    },
  };
}

export default async function TournamentPage({ params }: PageProps) {
  const { id } = await params;
  const tournament = await getTournament(id);

  if (!tournament || tournament.status === 'draft') {
    notFound();
  }

  const finalMatch = tournament.matches.find(
    (m) => m.round === Math.log2(tournament.bracket_size)
  );
  const winner = tournament.teams.find((t) => t.id === finalMatch?.winner_id);

  return (
    <>
      <PageHero
        title={tournament.name}
        subtitle={
          tournament.status === 'completed' && winner
            ? `Pobjednik: ${winner.name}`
            : `${tournament.bracket_size} timova u natjecanju`
        }
        backgroundImage="/images/turniri.jpg"
      />

      <section className="py-12 bg-beige">
        <div className="container-main">
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/turniri"
              className="text-teal/60 hover:text-teal transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Natrag na turnire
            </Link>
            <span
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                tournament.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-teal/10 text-teal'
              }`}
            >
              {tournament.status === 'active' ? 'Turnir u tijeku' : 'Turnir završen'}
            </span>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="font-heading text-2xl font-bold text-teal mb-6">
              Bracket
            </h2>
            <TournamentBracketClient tournament={tournament} />
          </div>

          {tournament.teams.length > 0 && (
            <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h2 className="font-heading text-2xl font-bold text-teal mb-6">
                Sudionici
              </h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {tournament.teams.map((team) => (
                  <div
                    key={team.id}
                    className={`px-4 py-3 rounded-lg ${
                      team.id === winner?.id
                        ? 'bg-lime text-teal font-bold'
                        : 'bg-beige/50 text-teal'
                    }`}
                  >
                    <span className="text-teal/50 text-sm mr-2">#{team.seed}</span>
                    {team.name}
                    {team.id === winner?.id && (
                      <span className="ml-2">🏆</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
