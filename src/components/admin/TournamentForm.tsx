'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/Button';

interface TournamentFormProps {
  onSuccess: () => void;
}

export function TournamentForm({ onSuccess }: TournamentFormProps) {
  const [name, setName] = useState('');
  const [teamCount, setTeamCount] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setError('');

      try {
        const res = await fetch('/api/tournaments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            team_count: teamCount ? parseInt(teamCount, 10) : undefined
          }),
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Greška pri kreiranju turnira');
        }

        setName('');
        setTeamCount('');
        onSuccess();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Neočekivana greška');
      } finally {
        setIsLoading(false);
      }
    },
    [name, teamCount, onSuccess]
  );

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="font-heading text-xl font-bold text-teal mb-4">Novi turnir</h3>
      <div className="space-y-4">
        <div>
          <label htmlFor="tournament-name" className="block text-sm font-medium text-teal mb-2">
            Naziv turnira
          </label>
          <input
            id="tournament-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border-2 border-teal/20 focus:border-lime focus:outline-none transition-colors"
            placeholder="npr. Proljetni Turnir 2024"
            required
          />
        </div>
        <div>
          <label htmlFor="team-count" className="block text-sm font-medium text-teal mb-2">
            Broj timova <span className="text-teal/50 font-normal">(opcionalno)</span>
          </label>
          <input
            id="team-count"
            type="number"
            min="2"
            max="32"
            value={teamCount}
            onChange={(e) => setTeamCount(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border-2 border-teal/20 focus:border-lime focus:outline-none transition-colors"
            placeholder="Ostavite prazno za dodavanje timova jedan po jedan"
          />
          <p className="text-xs text-teal/50 mt-1">
            Ako ne znate točan broj, možete dodavati timove jedan po jedan
          </p>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button type="submit" variant="primary" fullWidth disabled={isLoading}>
          {isLoading ? 'Kreiranje...' : 'Kreiraj turnir'}
        </Button>
      </div>
    </form>
  );
}
