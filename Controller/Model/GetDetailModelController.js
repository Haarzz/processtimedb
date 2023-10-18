const DBService = require("../../Network_and_Database_Services/DBService");
const GetDetailModelController = async (req, res) => {
    const id = req.params.id;
    const queryDataPertama = `SELECT * FROM proxim WHERE id = ${id}`;

    const db = await DBService();
    db.query(queryDataPertama, (err, result) => {
        res.json(result[0]);
    });
}

module.exports = GetDetailModelController;