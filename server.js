const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const config = {
    user: 'sa',
    password: '123456',
    server: 'localhost',
    database: 'Flutter_app',
    options: {
        encrypt: false, // Sử dụng mã hóa nếu cần
        trustServerCertificate: true,
    }
};

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        await sql.connect(config);
        // Fetch the UserID along with other user details
        const result = await sql.query`SELECT UserID, Username FROM Users WHERE Username = ${username} AND Password = ${password}`;

        if (result.recordset.length > 0) {
            const user = result.recordset[0]; // Get the first user record
            res.json({ message: 'Successfully', UserID: user.UserID }); // Return UserID in response
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (err) {
        console.error('SQL error:', err);
        res.status(500).send('Error connecting to the database');
    }
});

app.get('/api/questions/:pksId', async (req, res) => {
    const { pksId } = req.params; // Get the PKSID from the request URL
    try {
        await sql.connect(config);
        // Filter questions by PKSID
        const result = await sql.query`SELECT * FROM Question WHERE PKSID = ${pksId}`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/api/situation/', async (req, res) => {
    try {
        await sql.connect(config);
        // Filter questions by PKSID
        const result = await sql.query`SELECT CriteriaID,PurportCT,PointCT,Factor,PurportTCT FROM Criteria CT, Criteriatype CTT where CT.CriteriatypeID = CTT.CriteriatypeID`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/api/getAnswersForUserAndQuestion', async (req, res) => {
    const userId = req.query.userId;
    const questionId = req.query.questionId;
  
    try {
        const [rows] = await db.query(
            'SELECT * FROM answers WHERE UserID = ? AND QuestionID = ?',
            [userId, questionId]
        );
        
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve answers' });
    }
});
   
app.post('/api/answers', async (req, res) => {
    try {
        const { AnswerID, PurportAS, QuestionID, UserID, Dates } = req.body; // Adjust according to your data structure
        await sql.connect(config);
        await sql.query`INSERT INTO Answer (AnswerID, PurportAS, QuestionID, UserID, Dates) VALUES (${AnswerID}, ${PurportAS}, ${QuestionID}, ${UserID}, ${Dates})`;
        res.status(201).send('Data saved successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/api/get-predict-count', async (req, res) => {
    try {
      const result = await sql.query`SELECT COUNT(*) AS count FROM Predict`;
      const count = result.recordset[0].count;
      res.json({ count });
    } catch (error) {
      res.status(500).send('Lỗi khi lấy số dòng');
    }
  });

app.post('/api/save-predict', async (req, res) => {
    try {
        const { PredictID, CriteriaID, NameKS, Pointreply, Timereply, UserID} = req.body; // Adjust according to your data structure
        await sql.connect(config);
        await sql.query`
            INSERT INTO Predict 
            (PredictID, CriteriaID, NameKS, Pointreply, Timereply, UserID) 
            VALUES 
            (${PredictID}, ${CriteriaID}, ${NameKS}, ${Pointreply}, ${Timereply}, ${UserID})
            `;
        res.status(201).send('Data saved successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.post('/api/register', async (req, res) => {
    try {
        const { id, username, email, password } = req.body;
        
        // Connect to SQL Server
        await sql.connect(config);
        
        // Insert user into the database with UUID
        await sql.query(`
            INSERT INTO Users (UserID, Username, Email, Password) 
            VALUES ('${id}', '${username}', '${email}', '${password}')
        `);
    
        res.status(200).send({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Error registering user' });
    }
});

// Endpoint to check if username exists
app.post('/api/checkUsername', async (req, res) => {
    const { username } = req.body;
  
    try {
        // Connect to SQL Server
        await sql.connect(config);
    
        // Query to check if the username exists
        const result = await sql.query(`
            SELECT COUNT(*) as count FROM Users WHERE Username = '${username}'
        `);
    
        // If username exists, return true
        if (result.recordset[0].count > 0) {
            res.status(200).send({ exists: true });
        } else {
            res.status(200).send({ exists: false });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Error checking username' });
    }
});

app.get('/api/getpks', async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query`SELECT * FROM PKS`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/api/getresult/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        await sql.connect(config);
        const result = await sql.query`SELECT DISTINCT Dates,Name,P.PKSID FROM Answer A,Question Q, PKS P where A.QuestionID=Q.QuestionID and Q.PKSID = P.PKSID and UserID=${userId} order by Dates`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/api/getresultlist/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        await sql.connect(config);
        const result = await sql.query`SELECT DISTINCT Timereply, NameKS from Predict where UserID=${userId}`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/api/checkresult/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        await sql.connect(config);
        const result = await sql.query`SELECT count(DISTINCT Dates) AS DistinctCount FROM Answer where UserID=${userId}`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/api/reviewanswers/:userId/:pksId/:dates', async (req, res) => {
    const { userId,pksId,dates } = req.params; // Get the PKSID from the request URL
    try {
        await sql.connect(config);
        // Filter questions by PKSID
        const result = await sql.query`SELECT  PurportAS,PurportQT,Name FROM Answer A,Question Q, PKS P where A.QuestionID=Q.QuestionID and Q.PKSID = P.PKSID and UserID=${userId} and P.PKSID=${pksId} and Dates = ${dates} order by Q.QuestionID`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/api/results/:userId/:timereply', async (req, res) => {
    const { userId,timereply } = req.params; // Get the PKSID from the request URL
    try {
        await sql.connect(config);
        // Filter questions by PKSID
        const result = await sql.query`select PurportCT,PurportTCT, Factor from predict PR, Criteria CT, Criteriatype CTT where PR.CriteriaID = CT.CriteriaID and CT.CriteriatypeID = CTT.CriteriatypeID and UserID=${userId} and Timereply=${timereply}`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.delete('/api/deleteanswers/:userId/:dates', async (req, res) => {
    const { userId,dates } = req.params; // Get the PKSID from the request URL
    try {
        await sql.connect(config);
        // Filter questions by PKSID
        const result = await sql.query`delete Answer where UserID= ${userId} and Dates=${dates}`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/api/setpriority/:userId/:pksId/:dates', async (req, res) => {
    const { userId, pksId, dates } = req.params; // Get the parameters from the request URL
    try {
        await sql.connect(config);

        // Step 1: Update Priority to 1 for matching records
        await sql.query`UPDATE Answer
                        SET Priority = 1
                        WHERE UserID = ${userId} 
                          AND Dates = ${dates} 
                          AND EXISTS (SELECT 1 FROM PKS WHERE PKSID = ${pksId});`;

        // Step 2: Update Priority to 0 for all other records
        await sql.query`UPDATE Answer
                        SET Priority = 0
                        WHERE NOT (UserID = ${userId} 
                                    AND Dates = ${dates} 
                                    AND EXISTS (SELECT 1 FROM PKS WHERE PKSID = ${pksId}));`;

        res.json({ message: 'Priority updated successfully' });
    } catch (err) {
        res.status(500).send(err.message);
    }
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
