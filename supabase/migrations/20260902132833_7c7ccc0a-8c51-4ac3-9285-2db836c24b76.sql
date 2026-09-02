CREATE TABLE public.launch_control (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  command text NOT NULL DEFAULT 'READY',
  sequence_id integer NOT NULL DEFAULT 0,
  screen_last_seen timestamptz,
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE ON public.launch_control TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.launch_control TO authenticated;
GRANT ALL ON public.launch_control TO service_role;

ALTER TABLE public.launch_control ENABLE ROW LEVEL SECURITY;

CREATE POLICY "launch_control readable by everyone" ON public.launch_control FOR SELECT USING (true);
CREATE POLICY "launch_control updatable by everyone" ON public.launch_control FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "launch_control insertable by everyone" ON public.launch_control FOR INSERT WITH CHECK (true);

ALTER TABLE public.launch_control REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.launch_control;

INSERT INTO public.launch_control (id, command, sequence_id)
VALUES ('11111111-1111-1111-1111-111111111111', 'READY', 0);