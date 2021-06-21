const pool = require('./Utilities/database');

var UserController = {
    register: async() => {

        app.post('/users', (request, response) => {
            pool.query('INSERT INTO users SET ?', request.body, (error, result) => {
                if (error) throw error;
         
                response.status(201).send(`User added with ID: ${result.insertId}`);
            });
        });
    }
}

module.exports = UserController