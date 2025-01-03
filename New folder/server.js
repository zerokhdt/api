const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Kết nối tới cơ sở dữ liệu MySQL
const db = mysql.createConnection({
    host: 'sql202.infinityfree.com',
    user: 'if0_37077436',
    password: 'dFFisfQy7ZGy',
    database: 'if0_37077436_english'
});

// Kết nối tới MySQL
db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

// API kiểm tra thông tin đăng nhập
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    const query = 'SELECT * FROM user WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    });
});

app.get('/subjects', (req, res) => {
    const query = 'SELECT * FROM subject';
    db.query(query, (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            res.json({ success: true, data: results });
        } else {
            res.json({ success: false, message: 'Không có đề nào.' });
        }
    });
});

// Khởi động server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
