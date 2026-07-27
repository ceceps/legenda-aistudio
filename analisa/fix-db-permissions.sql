-- Grant all privileges on database
GRANT ALL PRIVILEGES ON DATABASE legenda_db TO legendauser;

-- Connect to the database and grant schema permissions
\c legenda_db

-- Grant usage and create on schema public
GRANT USAGE, CREATE ON SCHEMA public TO legendauser;

-- Grant all privileges on all tables in public schema
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO legendauser;

-- Grant all privileges on all sequences in public schema
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO legendauser;

-- Set default privileges for future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO legendauser;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON SEQUENCES TO legendauser;

-- Grant createdb privilege to user (for shadow database)
ALTER USER legendauser CREATEDB;
