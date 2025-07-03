import pool from './pool.js';

const createUser = async (firstName, lastName, username, password, status) => {
  await pool.query(
    'INSERT INTO users (first_name, last_name, username, password, status) VALUES ($1, $2, $3, $4, $5)',
    [firstName, lastName, username, password, status]
  );
};

const changeUserStatus = async (id, status) => {
  await pool.query('UPDATE users SET status = $2 WHERE id = $1', [id, status]);
};

export { createUser, changeUserStatus };
