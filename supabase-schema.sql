-- Tournament Bracket System Schema for Supabase
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tournaments table
CREATE TABLE IF NOT EXISTS tournaments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'completed')),
    bracket_size INTEGER NOT NULL CHECK (bracket_size IN (4, 8, 16, 32))
);

-- Teams table
CREATE TABLE IF NOT EXISTS teams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tournament_id UUID NOT NULL REFERENCES tournaments(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    seed INTEGER NOT NULL,
    UNIQUE(tournament_id, seed)
);

-- Matches table
CREATE TABLE IF NOT EXISTS matches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tournament_id UUID NOT NULL REFERENCES tournaments(id) ON DELETE CASCADE,
    round INTEGER NOT NULL,
    position INTEGER NOT NULL,
    team1_id UUID REFERENCES teams(id) ON DELETE SET NULL,
    team2_id UUID REFERENCES teams(id) ON DELETE SET NULL,
    winner_id UUID REFERENCES teams(id) ON DELETE SET NULL,
    score TEXT,
    UNIQUE(tournament_id, round, position)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_teams_tournament ON teams(tournament_id);
CREATE INDEX IF NOT EXISTS idx_matches_tournament ON matches(tournament_id);
CREATE INDEX IF NOT EXISTS idx_matches_round ON matches(tournament_id, round);

-- Row Level Security (RLS)
-- Enable RLS on all tables
ALTER TABLE tournaments ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

-- Public read access policies (anyone can view tournaments)
CREATE POLICY "Allow public read access on tournaments"
    ON tournaments FOR SELECT
    USING (true);

CREATE POLICY "Allow public read access on teams"
    ON teams FOR SELECT
    USING (true);

CREATE POLICY "Allow public read access on matches"
    ON matches FOR SELECT
    USING (true);

-- For admin write operations, we'll use the service role key in a separate API
-- Or you can create policies that check for authenticated users with admin role

-- Insert/Update/Delete policies using anon key (for development)
-- In production, you may want to restrict these to authenticated admins
CREATE POLICY "Allow anon insert on tournaments"
    ON tournaments FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Allow anon update on tournaments"
    ON tournaments FOR UPDATE
    USING (true);

CREATE POLICY "Allow anon delete on tournaments"
    ON tournaments FOR DELETE
    USING (true);

CREATE POLICY "Allow anon insert on teams"
    ON teams FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Allow anon update on teams"
    ON teams FOR UPDATE
    USING (true);

CREATE POLICY "Allow anon delete on teams"
    ON teams FOR DELETE
    USING (true);

CREATE POLICY "Allow anon insert on matches"
    ON matches FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Allow anon update on matches"
    ON matches FOR UPDATE
    USING (true);

CREATE POLICY "Allow anon delete on matches"
    ON matches FOR DELETE
    USING (true);
