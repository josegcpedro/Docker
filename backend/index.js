const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());
app.use(express.json());



const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
const DEBUG = process.env.DEBUG === 'true';

function log(level, message) {
  const levels = ['debug', 'info', 'warn', 'error'];
  if (levels.indexOf(level) >= levels.indexOf(LOG_LEVEL)) {
    console.log(`[${level.toUpperCase()}] ${message}`);
  }
}

function debug(message) {
  if (DEBUG) {
    console.log(`[DEBUG] ${message}`);
  }
}


async function getConnection(retries = 5, delay = 2000) {
  for (let i = 0; i < retries; i++) {
    try {
      debug('Trying to connect to DB');
      const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: 'root',
        password: 'password',
        database: 'todos',
      });
      debug('Connected to DB');
      return connection;
    } catch (err) {
      if (i === retries - 1) {
        log('error', `Failed to connect to DB: ${err.message}`);
        throw err;
      }
      log('warn', `Waiting for DB... retry in ${delay}ms`);
      await new Promise((r) => setTimeout(r, delay));
    }
  }
}



app.get('/todos', async (req, res) => {
  try {
    debug('Handling GET /todos request');
    const conn = await getConnection();
    const [rows] = await conn.query('SELECT * FROM todos');
    log('info', `Returned ${rows.length} todos`);
    res.json(rows);
  } catch (err) {
    log('error', `Error in GET /todos: ${err.message}`);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/todos', async (req, res) => {
  try {
    debug('Handling POST /todos request');
    const conn = await getConnection();
    const { text } = req.body;
    await conn.query('INSERT INTO todos (text) VALUES (?)', [text]);
    log('info', `Added new todo: "${text}"`);
    res.json({ message: 'ok' });
  } catch (err) {
    log('error', `Error in POST /todos: ${err.message}`);
    res.status(500).json({ error: 'Internal server error' });
  }
});


const PORT = 3000;
app.listen(PORT, () => {
  log('info', `API running on port ${PORT}`);
});
