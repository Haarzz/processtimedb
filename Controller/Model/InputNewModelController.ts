import DBService from "../../Network_and_Database_Services/DBService";
import {Request, Response} from "express";
const InputNewModelController = async (req : Request, res : Response) => {
    const formData : any = req.body
    // Insert the form data into the MySQL database
    console.log(formData)
    const sql = `INSERT INTO proxim (groupname, modelname, plan, result) VALUES ("${formData.group}", "${formData.model}", ${formData.plan} , 0)`;
    const db = await DBService();
    db.query(sql, (err) => {
        if (err) {
            console.log(`Error inserting form data : ${err}`);
            res.send(err);
        }
        else {
            console.log("Form data inserted");
            res.send("Form data inserted");
        }

    });
};
export default InputNewModelController;