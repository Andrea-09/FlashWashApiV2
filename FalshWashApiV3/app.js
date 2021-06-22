const express = require('express');
const mysql = require('mysql');
var cors = require('cors')

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//MySql
const connection = mysql.createPool({
    host: 'us-cdbr-east-04.cleardb.com',
    user: 'b5e67e4b7ec3c7',
    password: '14b605f9',
    database: 'heroku_900d6af0ccdda05'
});

// Route
app.get('/', (req, res) => {
    res.send('Hello world!');
});

// all users
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM usuario';

    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0){
            res.json(results);
        } else {
            res.send('Not results');
        }
    });
});

// recover users
app.get('/users/:id', (req, res) => {
    res.send('Get users by id');
});

//add user
app.post('/add', (req, res) => {
    const sql = 'INSERT INTO usuario SET ?';

    const userObj = {
        nombre: req.body.nombre,
        contrasenia: req.body.contrasenia
    };

    connection.query(sql, userObj, error => {
        if (error) throw error;
        res.send('User created');
    });
});

//update user
app.put('/update/:id', (req, res) => {
    res.send('Update user');
});

//Delete user
app.delete('/delete/:id', (req, res) => {
    app.send('Delete user');
});
/*
//Check connection
connection.connect(error => {
    if (error) throw error;
    
    console.log('Database connected');
});
*/
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));