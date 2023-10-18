const DBService = require("../../Network_and_Database_Services/DBService");
const GetAllModelController = async (req, res) => {
    const db = await DBService();
    db.query('SELECT * FROM proxim', (err, results) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).json({error: 'Internal Server Error'});
        } else {
            res.json(results);
        }
    });
}

module.exports = GetAllModelController;