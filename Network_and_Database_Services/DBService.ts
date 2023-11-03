import mysql from 'mysql';

let db : mysql.Connection | null = null;
const initializeDB = async (): Promise<mysql.Connection>  =>
    new Promise((resolve , reject) => {
        if (db != null){
            resolve(db);
        } else {
            console.log('Trying to connect to MySQL database...')
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
                    resolve(db!);
                }
            });
        }
    });

export default initializeDB;