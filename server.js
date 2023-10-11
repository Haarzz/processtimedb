const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = 'jwt-secret';
const tokenHeaderKey = 'token-header-key';
const port = 4000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dblogin'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// ************************************************** API ****************************************************************
app.get('/api/alldata', (req, res) => {
  connection.query('SELECT * FROM proxim', (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

app.get('/api/detail-model/:id' , (req , res) => {
  const id = req.params.id;

  const queryDataPertama = `SELECT * FROM proxim WHERE id = ${id}`;
  connection.query(queryDataPertama , (err , result) => {
      res.json(result[0]);
  });
});

app.get('/api/get-model/:id' , (req , res) => {
  const id = req.params.id;
  console.log(`id dari parameter : ${id}`);

  

  const queryDataPertama = `SELECT * FROM proxim WHERE id = ${id}`;
  connection.query(queryDataPertama , (err , result) => {
      

      res.json(result[0]);
  });
});

app.put('/api/increment-transaction/:id' , (req , res) => {
const id = req.params.id;
const queryUpdate  = `
  UPDATE proxim 
  SET result = result + 1 
  WHERE ID = ${id}
`;

connection.query(queryUpdate , (err , result) => {
    console.log('berhasil update data');
    res.json({message : 'Berhasil update data'});
});

});

app.post("/formData", (req, res) => {
const formData = req.body
console.log(formData)
const sql = `INSERT INTO proxim (groupname, modelname, plan) VALUES ("${formData.group}", "${formData.model}", ${formData.plan})`;
connection.query(sql, (err, result) => {
  if (err) res.send(err);
  console.log("Form data inserted");
  res.send("Form data inserted");
});
});
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO db_login (username, password) VALUES (?, ?)';
    connection.query(sql, [username, hashedPassword], (err, result) => {
      if (err) {
        console.error('Registration error: ', err);
        res.status(500).json({ error: 'Registration failed' });
      } else {
        res.status(200).json({ message: 'Registration successful' });
      }
    });
  } catch (error) {
    console.error('Hashing error: ', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});


app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM db_login WHERE username = ?';
  connection.query(sql, [username], async (err, results) => {
    if (err) {
      console.error('Login error: ', err);
      res.status(500).json({ error: 'Login failed' });
    } else if (results.length === 0) {
      res.status(401).json({ error: 'User not found' });
    } else {
      const user = results[0];
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const token = jwt.sign({} , jwtSecret , { expiresIn: '7d' });
        res.status(200).json({
          message: 'Login successful',
          token: token,
        });
      } else {
        res.status(401).json({ error: 'Incorrect password' });
      }
    }
  });
});
// ************************************************** END OF API *********************************************************
// ************************************************** MQTT ***************************************************************
const mqtt = require('mqtt');
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(
    server , {
        cors: {
            origin: 'http://localhost:5173',
            method: ['GET' , 'POST']
        }
    }
);

const MQTT_BROKER = 'mqtt://192.168.84.248;1883';
const TOPIC_PROXIM = 'sensor/proxim';
// const TOPIC_LED = 'sensor/led';
const mqttClient = mqtt.connect(MQTT_BROKER);

mqttClient.on('connect', () => {
    console.log('Connected to MQTT broker');
    mqttClient.subscribe([TOPIC_PROXIM] , () => {
        console.log('berhasil subscribe');
    });
    mqttClient.on('message', (topic, payload) => {
        console.log('Received Message:',payload.toString());
        
        io.emit('message' , payload.toString());
    });

});


app.post('/api/increment', (req, res) => {
    db.query('UPDATE result SET result = result + 1', (err) => {
      if (err) {
        console.error('Error incrementing value', err);
        res.status(500).json({ error: 'Error incrementing value' });
      } else {
        // Fetch the updated value
        db.query('SELECT value FROM result', (err, results) => {
          if (err) {
            console.error('Error fetching value', err);
            res.status(500).json({ error: 'Error fetching value' });
          } else {
            const updatedValue = results[0].value;
            res.json({ updatedValue });
          }
        });
      }
    });
  });

// ************************************************** END OF MQTT ********************************************************



server.listen(port, () => {
  console.log(`Node.js server listening at http://localhost:${port}`);
});
