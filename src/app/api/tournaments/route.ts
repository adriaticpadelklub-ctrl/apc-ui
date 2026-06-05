import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { BracketSize } from '@/types/tournament';

function calculateBracketSize(teamCount: number): BracketSize {
  if (teamCount <= 4) return 4;
  if (teamCount <= 8) return 8;
  if (teamCount <= 16) return 16;
  return 32;
}

export async function GET() {
  try {
    const { data: tournaments, error } = await supabase
      .from('tournaments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to fetch tournaments' }, { status: 500 });
    }

    return NextResponse.json(tournaments);
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, team_count } = body;

    if (!name) {
      return NextResponse.json({ error: 'Tournament name is required' }, { status: 400 });
    }

    const bracketSize = team_count
      ? calculateBracketSize(team_count)
      : 32; // Default to max, will be adjusted when generating bracket

    const { data: tournament, error: tournamentError } = await supabase
      .from('tournaments')
      .insert({
        name,
        bracket_size: bracketSize,
        status: 'draft',
      })
      .select()
      .single();

    if (tournamentError) {
      console.error('Supabase error:', tournamentError);
      return NextResponse.json({ error: 'Failed to create tournament' }, { status: 500 });
    }

    return NextResponse.json(tournament, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
