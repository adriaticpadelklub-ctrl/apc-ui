'use client';

import { cn } from '@/lib/utils';
import type { Match, Team } from '@/types/tournament';

interface BracketMatchProps {
  match: Match;
  teams: Team[];
  isEditable?: boolean;
  onSelectWinner?: (matchId: string, winnerId: string, score?: string) => void;
}

export function BracketMatch({
  match,
  teams,
  isEditable = false,
  onSelectWinner,
}: BracketMatchProps) {
  const team1 = teams.find((t) => t.id === match.team1_id);
  const team2 = teams.find((t) => t.id === match.team2_id);

  const handleTeamClick = (teamId: string | null) => {
    if (!isEditable || !teamId || !onSelectWinner) return;
    const score = prompt('Unesite rezultat (npr. 6-4, 7-5):');
    onSelectWinner(match.id, teamId, score || undefined);
  };

  return (
    <div className="flex flex-col gap-0.5 min-w-[180px]">
      <button
        type="button"
        onClick={() => handleTeamClick(match.team1_id)}
        disabled={!isEditable || !match.team1_id}
        className={cn(
          'px-3 py-2 text-left text-sm font-medium rounded-t-lg border-2 transition-all',
          'truncate',
          match.winner_id === match.team1_id
            ? 'bg-lime text-teal border-lime font-bold'
            : match.team1_id
            ? 'bg-white border-teal/20 hover:border-lime/50'
            : 'bg-teal/5 border-teal/10 text-teal/40',
          isEditable && match.team1_id && 'cursor-pointer hover:bg-lime/10'
        )}
      >
        {team1?.name || 'TBD'}
      </button>
      <button
        type="button"
        onClick={() => handleTeamClick(match.team2_id)}
        disabled={!isEditable || !match.team2_id}
        className={cn(
          'px-3 py-2 text-left text-sm font-medium rounded-b-lg border-2 border-t-0 transition-all',
          'truncate',
          match.winner_id === match.team2_id
            ? 'bg-lime text-teal border-lime font-bold'
            : match.team2_id
            ? 'bg-white border-teal/20 hover:border-lime/50'
            : 'bg-teal/5 border-teal/10 text-teal/40',
          isEditable && match.team2_id && 'cursor-pointer hover:bg-lime/10'
        )}
      >
        {team2?.name || 'TBD'}
      </button>
      {match.score && (
        <div className="text-xs text-center text-teal/60 mt-1">{match.score}</div>
      )}
    </div>
  );
}
