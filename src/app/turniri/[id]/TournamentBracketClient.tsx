'use client';

import { TournamentBracket } from '@/components/tournament';
import type { TournamentWithDetails } from '@/types/tournament';

interface TournamentBracketClientProps {
  tournament: TournamentWithDetails;
}

export function TournamentBracketClient({ tournament }: TournamentBracketClientProps) {
  return (
    <TournamentBracket
      matches={tournament.matches}
      teams={tournament.teams}
      bracketSize={tournament.bracket_size}
      isEditable={false}
    />
  );
}
