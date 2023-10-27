const bcrypt = require("bcrypt");
const DBService = require("../../Network_and_Database_Services/DBService");
const RegisterController = async (req, res) => {
    const {username, password} = req.body;
    const userprofile = username
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO db_login (username, password, userprofile) VALUES (?, ?, ?)';

        const db = await DBService();
        db.query(sql, [username, hashedPassword, userprofile], (err, result) => {
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

module.exports = RegisterController;