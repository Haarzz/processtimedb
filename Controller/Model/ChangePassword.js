const DBService = require("../../Network_and_Database_Services/DBService");
const bcrypt = require('bcrypt');
const ChangePassword = async (req, res) => {
    const db = await DBService();
    const { username, oldPassword, newPassword } = req.body;
  
    const findUserQuery = 'SELECT * FROM db_login WHERE username = ?';
    db.query(findUserQuery, [username], (err, results) => {
      if (err) {
        console.error('Error querying the database:', err);
        return res.status(500).json({ message: 'Server error' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const user = results[0];
  
      bcrypt.compare(oldPassword, user.password, async (bcryptErr, isPasswordValid) => {
        if (bcryptErr) {
          console.error('Error comparing passwords:', bcryptErr);
          return res.status(500).json({ message: 'Server error' });
        }
  
        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Incorrect old password' });
        }
  
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  
        const updatePasswordQuery = 'UPDATE db_login SET password = ? WHERE username = ?';
        db.query(updatePasswordQuery, [hashedNewPassword, username], (updateErr) => {
          if (updateErr) {
            console.error('Error updating password:', updateErr);
            return res.status(500).json({ message: 'Server error' });
          }
  
          res.json({ message: 'Password changed successfully' });
        });
      });
    });
  };
module.exports = ChangePassword;