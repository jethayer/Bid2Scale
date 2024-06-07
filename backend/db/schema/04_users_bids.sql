
CREATE TABLE users_bids (
  id SERIAL PRIMARY KEY NOT NULL,
  bidder_id  INTEGER REFERENCES users(id) ON DELETE CASCADE,
  rfp_id  INTEGER REFERENCES rfps(id) ON DELETE CASCADE,
  table_of_content VARCHAR(255) NOT NULL,
  experience_qualifications VARCHAR(255) NOT NULL,
  references VARCHAR(255) NOT NULL,
  insurance VARCHAR(255) NOT NULL,
  status VARCHAR(255) NOT NULL DEFAULT 'Pending'
);
