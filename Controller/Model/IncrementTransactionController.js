const DBService = require("../../Network_and_Database_Services/DBService");
const IncrementTransactionController = async (req, res) => {
    const id = req.params.id;
    const queryUpdate = `
    UPDATE proxim 
    SET result = result + 1 
    WHERE ID = ${id}
  `;

    const db = await DBService();
    db.query(queryUpdate, (err, result) => {
        console.log('berhasil update data');
        res.json({message: 'Berhasil update data'});
    });

};

module.exports = IncrementTransactionController;