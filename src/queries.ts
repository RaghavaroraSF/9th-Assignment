import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  user: 'R.V',
  host: 'localhost',
  database: 'postgres',
  password: 'Source@123',
  port: 5432,
});