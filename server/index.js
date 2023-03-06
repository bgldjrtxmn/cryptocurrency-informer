const express = require('express')
const axios = require("axios");
const sqlite3 = require('sqlite3');
const app = express()
const port = 3000
const cors = require('cors');

const db = new sqlite3.Database('./local.db');

app.use(cors({
    origin: '*'
}));

app.get('/parse', async (req, res) => {
    let data = await axios.get('https://api.coingecko.com/api/v3/global');

    await db.run(
        `DELETE FROM market_cups`,
    );

    let values = Object.entries(data.data.data.total_market_cap).map(([key, value]) => `('${key}', '${value}')`).join(',')

    await db.run(
        `INSERT INTO market_cups (code, percentage) VALUES ${values}`,
    );

    res.send('OK')
})

app.get('/show', async (req, res) => {
    db.all("SELECT * FROM market_cups", (error, rows) => {
        res.send(rows)
    });
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})