const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '122833', // O tu contraseña real
    database: 'dbflorista' // O el nombre de tu base de datos
});

connection.connect((err) => {
    if (err) {
        console.error('Error conectándose a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos');
});

module.exports = connection;
