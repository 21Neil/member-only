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

const getUserByUsername = async username => {
  const result = await pool.query('SELECT * FROM users WHERE username=$1', [
    username,
  ]);

  return result.rows[0];
};

const getUserByID = async id => {
  const result = await pool.query('SELECT * FROM users WHERE id=$1', [id]);

  return result.rows[0];
};

const createMessage = async (title, time, text, id) => {
  await pool.query(
    'INSERT INTO messages (title, time, text, author_id) VALUES ($1, $2, $3, $4)',
    [title, time, text, id]
  );
};

const getAllMessages = async () => {
  const result = await pool.query(
    'SELECT * FROM messages JOIN users ON users.id = messages.author_id'
  );
  return result.rows;
};

export {
  createUser,
  changeUserStatus,
  getUserByUsername,
  getUserByID,
  createMessage,
  getAllMessages,
};
