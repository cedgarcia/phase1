-- Runs automatically when the postgres container starts for the first time

CREATE TABLE IF NOT EXISTS tasks (
  id          SERIAL PRIMARY KEY,
  title       VARCHAR(255) NOT NULL,
  description TEXT DEFAULT '',
  status      VARCHAR(20)  NOT NULL DEFAULT 'todo'
                CHECK (status IN ('todo', 'in_progress', 'done')),
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Seed some sample data so the dashboard isn't empty on first run
INSERT INTO tasks (title, description, status) VALUES
  ('Set up Docker Compose',   'Get all 3 services running',         'done'),
  ('Build REST API',          'CRUD endpoints with Express + pg',   'in_progress'),
  ('Create React dashboard',  'Connect to API, show tasks',         'todo'),
  ('Deploy to Kubernetes',    'Migrate compose to k8s manifests',   'todo');
