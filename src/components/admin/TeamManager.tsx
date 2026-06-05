'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import type { Team } from '@/types/tournament';

interface TeamManagerProps {
  tournamentId: string;
  teams: Team[];
  onTeamAdded: () => void;
  onTeamDeleted: () => void;
}

export function TeamManager({
  tournamentId,
  teams,
  onTeamAdded,
  onTeamDeleted,
}: TeamManagerProps) {
  const [teamName, setTeamName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddTeam = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!teamName.trim()) return;

      setIsLoading(true);
      setError('');

      try {
        const nextSeed = teams.length + 1;
        const res = await fetch(`/api/tournaments/${tournamentId}/teams`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: teamName.trim(), seed: nextSeed }),
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Greška pri dodavanju tima');
        }

        setTeamName('');
        onTeamAdded();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Neočekivana greška');
      } finally {
        setIsLoading(false);
      }
    },
    [teamName, tournamentId, teams.length, onTeamAdded]
  );

  const handleDeleteTeam = useCallback(
    async (teamId: string) => {
      if (!confirm('Jeste li sigurni da želite obrisati ovaj tim?')) return;

      try {
        const res = await fetch(
          `/api/tournaments/${tournamentId}/teams?teamId=${teamId}`,
          { method: 'DELETE' }
        );

        if (!res.ok) {
          throw new Error('Greška pri brisanju tima');
        }

        onTeamDeleted();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Neočekivana greška');
      }
    },
    [tournamentId, onTeamDeleted]
  );

  const canAddMore = teams.length < 32;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="font-heading text-xl font-bold text-teal mb-4">
        Timovi ({teams.length})
      </h3>

      {canAddMore && (
        <form onSubmit={handleAddTeam} className="flex gap-2 mb-4">
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border-2 border-teal/20 focus:border-lime focus:outline-none transition-colors"
            placeholder="Igrač1/Igrač2"
          />
          <Button type="submit" variant="primary" size="sm" disabled={isLoading}>
            {isLoading ? '...' : 'Dodaj'}
          </Button>
        </form>
      )}

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {teams.length > 0 ? (
        <ul className="space-y-2">
          {teams.map((team) => (
            <li
              key={team.id}
              className="flex items-center justify-between px-4 py-2 bg-beige/50 rounded-lg"
            >
              <span className="text-teal">
                <span className="text-teal/50 text-sm mr-2">#{team.seed}</span>
                {team.name}
              </span>
              <button
                type="button"
                onClick={() => handleDeleteTeam(team.id)}
                className="text-red-500 hover:text-red-700 text-sm font-medium"
              >
                Obriši
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-teal/50 text-center py-4">Nema dodanih timova</p>
      )}
    </div>
  );
}
