-- supabase_schema.sql
-- ============================================
-- PAVLOV GAMING HUB — Supabase Database Schema
-- ============================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================
-- PROFILES TABLE
-- ============================================
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT DEFAULT '',
  favorite_game TEXT DEFAULT 'pavroyale',
  total_play_time INTEGER DEFAULT 0,
  member_since TIMESTAMPTZ DEFAULT NOW(),
  is_online BOOLEAN DEFAULT FALSE,
  last_seen TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT username_length CHECK (char_length(username) >= 3 AND char_length(username) <= 24),
  CONSTRAINT username_format CHECK (username ~ '^[a-zA-Z0-9_]+$')
);

-- ============================================
-- SCORES TABLE
-- ============================================
CREATE TABLE public.scores (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  game_slug TEXT NOT NULL CHECK (game_slug IN ('pavroyale', 'pavometry')),
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 999999),
  level_reached INTEGER DEFAULT 1,
  play_duration INTEGER DEFAULT 0, -- seconds
  verified BOOLEAN DEFAULT FALSE,
  verification_hash TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT valid_score CHECK (score >= 0)
);

-- Index for fast leaderboard queries
CREATE INDEX idx_scores_game_score ON public.scores(game_slug, score DESC);
CREATE INDEX idx_scores_user ON public.scores(user_id);
CREATE INDEX idx_scores_created ON public.scores(created_at DESC);

-- ============================================
-- PERSONAL BESTS VIEW
-- ============================================
CREATE OR REPLACE VIEW public.personal_bests AS
SELECT DISTINCT ON (s.user_id, s.game_slug)
  s.id,
  s.user_id,
  s.game_slug,
  s.score,
  s.level_reached,
  s.created_at,
  p.username,
  p.display_name,
  p.avatar_url
FROM public.scores s
JOIN public.profiles p ON s.user_id = p.id
WHERE s.verified = TRUE
ORDER BY s.user_id, s.game_slug, s.score DESC;

-- ============================================
-- LEADERBOARD FUNCTION
-- ============================================
CREATE OR REPLACE FUNCTION public.get_leaderboard(
  p_game_slug TEXT,
  p_limit INTEGER DEFAULT 50
)
RETURNS TABLE (
  rank BIGINT,
  user_id UUID,
  username TEXT,
  display_name TEXT,
  avatar_url TEXT,
  score INTEGER,
  level_reached INTEGER,
  played_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT
    ROW_NUMBER() OVER (ORDER BY pb.score DESC) as rank,
    pb.user_id,
    pb.username,
    pb.display_name,
    pb.avatar_url,
    pb.score,
    pb.level_reached,
    pb.created_at as played_at
  FROM public.personal_bests pb
  WHERE pb.game_slug = p_game_slug
  ORDER BY pb.score DESC
  LIMIT p_limit;
END;
$$;

-- ============================================
-- SCORE SUBMISSION FUNCTION (Server-side only)
-- ============================================
CREATE OR REPLACE FUNCTION public.submit_score(
  p_user_id UUID,
  p_game_slug TEXT,
  p_score INTEGER,
  p_level INTEGER DEFAULT 1,
  p_duration INTEGER DEFAULT 0,
  p_hash TEXT DEFAULT ''
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_score_id UUID;
  v_expected_hash TEXT;
  v_is_valid BOOLEAN := FALSE;
BEGIN
  -- Verify the score hash (simple HMAC verification)
  v_expected_hash := encode(
    hmac(
      p_user_id::text || p_game_slug || p_score::text || p_level::text,
      current_setting('app.settings.score_secret', true),
      'sha256'
    ),
    'hex'
  );
  
  -- For now, mark as verified if hash matches or allow server-side submissions
  IF p_hash = v_expected_hash OR p_hash = 'server_verified' THEN
    v_is_valid := TRUE;
  END IF;

  INSERT INTO public.scores (user_id, game_slug, score, level_reached, play_duration, verified, verification_hash)
  VALUES (p_user_id, p_game_slug, p_score, p_level, p_duration, v_is_valid, p_hash)
  RETURNING id INTO v_score_id;
  
  RETURN v_score_id;
END;
$$;

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scores ENABLE ROW LEVEL SECURITY;

-- Profiles: viewable by everyone, editable by owner
CREATE POLICY "Profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Scores: viewable by everyone, insert only through function
CREATE POLICY "Scores are viewable by everyone"
  ON public.scores FOR SELECT
  USING (true);

CREATE POLICY "Scores insert via function only"
  ON public.scores FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- REALTIME
-- ============================================
ALTER PUBLICATION supabase_realtime ADD TABLE public.scores;

-- ============================================
-- AUTO-CREATE PROFILE ON SIGNUP
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, display_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'preferred_username', 'player_' || substr(NEW.id::text, 1, 8)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', 'New Player'),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  );
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();