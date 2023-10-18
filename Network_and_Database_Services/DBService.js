const mysql = require("mysql");

let db = null;
const DBService = async () =>
    new Promise((resolve , reject) => {
        if (db != null){
            resolve(db);
        }
        db = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'dblogin'
        });

        db.connect((err) => {
            if (err) {
                console.error('Database connection failed:', err);
                reject(err);
            } else {
                console.log('Connected to MySQL database');
                resolve(db);
            }
        });
    });

module.exports = DBService;