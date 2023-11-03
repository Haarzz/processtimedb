import DBService from "../../Network_and_Database_Services/DBService";
import {Request, Response} from "express";
const GetDetailModelController = async (req : Request, res : Response) => {
    const id = req.params.id;
    const queryDataPertama = `SELECT * FROM proxim WHERE id = ${id}`;

    const db = await DBService();
    db.query(queryDataPertama, (_err, result) => {
        res.json(result[0]);
    });
}

export default GetDetailModelController;