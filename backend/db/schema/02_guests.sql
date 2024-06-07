-- Drop and recreate Guests table (Example)

DROP TABLE IF EXISTS guests CASCADE;
CREATE TABLE guests (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company_name VARCHAR(255) NOT NULL,
);
