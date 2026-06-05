import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { TournamentStatus } from '@/types/tournament';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    const [
      { data: tournament, error: tournamentError },
      { data: teams, error: teamsError },
      { data: matches, error: matchesError },
    ] = await Promise.all([
      supabase.from('tournaments').select('*').eq('id', id).single(),
      supabase.from('teams').select('*').eq('tournament_id', id).order('seed'),
      supabase.from('matches').select('*').eq('tournament_id', id).order('round').order('position'),
    ]);

    if (tournamentError) {
      console.error('Supabase error:', tournamentError);
      return NextResponse.json({ error: 'Tournament not found' }, { status: 404 });
    }

    if (teamsError || matchesError) {
      console.error('Supabase error:', teamsError || matchesError);
      return NextResponse.json({ error: 'Failed to fetch tournament details' }, { status: 500 });
    }

    return NextResponse.json({
      ...tournament,
      teams: teams || [],
      matches: matches || [],
    });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updates: { name?: string; status?: TournamentStatus } = {};
    if (body.name) updates.name = body.name;
    if (body.status) updates.status = body.status;

    const { data: tournament, error } = await supabase
      .from('tournaments')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to update tournament' }, { status: 500 });
    }

    return NextResponse.json(tournament);
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    await supabase.from('matches').delete().eq('tournament_id', id);
    await supabase.from('teams').delete().eq('tournament_id', id);

    const { error } = await supabase.from('tournaments').delete().eq('id', id);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to delete tournament' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
