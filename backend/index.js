const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());
app.use(express.json());

async function getConnection(retries = 5, delay = 2000) {
    for (let i = 0; i < retries; i++) {
        try {
            const connection = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: "root",
                password: "password",
                database: "todos",
            });
            return connection;
        } catch (err) {
            if (i === retries - 1) throw err;
            console.log(`Waiting for DB... retry in ${delay}ms`);
            await new Promise((r) => setTimeout(r, delay));
        }
    }
}


app.get('/todos', async (req, res) => {
    const conn = await getConnection();
    const [rows] = await conn.query("SELECT * FROM todos");
    res.json(rows);
});

app.post('/todos', async (req, res) => {
    const conn = await getConnection();
    const { text } = req.body;
    await conn.query("INSERT INTO todos (text) VALUES (?)", [text]);
    res.json({ message: "ok" });
});

app.listen(3000, () => console.log("API running on port 3000"));
