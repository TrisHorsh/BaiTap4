const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false 
    }
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connect successfuly')
});

// API
app.get('/api/users', (req, res) => {
  const sql = "select * from user";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Server error"
      });
    }

    res.json({
      success: true,
      message: "Get user successfuly",
      data: results
    });
  })
})

const PORT = process.env.PORT || 5000
app.listen(5000, () => {
  console.log('Run at ${PORT}')
})