const DBService = require("../../Network_and_Database_Services/DBService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = 'jwt-secret';
const LoginController = async (req, res) => {
    const {username, password} = req.body;

    const sql = 'SELECT * FROM db_login WHERE username = ?';
    const db = await DBService();
    db.query(sql, [username], async (err, results) => {
        if (err) {
            console.error('Login error: ', err);
            res.status(500).json({error: 'Login failed'});
        } else if (results.length === 0) {
            res.status(401).json({error: 'User not found'});
        } else {
            const user = results[0];
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                const token = jwt.sign({username}, jwtSecret, {expiresIn: '7d'});
                res.status(200).json({
                    message: 'Login successful',
                    nama: username,
                    token: token,
                    userprofile: user.userprofile
                });
            } else {
                res.status(401).json({error: 'Incorrect password'});
            }
        }
    });
}

module.exports = LoginController;