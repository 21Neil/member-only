import { Client } from 'pg';
import 'dotenv/config';

const SQL = `
  DROP TABLE IF EXISTS users;
  DROP TABLE IF EXISTS messages;
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    username VARCHAR(50),
    password VARCHAR(100),
    status VARCHAR(50),
    admin BOOLEAN
  );
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(50),
    time TIMESTAMP,
    text VARCHAR(255),
    author_id INTEGER REFERENCES users(id)
  );
`;

const main = async () => {
  console.log('seeding...');
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log('done');
};

main();
