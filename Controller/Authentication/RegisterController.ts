import bcrypt from "bcrypt";
import DBService from "../../Network_and_Database_Services/DBService";
import {Request, Response} from "express";

const RegisterController = async (req : Request, res : Response) => {
    const {username, password} = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO db_login (username, password, userprofile) VALUES (?, ?, ?)';

        const db = await DBService();
        db.query(sql, [username, hashedPassword, username], (err) => {
            if (err) {
                console.error('Registration error: ', err);
                res.status(500).json({error: 'Registration failed'});
            } else {
                res.status(200).json({message: 'Registration successful'});
            }
        });
    } catch (error) {
        console.error('Hashing error: ', error);
        res.status(500).json({error: 'Registration failed'});
    }
}

export default RegisterController;