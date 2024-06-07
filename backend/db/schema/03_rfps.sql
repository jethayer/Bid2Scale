
CREATE TABLE rfps (
  id SERIAL PRIMARY KEY NOT NULL,
  supplier_id  INTEGER REFERENCES users(id) ON DELETE CASCADE,
  bid_document VARCHAR(255) NOT NULL,
  advertisment VARCHAR(255) NOT NULL,
  appendix VARCHAR(255) NOT NULL,
  addendum VARCHAR(255) NOT NULL,
  start_date DATETIME,
  end_date DATETIME,
  province_territory VARCHAR(255) NOT NULL
);
