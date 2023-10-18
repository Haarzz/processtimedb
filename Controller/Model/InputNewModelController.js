const DBService = require("../../Network_and_Database_Services/DBService");
const InputNewModelController = async (req, res) => {
    const formData = req.body
    // Insert the form data into the MySQL database
    console.log(formData)
    const sql = `INSERT INTO proxim (groupname, modelname, plan) VALUES ("${formData.group}", "${formData.model}", ${formData.plan})`;
    const db = await DBService();
    db.query(sql, (err, result) => {
        if (err) res.send(err);
        console.log("Form data inserted");
        res.send("Form data inserted");
    });
};

module.exports = InputNewModelController;