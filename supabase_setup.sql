-- Supabase setup script for admin dashboard and projects
-- Run these statements in the Supabase SQL editor (app.supabase.com -> SQL)
-- Backup your data before running any destructive statements.

-- 1) Admins table (store admin auth.user IDs)
CREATE TABLE IF NOT EXISTS public.admins (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

-- 2) Projects table (create if not present)
CREATE TABLE IF NOT EXISTS public.projects (
  id            BIGSERIAL PRIMARY KEY,
  title         text NOT NULL,
  description   text,
  category      text,
  technologies  text[],            -- array of technology names
  demo_url      text,
  repo_url      text,
  image_url     text,
  featured      boolean DEFAULT false,
  created_at    timestamptz DEFAULT now(),
  updated_at    timestamptz DEFAULT now()
);

-- 3) site_pages table (for dashboard page editors)
CREATE TABLE IF NOT EXISTS public.site_pages (
  id bigserial PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  content jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 4) Utility: trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach trigger for projects and site_pages
DROP TRIGGER IF EXISTS set_updated_at_trigger ON public.projects;
CREATE TRIGGER set_updated_at_trigger
BEFORE UPDATE ON public.projects
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_pages ON public.site_pages;
CREATE TRIGGER set_updated_at_pages
BEFORE UPDATE ON public.site_pages
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 5) Indexes for performance
-- GIN index for technologies array
CREATE INDEX IF NOT EXISTS idx_projects_technologies_gin
ON public.projects USING gin (technologies);

-- Full-text search support for title + description
ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS search_tsv tsvector;

UPDATE public.projects
SET search_tsv = to_tsvector('english', coalesce(title,'') || ' ' || coalesce(description,''));

CREATE OR REPLACE FUNCTION public.projects_search_tsv_trigger() RETURNS trigger AS $$
BEGIN
  NEW.search_tsv := to_tsvector('english', coalesce(NEW.title,'') || ' ' || coalesce(NEW.description,''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_projects_search_tsv ON public.projects;
CREATE TRIGGER trg_projects_search_tsv
BEFORE INSERT OR UPDATE ON public.projects
FOR EACH ROW EXECUTE FUNCTION public.projects_search_tsv_trigger();

CREATE INDEX IF NOT EXISTS idx_projects_search_tsv_gin
ON public.projects USING gin (search_tsv);

-- 6) Row-Level Security (RLS) policies
-- NOTE: enabling RLS will require that your client uses Supabase Auth and that admin rows exist.
-- Enable RLS on projects
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Allow anyone (public) to SELECT projects
CREATE POLICY IF NOT EXISTS "public_select_projects" ON public.projects
  FOR SELECT USING (true);

-- Allow only admins (present in public.admins) to INSERT
CREATE POLICY IF NOT EXISTS "admins_can_insert_projects" ON public.projects
  FOR INSERT WITH CHECK (exists (select 1 from public.admins where admins.id = auth.uid()));

-- Allow only admins to UPDATE
CREATE POLICY IF NOT EXISTS "admins_can_update_projects" ON public.projects
  FOR UPDATE USING (exists (select 1 from public.admins where admins.id = auth.uid()))
  WITH CHECK (exists (select 1 from public.admins where admins.id = auth.uid()));

-- Allow only admins to DELETE
CREATE POLICY IF NOT EXISTS "admins_can_delete_projects" ON public.projects
  FOR DELETE USING (exists (select 1 from public.admins where admins.id = auth.uid()));

-- RLS for admins table: allow each authenticated user to read their own admin row
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "admins_select_self" ON public.admins
  FOR SELECT USING (id = auth.uid());
-- Do not create a public INSERT policy for admins — manage admin rows via SQL or the Supabase UI

-- RLS for site_pages: allow admins to insert/update, public to read
ALTER TABLE public.site_pages ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "public_select_site_pages" ON public.site_pages
  FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "admins_manage_site_pages" ON public.site_pages
  FOR ALL USING (exists (select 1 from public.admins where admins.id = auth.uid()))
  WITH CHECK (exists (select 1 from public.admins where admins.id = auth.uid()));

-- 7) Example data (6 sample projects) - only run if you want demo content
INSERT INTO public.projects (title, description, category, technologies, demo_url, repo_url, image_url, featured)
VALUES
('Portfolio Website', 'Personal portfolio showcasing projects and blog.', 'Web Application', ARRAY['React','Tailwind','Vite'], 'https://demo.example/portfolio', 'https://github.com/you/portfolio', '/assets/images/portfolio.png', true),
('E-commerce API', 'Back-end API for products, carts and orders.', 'Backend API', ARRAY['Node.js','Express','PostgreSQL'], NULL, 'https://github.com/you/ecommerce-api', '/assets/images/ecom-api.png', false),
('Mobile ToDo App', 'Cross-platform mobile todo app with offline sync.', 'Mobile Application', ARRAY['React Native','SQLite'], 'https://demo.example/todo', 'https://github.com/you/todo-app', '/assets/images/todo-mobile.png', false),
('Analytics Dashboard', 'Interactive charts and metrics for user behavior.', 'Web Application', ARRAY['React','D3','Recharts'], 'https://demo.example/analytics', 'https://github.com/you/analytics', '/assets/images/analytics.png', false),
('Design System', 'UI/UX design system and component library.', 'UI/UX Design', ARRAY['Figma','Storybook'], NULL, 'https://github.com/you/design-system', '/assets/images/design.png', false),
('Realtime Chat API', 'Realtime messaging backend using websockets.', 'Backend API', ARRAY['Node.js','Socket.io','Redis'], NULL, 'https://github.com/you/chat-api', '/assets/images/chat-api.png', false)
ON CONFLICT DO NOTHING;

-- 8) Useful queries
-- Count per category
-- SELECT coalesce(category,'Uncategorized') AS category, count(*) AS total FROM public.projects GROUP BY category ORDER BY total DESC;

-- Full list
-- SELECT id, title, category, technologies, created_at FROM public.projects ORDER BY id;

-- 9) Notes for storage
-- Create a storage bucket named "project-images" in Supabase Storage (via the UI).
-- If bucket is public you can use: supabase.storage.from('project-images').getPublicUrl(filePath)
-- If bucket is private, use signed URLs for client access and adjust the admin upload code accordingly.

-- End of script
