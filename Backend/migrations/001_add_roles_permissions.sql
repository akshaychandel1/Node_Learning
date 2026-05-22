-- Add role and permissions columns to users
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT 'user',
  ADD COLUMN IF NOT EXISTS permissions JSONB DEFAULT '{}'::jsonb;
