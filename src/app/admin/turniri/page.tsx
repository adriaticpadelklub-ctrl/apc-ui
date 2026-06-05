'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  AdminPasswordGate,
  TournamentForm,
  TeamManager,
  BracketEditor,
} from '@/components/admin';
import { Button } from '@/components/ui/Button';
import type { Tournament, TournamentWithDetails } from '@/types/tournament';

function AdminContent() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [selectedTournament, setSelectedTournament] = useState<TournamentWithDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTournaments = useCallback(async () => {
    try {
      const res = await fetch('/api/tournaments');
      const data = await res.json();
      setTournaments(data);
    } catch (err) {
      console.error('Error fetching tournaments:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchTournamentDetails = useCallback(async (id: string) => {
    try {
      const res = await fetch(`/api/tournaments/${id}`);
      const data = await res.json();
      setSelectedTournament(data);
    } catch (err) {
      console.error('Error fetching tournament details:', err);
    }
  }, []);

  const handleDeleteTournament = useCallback(
    async (id: string) => {
      if (!confirm('Jeste li sigurni da želite obrisati ovaj turnir?')) return;

      try {
        const res = await fetch(`/api/tournaments/${id}`, { method: 'DELETE' });
        if (res.ok) {
          setSelectedTournament(null);
          fetchTournaments();
        }
      } catch (err) {
        console.error('Error deleting tournament:', err);
      }
    },
    [fetchTournaments]
  );

  useEffect(() => {
    fetchTournaments();
  }, [fetchTournaments]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-beige flex items-center justify-center">
        <p className="text-teal">Učitavanje...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-beige">
      <div className="container-main pt-28 pb-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-heading text-3xl font-bold text-teal">Upravljanje turnirima</h1>
          <Link href="/turniri" className="text-teal hover:text-lime transition-colors">
            Pogledaj javnu stranicu →
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            <TournamentForm onSuccess={fetchTournaments} />

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-heading text-xl font-bold text-teal mb-4">Turniri</h3>
              {tournaments.length > 0 ? (
                <ul className="space-y-2">
                  {tournaments.map((tournament) => (
                    <li key={tournament.id}>
                      <button
                        type="button"
                        onClick={() => fetchTournamentDetails(tournament.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                          selectedTournament?.id === tournament.id
                            ? 'bg-lime text-teal'
                            : 'bg-beige/50 hover:bg-beige text-teal'
                        }`}
                      >
                        <span className="font-medium">{tournament.name}</span>
                        <span className="block text-sm opacity-70">
                          {tournament.bracket_size} timova •{' '}
                          {tournament.status === 'draft'
                            ? 'Nacrt'
                            : tournament.status === 'active'
                            ? 'Aktivan'
                            : 'Završen'}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-teal/50 text-center py-4">Nema turnira</p>
              )}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {selectedTournament ? (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="font-heading text-2xl font-bold text-teal">
                    {selectedTournament.name}
                  </h2>
                  <Button
                    onClick={() => handleDeleteTournament(selectedTournament.id)}
                    variant="outline"
                    size="sm"
                  >
                    Obriši turnir
                  </Button>
                </div>

                <TeamManager
                  tournamentId={selectedTournament.id}
                  teams={selectedTournament.teams}
                  onTeamAdded={() => fetchTournamentDetails(selectedTournament.id)}
                  onTeamDeleted={() => fetchTournamentDetails(selectedTournament.id)}
                />

                <BracketEditor
                  tournamentId={selectedTournament.id}
                  matches={selectedTournament.matches}
                  teams={selectedTournament.teams}
                  bracketSize={selectedTournament.bracket_size}
                  status={selectedTournament.status}
                  onMatchUpdated={() => fetchTournamentDetails(selectedTournament.id)}
                  onStatusChanged={() => {
                    fetchTournamentDetails(selectedTournament.id);
                    fetchTournaments();
                  }}
                />
              </>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <p className="text-teal/50">Odaberite turnir za uređivanje</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminTournamentPage() {
  return (
    <AdminPasswordGate>
      <AdminContent />
    </AdminPasswordGate>
  );
}
