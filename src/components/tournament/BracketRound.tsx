'use client';

import { cn } from '@/lib/utils';
import type { Match, Team } from '@/types/tournament';
import { BracketMatch } from './BracketMatch';

interface BracketRoundProps {
  round: number;
  matches: Match[];
  teams: Team[];
  totalRounds: number;
  isEditable?: boolean;
  onSelectWinner?: (matchId: string, winnerId: string, score?: string) => void;
}

const roundNames: Record<number, string> = {
  1: 'Prvo kolo',
  2: 'Drugo kolo',
  3: 'Četvrtfinale',
  4: 'Polufinale',
  5: 'Finale',
};

function getRoundName(round: number, totalRounds: number): string {
  const roundsFromEnd = totalRounds - round;

  if (roundsFromEnd === 0) return 'Finale';
  if (roundsFromEnd === 1) return 'Polufinale';
  if (roundsFromEnd === 2) return 'Četvrtfinale';

  return roundNames[round] || `Kolo ${round}`;
}

export function BracketRound({
  round,
  matches,
  teams,
  totalRounds,
  isEditable,
  onSelectWinner,
}: BracketRoundProps) {
  const roundMatches = matches.filter((m) => m.round === round);
  const roundName = getRoundName(round, totalRounds);

  const spacing = Math.pow(2, round - 1);
  const gapMultiplier = spacing - 1;

  return (
    <div className="flex flex-col">
      <h4 className="text-sm font-bold text-teal/70 mb-4 text-center whitespace-nowrap">
        {roundName}
      </h4>
      <div
        className={cn('flex flex-col justify-around flex-1')}
        style={{
          gap: `${Math.max(16, gapMultiplier * 48)}px`,
          paddingTop: `${gapMultiplier * 24}px`,
          paddingBottom: `${gapMultiplier * 24}px`,
        }}
      >
        {roundMatches.map((match) => (
          <div key={match.id} className="relative flex items-center">
            <BracketMatch
              match={match}
              teams={teams}
              isEditable={isEditable}
              onSelectWinner={onSelectWinner}
            />
            {round < totalRounds && (
              <div className="absolute right-0 top-1/2 w-4 h-0.5 bg-teal/20 translate-x-full" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
