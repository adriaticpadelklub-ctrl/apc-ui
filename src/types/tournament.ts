export type TournamentStatus = 'draft' | 'active' | 'completed';

export type BracketSize = 4 | 8 | 16 | 32;

export interface Tournament {
  id: string;
  name: string;
  created_at: string;
  status: TournamentStatus;
  bracket_size: BracketSize;
}

export interface Team {
  id: string;
  tournament_id: string;
  name: string;
  seed: number;
}

export interface Match {
  id: string;
  tournament_id: string;
  round: number;
  position: number;
  team1_id: string | null;
  team2_id: string | null;
  winner_id: string | null;
  score: string | null;
}

export interface TournamentWithDetails extends Tournament {
  teams: Team[];
  matches: Match[];
}

export interface CreateTournamentInput {
  name: string;
  bracket_size: BracketSize;
}

export interface CreateTeamInput {
  tournament_id: string;
  name: string;
  seed: number;
}

export interface UpdateMatchInput {
  winner_id: string;
  score?: string;
}
