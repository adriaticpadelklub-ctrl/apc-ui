import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { CreateTeamInput } from '@/types/tournament';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    const { data: teams, error } = await supabase
      .from('teams')
      .select('*')
      .eq('tournament_id', id)
      .order('seed');

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to fetch teams' }, { status: 500 });
    }

    return NextResponse.json(teams);
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body: Omit<CreateTeamInput, 'tournament_id'> = await request.json();

    const { data: tournament } = await supabase
      .from('tournaments')
      .select('bracket_size')
      .eq('id', id)
      .single();

    if (!tournament) {
      return NextResponse.json({ error: 'Tournament not found' }, { status: 404 });
    }

    const { count } = await supabase
      .from('teams')
      .select('*', { count: 'exact', head: true })
      .eq('tournament_id', id);

    if (count !== null && count >= tournament.bracket_size) {
      return NextResponse.json(
        { error: `Maximum ${tournament.bracket_size} teams allowed` },
        { status: 400 }
      );
    }

    const { data: team, error } = await supabase
      .from('teams')
      .insert({
        tournament_id: id,
        name: body.name,
        seed: body.seed,
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to create team' }, { status: 500 });
    }

    return NextResponse.json(team, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const teamId = searchParams.get('teamId');

    if (!teamId) {
      return NextResponse.json({ error: 'Team ID required' }, { status: 400 });
    }

    await supabase
      .from('matches')
      .update({ team1_id: null })
      .eq('tournament_id', id)
      .eq('team1_id', teamId);

    await supabase
      .from('matches')
      .update({ team2_id: null })
      .eq('tournament_id', id)
      .eq('team2_id', teamId);

    await supabase
      .from('matches')
      .update({ winner_id: null })
      .eq('tournament_id', id)
      .eq('winner_id', teamId);

    const { error } = await supabase
      .from('teams')
      .delete()
      .eq('id', teamId)
      .eq('tournament_id', id);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to delete team' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
