-- Only for the temporary public demos; run after both demo tables exist.
ALTER TABLE public.newcastle_48h_demo ADD COLUMN IF NOT EXISTS revision uuid NOT NULL DEFAULT gen_random_uuid();
ALTER TABLE public.newcastle_classic_demo ADD COLUMN IF NOT EXISTS revision uuid NOT NULL DEFAULT gen_random_uuid();
CREATE OR REPLACE FUNCTION public.newcastle_demo_revision_trigger() RETURNS trigger
LANGUAGE plpgsql SET search_path = pg_catalog AS $$
BEGIN
  IF NEW.payload IS DISTINCT FROM OLD.payload THEN NEW.revision := gen_random_uuid(); END IF;
  RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS newcastle_demo_revision ON public.newcastle_48h_demo;
CREATE TRIGGER newcastle_demo_revision BEFORE UPDATE OF payload ON public.newcastle_48h_demo
FOR EACH ROW EXECUTE FUNCTION public.newcastle_demo_revision_trigger();
DROP TRIGGER IF EXISTS newcastle_demo_revision ON public.newcastle_classic_demo;
CREATE TRIGGER newcastle_demo_revision BEFORE UPDATE OF payload ON public.newcastle_classic_demo
FOR EACH ROW EXECUTE FUNCTION public.newcastle_demo_revision_trigger();
