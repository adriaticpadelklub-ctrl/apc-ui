'use client';

import { cn } from '@/lib/utils';
import type { Match, Team, BracketSize } from '@/types/tournament';
import { BracketRound } from './BracketRound';

interface TournamentBracketProps {
  matches: Match[];
  teams: Team[];
  bracketSize: BracketSize;
  isEditable?: boolean;
  onSelectWinner?: (matchId: string, winnerId: string, score?: string) => void;
  className?: string;
}

export function TournamentBracket({
  matches,
  teams,
  bracketSize,
  isEditable = false,
  onSelectWinner,
  className,
}: TournamentBracketProps) {
  const totalRounds = Math.log2(bracketSize);
  const rounds = Array.from({ length: totalRounds }, (_, i) => i + 1);

  const winner = matches.find((m) => m.round === totalRounds)?.winner_id;
  const winnerTeam = teams.find((t) => t.id === winner);

  return (
    <div className={cn('w-full', className)}>
      <div className="overflow-x-auto pb-4">
        <div
          className="flex gap-8 min-w-max px-4"
          style={{ minWidth: `${rounds.length * 220}px` }}
        >
          {rounds.map((round) => (
            <BracketRound
              key={round}
              round={round}
              matches={matches}
              teams={teams}
              totalRounds={totalRounds}
              isEditable={isEditable}
              onSelectWinner={onSelectWinner}
            />
          ))}

          {winnerTeam && (
            <div className="flex flex-col justify-center">
              <h4 className="text-sm font-bold text-teal/70 mb-4 text-center">Pobjednik</h4>
              <div className="bg-lime rounded-lg px-6 py-4 text-center shadow-lg">
                <span className="text-lg font-bold text-teal">{winnerTeam.name}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {matches.length === 0 && (
        <div className="text-center py-12 text-teal/50">
          Bracket nije još generiran. Dodajte timove i generirajte raspored.
        </div>
      )}
    </div>
  );
}
