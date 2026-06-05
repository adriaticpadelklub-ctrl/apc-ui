import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { UpdateMatchInput, BracketSize } from '@/types/tournament';

interface RouteParams {
  params: Promise<{ id: string }>;
}

function calculateBracketSize(teamCount: number): BracketSize {
  if (teamCount <= 4) return 4;
  if (teamCount <= 8) return 8;
  if (teamCount <= 16) return 16;
  return 32;
}

function generateMatches(tournamentId: string, bracketSize: BracketSize) {
  const matches = [];
  const totalRounds = Math.log2(bracketSize);

  for (let round = 1; round <= totalRounds; round++) {
    const matchesInRound = bracketSize / Math.pow(2, round);
    for (let position = 1; position <= matchesInRound; position++) {
      matches.push({
        tournament_id: tournamentId,
        round,
        position,
        team1_id: null,
        team2_id: null,
        winner_id: null,
        score: null,
      });
    }
  }

  return matches;
}

export async function GET(_request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    const { data: matches, error } = await supabase
      .from('matches')
      .select('*')
      .eq('tournament_id', id)
      .order('round')
      .order('position');

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to fetch matches' }, { status: 500 });
    }

    return NextResponse.json(matches);
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const matchId = searchParams.get('matchId');
    const body: UpdateMatchInput = await request.json();

    if (!matchId) {
      return NextResponse.json({ error: 'Match ID required' }, { status: 400 });
    }

    const { data: currentMatch, error: fetchError } = await supabase
      .from('matches')
      .select('*')
      .eq('id', matchId)
      .eq('tournament_id', id)
      .single();

    if (fetchError || !currentMatch) {
      return NextResponse.json({ error: 'Match not found' }, { status: 404 });
    }

    const { data: match, error: updateError } = await supabase
      .from('matches')
      .update({
        winner_id: body.winner_id,
        score: body.score || null,
      })
      .eq('id', matchId)
      .eq('tournament_id', id)
      .select()
      .single();

    if (updateError) {
      console.error('Supabase error:', updateError);
      return NextResponse.json({ error: 'Failed to update match' }, { status: 500 });
    }

    const { data: tournament } = await supabase
      .from('tournaments')
      .select('bracket_size')
      .eq('id', id)
      .single();

    if (tournament) {
      const totalRounds = Math.log2(tournament.bracket_size);
      if (currentMatch.round < totalRounds) {
        const nextRound = currentMatch.round + 1;
        const nextPosition = Math.ceil(currentMatch.position / 2);
        const isTeam1 = currentMatch.position % 2 === 1;

        const { data: nextMatch } = await supabase
          .from('matches')
          .select('*')
          .eq('tournament_id', id)
          .eq('round', nextRound)
          .eq('position', nextPosition)
          .single();

        if (nextMatch) {
          await supabase
            .from('matches')
            .update({
              [isTeam1 ? 'team1_id' : 'team2_id']: body.winner_id,
            })
            .eq('id', nextMatch.id);
        }
      }
    }

    return NextResponse.json(match);
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();

    const { data: teams } = await supabase
      .from('teams')
      .select('*')
      .eq('tournament_id', id)
      .order('seed');

    if (!teams || teams.length < 2) {
      return NextResponse.json({ error: 'Potrebna su najmanje 2 tima' }, { status: 400 });
    }

    // Calculate bracket size based on actual team count
    const bracketSize = calculateBracketSize(teams.length);

    // Update tournament bracket_size
    await supabase
      .from('tournaments')
      .update({ bracket_size: bracketSize })
      .eq('id', id);

    // Delete existing matches if any
    await supabase
      .from('matches')
      .delete()
      .eq('tournament_id', id);

    // Generate and insert new matches
    const newMatches = generateMatches(id, bracketSize);
    const { error: matchesError } = await supabase
      .from('matches')
      .insert(newMatches);

    if (matchesError) {
      console.error('Supabase error:', matchesError);
      return NextResponse.json({ error: 'Failed to create matches' }, { status: 500 });
    }

    // Fetch the newly created round 1 matches
    const { data: matches } = await supabase
      .from('matches')
      .select('*')
      .eq('tournament_id', id)
      .eq('round', 1)
      .order('position');

    if (!matches) {
      return NextResponse.json({ error: 'Failed to fetch matches' }, { status: 500 });
    }

    // Seed teams into matches
    const seededTeams: (typeof teams[0] | null)[] = new Array(bracketSize).fill(null);

    teams.forEach((team, index) => {
      if (index < bracketSize) {
        seededTeams[team.seed - 1] = team;
      }
    });

    for (const match of matches) {
      const team1Index = (match.position - 1) * 2;
      const team2Index = team1Index + 1;

      await supabase
        .from('matches')
        .update({
          team1_id: seededTeams[team1Index]?.id || null,
          team2_id: seededTeams[team2Index]?.id || null,
        })
        .eq('id', match.id);
    }

    return NextResponse.json({ success: true, bracket_size: bracketSize, action: body.action || 'seed' });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
