'use client';

import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { TournamentBracket } from '@/components/tournament';
import type { Match, Team, BracketSize, TournamentStatus } from '@/types/tournament';

interface BracketEditorProps {
  tournamentId: string;
  matches: Match[];
  teams: Team[];
  bracketSize: BracketSize;
  status: TournamentStatus;
  onMatchUpdated: () => void;
  onStatusChanged: () => void;
}

function calculateBracketSize(teamCount: number): BracketSize {
  if (teamCount <= 4) return 4;
  if (teamCount <= 8) return 8;
  if (teamCount <= 16) return 16;
  return 32;
}

export function BracketEditor({
  tournamentId,
  matches,
  teams,
  bracketSize,
  status,
  onMatchUpdated,
  onStatusChanged,
}: BracketEditorProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSeedTeams = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/tournaments/${tournamentId}/matches`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'seed' }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Greška pri raspoređivanju timova');
      }

      onMatchUpdated();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Neočekivana greška');
    } finally {
      setIsLoading(false);
    }
  }, [tournamentId, onMatchUpdated]);

  const handleSelectWinner = useCallback(
    async (matchId: string, winnerId: string, score?: string) => {
      try {
        const res = await fetch(`/api/tournaments/${tournamentId}/matches?matchId=${matchId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ winner_id: winnerId, score }),
        });

        if (!res.ok) {
          throw new Error('Greška pri ažuriranju rezultata');
        }

        onMatchUpdated();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Neočekivana greška');
      }
    },
    [tournamentId, onMatchUpdated]
  );

  const handleStatusChange = useCallback(
    async (newStatus: TournamentStatus) => {
      try {
        const res = await fetch(`/api/tournaments/${tournamentId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus }),
        });

        if (!res.ok) {
          throw new Error('Greška pri promjeni statusa');
        }

        onStatusChanged();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Neočekivana greška');
      }
    },
    [tournamentId, onStatusChanged]
  );

  const hasTeamsInBracket = matches.some((m) => m.team1_id || m.team2_id);
  const projectedBracketSize = calculateBracketSize(teams.length);
  const displayBracketSize = hasTeamsInBracket ? bracketSize : projectedBracketSize;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading text-xl font-bold text-teal">Bracket</h3>
        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              status === 'active'
                ? 'bg-green-100 text-green-800'
                : status === 'completed'
                ? 'bg-teal/10 text-teal'
                : 'bg-lime/30 text-teal'
            }`}
          >
            {status === 'draft' ? 'Nacrt' : status === 'active' ? 'Aktivan' : 'Završen'}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {teams.length >= 2 && !hasTeamsInBracket && (
          <Button onClick={handleSeedTeams} variant="primary" size="sm" disabled={isLoading}>
            {isLoading ? 'Generiranje...' : `Generiraj raspored (${projectedBracketSize} mjesta)`}
          </Button>
        )}

        {teams.length < 2 && !hasTeamsInBracket && (
          <p className="text-teal/50 text-sm">Dodajte najmanje 2 tima za generiranje rasporeda</p>
        )}

        {status === 'draft' && hasTeamsInBracket && (
          <Button onClick={() => handleStatusChange('active')} variant="lime" size="sm">
            Pokreni turnir
          </Button>
        )}

        {status === 'active' && (
          <Button onClick={() => handleStatusChange('completed')} variant="outline" size="sm">
            Završi turnir
          </Button>
        )}

        {status === 'completed' && (
          <Button onClick={() => handleStatusChange('active')} variant="outline" size="sm">
            Ponovno aktiviraj
          </Button>
        )}
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {hasTeamsInBracket ? (
        <TournamentBracket
          matches={matches}
          teams={teams}
          bracketSize={displayBracketSize}
          isEditable={status === 'active'}
          onSelectWinner={handleSelectWinner}
        />
      ) : (
        <div className="text-center py-12 text-teal/50 border-2 border-dashed border-teal/20 rounded-xl">
          {teams.length >= 2 ? (
            <p>Kliknite &quot;Generiraj raspored&quot; za kreiranje bracketa</p>
          ) : (
            <p>Dodajte timove iznad za početak</p>
          )}
        </div>
      )}
    </div>
  );
}
