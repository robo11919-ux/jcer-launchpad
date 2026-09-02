-- JCER Admission ERP Ceremony Launch Control Table Migration
CREATE TABLE IF NOT EXISTS public.launch_control (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  command text NOT NULL DEFAULT 'READY',
  sequence_id integer NOT NULL DEFAULT 0,
  screen_last_seen timestamptz,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Grants
GRANT SELECT, INSERT, UPDATE ON public.launch_control TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.launch_control TO authenticated;
GRANT ALL ON public.launch_control TO service_role;

-- Row Level Security
ALTER TABLE public.launch_control ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'launch_control' AND policyname = 'launch_control readable by everyone'
  ) THEN
    CREATE POLICY "launch_control readable by everyone" ON public.launch_control FOR SELECT USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'launch_control' AND policyname = 'launch_control updatable by everyone'
  ) THEN
    CREATE POLICY "launch_control updatable by everyone" ON public.launch_control FOR UPDATE USING (true) WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'launch_control' AND policyname = 'launch_control insertable by everyone'
  ) THEN
    CREATE POLICY "launch_control insertable by everyone" ON public.launch_control FOR INSERT WITH CHECK (true);
  END IF;
END $$;

-- Enable Realtime Replication
ALTER TABLE public.launch_control REPLICA IDENTITY FULL;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'launch_control'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.launch_control;
  END IF;
END $$;

-- Seed the initial shared ceremony control row (idempotent)
INSERT INTO public.launch_control (id, command, sequence_id, updated_at)
VALUES ('11111111-1111-1111-1111-111111111111', 'READY', 0, now())
ON CONFLICT (id) DO UPDATE SET 
  command = 'READY', 
  sequence_id = 0, 
  updated_at = now();