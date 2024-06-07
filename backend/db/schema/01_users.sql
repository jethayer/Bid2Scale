-- Drop and recreate Users table (Example)

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  province VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  bussiness_reference_number BIGINT
);
